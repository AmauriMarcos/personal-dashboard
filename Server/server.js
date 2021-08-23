const express = require("express");
const app = express();
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config({ path: ".././.env" });
const pool = require("./db");
const multer = require("multer");
const uuid = require("uuid");
const path = "./public/uploads";
const cloudinary = require("cloudinary").v2;

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("./public/uploads", express.static(__dirname + "./public/uploads"));

/* START -  Cloudinary CONFIG */

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

/* END */

/* START -  MULTER CONFIG */

pool.getConnection((err, connection) => {
  if (err) {
    reject(err);
  } else {
    console.log("Database connected!");
  }
});

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

/* END */

/* START CONFIG ADMIN Firebase */

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // I get no error here
    clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL, // I get no error here
    privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      "\n"
    ), // NOW THIS WORKS!!!
  }),
});

/* END */

/* START - ROUTES */
app.get("/", (req, res) => {
  res.send("Hello from the Server!");
});

app.get("/auth", async (req, res, next) => {
  //Get token from the client-side generated with getIdToken()
  const token = req.headers.authorization;
  console.log(token);
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

/* app.get("/upload", (req, res) => {
  res.send("Upload route!");
}); */

app.get("/upload", async (req, res) => {
    const { resources } = await cloudinary.search
    .expression("folder:personal_financial_dashboard_avatar")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
  
  
});

app.post("/upload", upload.single("avatar"), async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userInfo = await admin.auth().verifyIdToken(token);
    const { uid } = userInfo;

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "personal-financial-dashboard-avatar",
    });

    const q = `UPDATE users SET profile_pic="${result.public_id}" WHERE id="${uid}";`;

    pool.query(q, (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });

    
  }  catch (err) {
    next(err);
  }
  /* https://res.cloudinary.com/hrfhxbqio/image/upload/v1624275768/s4bh9p9xk3rewob9xxr9.jpg 
     https://res.cloudinary.com/hrfhxbqio/image/upload/v1624275963/alm12xliwzahlz6ufnyz.jpg*/
});

app.get("/filter", async (req, res) => {
  const date = JSON.parse(req.query.date);
  const { from, to } = date;
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT  transactions.id, title, DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS created_at, transaction_type, category, SUM(price) AS price, color
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
  const q = `SELECT  transactions.id, title, transaction_type, DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS created_at, category, price, color
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
  const q = `SELECT transactions.id, email, title, transaction_type, category, DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS created_at, price FROM users
             JOIN transactions
                ON users.id = transactions.userID
             WHERE users.id = "${uid}" 
             `;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    /* console.log(rows); */
    res.send(rows);
  });
});

app.get("/totalExpensesPerMonth", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `SELECT transactions.id,  monthname(created_at) as monthname, SUM(price) as total   
            FROM users
            INNER JOIN transactions
              ON users.id = transactions.userID
            WHERE users.id="${uid}" && transaction_type="expense"
            GROUP BY monthname`;

    pool.query(q, (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
});

app.get("/totalIncomesPerMonth", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `SELECT transactions.id,  monthname(created_at) as monthname, SUM(price) as total   
            FROM users
            INNER JOIN transactions
              ON users.id = transactions.userID
            WHERE users.id="${uid}" && transaction_type = "income"
            GROUP BY monthname`;

    pool.query(q, (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
});

app.get("/transactions/currentDay", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = `SELECT users.id, title, category, transaction_type, created_at, price 
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
  const q = `SELECT users.id, title, category, transaction_type, SUM(price) AS price, color
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
  const q = `SELECT users.id, DATE_FORMAT(created_at, "%b") as monthname, category, transaction_type, SUM(price) AS price, color
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
  const { title, category, price, color, transactionType } = req.body;

  const token = req.headers.authorization;

  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `INSERT INTO transactions(title, category, price, color, transaction_type, userID)
             VALUES("${title}", "${category}", "${price}", "${color}","${transactionType}", "${uid}")`;
  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send({ rows: rows });
  });
});

app.get("/goals", async (req, res, next) => {
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

app.post("/goals", async (req, res, next) => {
  const { goalTitle, goal } = req.body;
  const token = req.headers.authorization;

  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;

  const q = `INSERT INTO goals(goal_title, goal, user_id)
             VALUES("${goalTitle}", ${goal}, "${uid}")`;

  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send({ msg: "Your goal has been created !!!" });
  });
});

app.get("/savings", async (req, res, next) => {
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const { uid } = userInfo;
  const q = ` SELECT title, price AS amount, email FROM transactions
              INNER JOIN users
                ON users.id = transactions.userID
              WHERE users.id="${uid}" AND category="Savings";`;

  pool.query(q, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get("/transactions/:id", (req, res) => {
  const id = req.params.id;
  const q = `SELECT title, category, price FROM transactions WHERE id=${id}`;
  pool.query(q, (err, rows) => {
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

  res.send("Transaction successfully updated!");
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
  console.log(`Example app listening on port ${PORT}`);
});
