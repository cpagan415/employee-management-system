const mysql = require('mysql2');
//connect to databse
const db = mysql.createConnection({
    host: 'localhost',
    //your sql username
    user: 'root',
    //your MySql password
    password: 'K1rkSp@ck',
    database: 'employee_management'
},
console.log('Connected to the election database.')
);

module.exports =db;