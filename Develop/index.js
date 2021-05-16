const inquirer = require('inquirer');
const fs = require('fs');
const db = require('./db/connect');
const { debugPort } = require('process');
require('console.table');


   

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



//queries here and maybe would send to another file 
function allDept()
{
    const sql= `SELECT id AS "Department Id", dept_name AS Department FROM departments`;
    db.query(sql, (err, data) =>{
        console.table(data);
        startProgram();
    })
}

const allRoles = function()
{
    const sql= `SELECT roles.id AS "Role Id", roles.job_title AS "Job Title", roles.salary AS Salary,
    roles.dept_id AS "Department Id",
    departments.dept_name AS "Department Name"
    FROM roles
    LEFT JOIN departments ON roles.dept_id = departments.id;`;
    db.query(sql, (err, data) =>{
        console.table(data);
        startProgram();
    })
    
}

const allEmployees = function()
{
    const sql= `SELECT employee.id AS "Employee Id",
    employee.first_name AS "First Name",
    employee.last_name AS "Last Name",
    roles.job_title AS "Job Title",
    departments.dept_name AS "Department",
    roles.salary AS "Salary",
    CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.dept_id = departments.id
    LEFT JOIN manager ON employee.manager_id = manager.id;`;
    db.query(sql, (err, data) =>{
        console.table(data);
        startProgram();
    })
   
}

const addDept = function()
{
    inquirer.prompt([
        {
            name: 'addDept',
            type: 'input',
            message: 'Enter new department name: '
        }
    ]).then((answer) => {
      db.query(`INSERT INTO departments (dept_name) VALUES('${answer.addDept}')`, (err, result) =>{
      startProgram();
      })
    })
}


const appChoice = [
    {
        name: 'appChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        }
];


 function startProgram()
{

    
    inquirer.prompt(appChoice).then(answer => {
        switch(answer.appChoice) {
            case 'View All Departments':
                allDept();
                break;
            case 'View All Roles':
                allRoles();
                break;
            case 'View All Employees':
                allEmployees();
                break;
            case 'Add a Department':
                addDept();
                break;
        }
    })
    .catch(error =>{
        if(error.isTtyError)
        {
            console.log('Something went wrong');
        }
    })
}

//title();
startProgram();
