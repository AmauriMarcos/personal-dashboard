const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "eu-cdbr-west-01.cleardb.com",
    user: "b7766723860f57",
    password: "d858170b",
    database: "heroku_8663280c077e415"
});


connection.connect((err) =>{
    if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
});

exports.connection = connection;
