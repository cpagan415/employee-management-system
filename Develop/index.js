const inquirer = require('inquirer');
const fs = require('fs');
const db = require('./db/connect');
const { exit } = require('process');
const { start } = require('repl');
require('console.table');


   
//text art from https://fsymbols.com/text-art/
function title() {    
    console.log(
        "███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗\n" +
        "██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝\n" +
        "█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░\n" +
        "██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░\n"+
        "███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗\n"+
        "╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝\n"+
        
        "████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░\n"+
        "╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗\n"+
        "░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝\n"+
        "░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗\n"+
        "░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║\n"+
        "░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝\n");
}

title();

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

const addRole = function()
{
    inquirer.prompt([
        {
            name: 'roleTitle',
            type: 'input',
            message: 'Enter the name of the position'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter salary amount: '   //add validation for decimal, decimal is automatically placed in sql chart
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'Enter the Department Id:' //validation that dept ID is a number between the listed department ID range, does the department exist?
        }

    ]).then(answer =>{
        console.log(answer.salary + ' '+ answer.deptId);
        db.query(`INSERT INTO roles (job_title, salary, dept_id) VALUES ('${answer.roleTitle}', ${answer.salary}, ${answer.deptId});`, (err, data)=>{
           startProgram();
        })
    })
}

const addEmply = function()
{
    inquirer.prompt([
        {
            name:'firstName',
            type:'input',
            message:'New employee first name:'
        },
        {
            name:'lastName',
            type:'input',
            message:'New employee last name:'
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'Enter role id number for new employee: '//validation here for rold id, make sure it is not out of range   
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'Enter manager id for new employee:'//validation again here to check range, depending on number maybe add <manager> was added.
        }
    ]).then(answer =>{
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleId}, ${answer.managerId});`, (err, data) =>{
            startProgram();
        })
    })
}

const appChoice = [
    {
        name: 'appChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
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
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmply();
                break;
           case 'Exit':
               console.log('End of Program');
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


startProgram();
