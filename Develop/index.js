const inquirer = require('inquirer');
const fs = require('fs');
const db = require('./db/connect');


//here will be the path to generate the HTML
//need to figure out how to do the title another time 
//using easy-table to displat tables, see references here:
//https://github.com/mcintyrehh/bamazon/blob/master/bamazonCustomer.js
//https://www.npmjs.com/package/easy-table
var Table = require('easy-table');

   

function title() {    
    console.log(" -----------------------------------------------------\n" +
                "|   _______                                           |\n"+
                "|  |     __|                                          |\n" +
                "|  |    |__                                           |\n" +
                "|  |     __|                                          |\n" +
                "|  |    |__                                           |\n" +
                "|  |_______|                                          |\n" +
                "|                                                     |\n" +
                "|                                                     |\n" +
                "|                                                     |\n" +
                "|                                                     |\n" +
                "|                                                     |\n" +
                "|                                                     |\n" +
                "|                                                     |\n" +
                " -----------------------------------------------------");
}

//this is to bring up the SQL database with easy-table
function viewAllDept()
{
    
    db.query(`SELECT * FROM departments`, (err, rows) => {
        var t = new Table;
        rows.forEach(function(departments){
            t.cell('Department Id', departments.id)
            t.cell('Department', departments.dept_name)
            t.newRow();
        })
        console.log(t.toString());
    });

}
function viewAllRoles(){
    const sql = `select roles. *, departments.dept_name from roles left join departments on roles.role_id = departments.id`;
    db.query(sql, (err, rows) =>{
        var t = new Table;
        rows.forEach(function(roles){
            t.cell('Position', roles.job_title)
            t.cell('Department', roles.role_id)
            t.cell('Salary', roles.salary)
            t.newRow();
        })
        console.log(t.toString());
    })
}

//title();


const questions = [
    {
        name: 'department',
        type: 'list',
        message: 'Which department would you like to view?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department','Add a Role', 'Add an Employee', 'Update Employees' ]
    }   
];

inquirer.prompt(questions).then( function(answer){
    var dept = answer.department;
    if(dept === 'View all Departments')
    {
        viewAllDept();
    }
    else if(dept === 'View all Roles')
    {
        viewAllRoles();
    }
    else if(dept === 'View all Employees' )
    {
        console.log('viewing employee table here');
    }
    else{
        console.log('End of Program');
    }

})

   
