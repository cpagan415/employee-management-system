const mysql = require('mysql2');
//connect to databse
const db = mysql.createConnection({
    host: 'localhost',
    //your sql username
    user: 'root',
    //your MySql password
    password: 'kirkspock',
    database: 'employee_management'
}
);

module.exports =db;