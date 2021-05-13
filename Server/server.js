const express = require("express");
const app = express();
const admin = require("firebase-admin");
const cors = require("cors");
require('dotenv').config()
const port = 8080;

/* admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // NOW THIS WORKS!!!
  }),
}); */

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/auth", async (req, res, next) => {
  const token = req.headers.authorization;
/*   const userInfo = await admin.auth().verifyIdToken(token);
  const authId = userInfo.uid; */

/*   console.log(authId); */
  console.log(process.env.FIREBASE_PRIVATE_KEY)
  res.send("Hello from node.js");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
