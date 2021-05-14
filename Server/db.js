const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "dashhome"
});

connection.connect((err) =>{
    if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
});

exports.connection = connection;
