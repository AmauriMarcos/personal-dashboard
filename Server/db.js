const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host: "eu-cdbr-west-01.cleardb.com",
    user: "b7766723860f57",
    password: "d858170b",
    database: "heroku_8663280c077e415",
    debug    :  false
});



module.exports = pool;
