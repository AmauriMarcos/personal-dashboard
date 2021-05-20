const express = require("express");
const app = express();
const admin = require("firebase-admin");
const cors = require("cors");
require('dotenv').config({ path: '.././.env'});
const {connection} = require('./db');
const port = 8080;

//Initalize admin

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // I get no error here
    clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL, // I get no error here
    privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // NOW THIS WORKS!!!
  }),
});

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/auth", async (req, res, next) => {
  //Get token from the client-side generated with getIdToken()
  const token = req.headers.authorization;
  console.log(token);
  //Verify token from user
  const userInfo = await admin.auth().verifyIdToken(token);
  const {uid, email} = userInfo;
  console.log(uid, email);

  const q = `INSERT INTO users(id, email) VALUES("${uid}","${email}")`
  connection.query(q, (err, rows) =>{
     if(err) throw err;
     console.log(rows);
  })

  res.send("Hello from node.js");
});

app.post("/settings", async (req, res, next) => {
  console.log(req.body);
/*   const token = req.headers.authorization;

  const userInfo = await admin.auth().verifyIdToken(token);
  const {uid, email} = userInfo;
  console.log(uid, email); */

/*   const q = `UPDATE users SET profile_pic="${file}" WHERE id="${uid}";`

  connection.query(q, (err, rows) =>{
     if(err) throw err;
     console.log(rows);
  }) */

  res.send("Hello from node.js");
});

app.get("/transactions", async(req, res, next) =>{
  const token = req.headers.authorization;
  const userInfo = await admin.auth().verifyIdToken(token);
  const {uid} = userInfo;
  const q = `SELECT transactions.id, email, title, category, DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS created_at, price FROM users
             JOIN transactions
                ON users.id = transactions.userID
             WHERE users.id = "${uid}" 
             ORDER BY created_at DESC`
  connection.query(q, (err, rows) =>{
     if(err) throw err;
     /* console.log(rows); */
     res.send(rows);
  })
})

app.post("/transactions", async(req, res, next) =>{
 const {title, category, price} = req.body;

  const token = req.headers.authorization;

  const userInfo = await admin.auth().verifyIdToken(token);
  const {uid} = userInfo;

   const q = `INSERT INTO transactions(title, category, price, userID)
             VALUES("${title}", "${category}", "${price}", "${uid}")`
  connection.query(q, (err, rows) =>{
     if(err) throw err;
    res.send({rows: rows});
  })  
});


app.get("/transactions/:id", (req, res) =>{
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  const q = `SELECT title, category, price FROM transactions WHERE id=${id}`
  connection.query(q, (err, rows) =>{
     if(err) throw err;
     res.send({rows: rows});
  })
});

app.put("/transactions/:id", (req, res) =>{
  const id = req.params.id;
  const {title, price, category} = req.body;
  q = `UPDATE transactions SET title="${title}",  category="${category}", price=${price} WHERE id=${id}; `
  connection.query(q, (err, rows) =>{
     if(err) throw err;
  })
})

app.delete("/transactions/:id", (req, res) =>{
   const id = req.params.id;
   const q = `DELETE FROM transactions WHERE id=${id}`
   connection.query(q, (err, rows) =>{
     if(err) throw err;
   })
   res.send("DELETE Request Called")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
