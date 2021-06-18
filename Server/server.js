const express = require("express");
const app = express();
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config({ path: ".././.env" });
const  pool  = require("./db");
const multer = require("multer");
const uuid = require("uuid");
const { Pool } = require("@material-ui/icons");
const path = "./public/uploads";

console.log(pool);

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

pool.getConnection((err) =>{
  if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});

app.use("/public/uploads", express.static(__dirname + "/public/uploads/"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4().toString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Type file is not access", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: 1024 * 1024 * 5,
});

//Initalize admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // I get no error here
    clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL, // I get no error here
    privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      '\n'
    ), // NOW THIS WORKS!!!
  }),
});

app.get("/auth", async (req, res, next) => {
  //Get token from the client-side generated with getIdToken()
  const token = req.headers.authorization;
  console.log(token);
  console.log("TESTANDOOO")
  //Verify token from user
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid, email } = userInfo;

  console.log(uid);
  console.log(email);

  const q = `INSERT INTO users(id, email) VALUES("${uid}","${email}")`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
  });

  res.send("Hello from node.js");
});

app.get("/user/info", async (req, res, next) => {
  //Get token from the client-side generated with getIdToken()
  const token = req.headers.authorization;

  //Verify token from user
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `SELECT * FROM users WHERE id="${uid}"`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/upload", upload.single("avatar"), async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `UPDATE users SET profile_pic="${req.file.filename}" WHERE id="${uid}";`;

  pool.query(q, (err, rows) => {
    if (err) throw err;
  });

  res.send("Image uploaded!");
});

app.get("/filter", async (req, res) => {
  const date = JSON.parse(req.query.date);
  const { from, to } = date;
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT  transactions.id, title, DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS created_at, category, SUM(price) AS price, color
            FROM users
            INNER JOIN transactions
            ON users.id = transactions.userID
            WHERE created_at BETWEEN '${from}' AND '${to}' AND (users.id="${uid}")
            GROUP by category;
`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send({ rows });
  });
});

app.get("/allFilteredTransactions", async (req, res) => {
  const date = JSON.parse(req.query.date);
  const { from, to } = date;
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT  transactions.id, title, DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS created_at, category, price, color
            FROM users
            INNER JOIN transactions
            ON users.id = transactions.userID
            WHERE created_at BETWEEN '${from}' AND '${to}' AND (users.id="${uid}")
            ORDER BY created_at DESC;
`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send({ rows });
  });
});

app.get("/transactions", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT transactions.id, email, title, category, DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS created_at, price FROM users
             JOIN transactions
                ON users.id = transactions.userID
             WHERE users.id = "${uid}" 
             ORDER BY created_at ASC`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    /* console.log(rows); */
    res.send(rows);
  });
});

app.get("/transactions/currentDay", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT users.id, title, category, created_at, price 
              FROM transactions
                INNER JOIN users
                  ON users.id = transactions.userID
              WHERE users.id="${uid}" AND
              created_at >= CURDATE()
                AND created_at < CURDATE() + INTERVAL 1 DAY
              ORDER BY created_at;`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    /* console.log(rows); */
    res.send(rows);
  });
});

app.get("/totalTransactions", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT users.id, title, category, SUM(price) AS price, color
             FROM users
             INNER JOIN transactions
                ON users.id = transactions.userID
             WHERE users.id="${uid}"
             GROUP BY category`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    /* console.log(rows); */
    res.send(rows);
  });
});

app.get("/totalTransactionsPerMonth", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT users.id, DATE_FORMAT(created_at, "%b") as monthname, category, SUM(price) AS price, color
            FROM users
            INNER JOIN transactions
            ON users.id = transactions.userID
            WHERE users.id="${uid}"
            GROUP BY category, monthname
            ORDER BY monthname DESC;`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/transactions", async (req, res, next) => {
  const { title, category, price, color } = req.body;

  const token = req.headers.authorization;

  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `INSERT INTO transactions(title, category, price, color, userID)
             VALUES("${title}", "${category}", "${price}", "${color}", "${uid}")`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send({ rows: rows });
  });
});

app.get("/goals", async(req, res, next) =>{
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = ` SELECT goals.id, goal_title, goal, user_id 
              FROM goals
                INNER JOIN users
                  ON users.id = goals.user_id
              WHERE users.id="${uid}"; `;

  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/goals", async(req, res, next) =>{
  const{goalTitle, goal} = req.body;
  const token = req.headers.authorization;

  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `INSERT INTO goals(goal_title, goal, user_id)
             VALUES("${goalTitle}", ${goal}, "${uid}")`

  pool.query(q, (err, rows) =>{
     if(err) throw err;
     res.send({msg: "Your goal has been created !!!"});
  })
});

app.get("/savings", async(req, res, next) =>{
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = ` SELECT title, price AS amount, email FROM transactions
              INNER JOIN users
                ON users.id = transactions.userID
              WHERE users.id="${uid}" AND category="Savings";`

  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get("/transactions/:id", (req, res) => {
  const id = req.params.id;
  const q = `SELECT title, category, price FROM transactions WHERE id=${id}`;
  Pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send({ rows: rows });
  });
});

app.put("/transactions/:id", (req, res) => {
  const id = req.params.id;
  const { title, price, category } = req.body;
  q = `UPDATE transactions SET title="${title}",  category="${category}", price=${price} WHERE id=${id}; `;
  pool.query(q, (err, rows) => {
    if (err) throw err;
  });
});

app.delete("/transactions/:id", (req, res) => {
  const id = req.params.id;
  const q = `DELETE FROM transactions WHERE id=${id}`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
  });
  res.send("DELETE Request Called");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


