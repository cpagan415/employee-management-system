const inquirer = require('inquirer');
const fs = require('fs');
const db = require('./db/connect');
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
    const sql= `SELECT departments.id AS "Department ID",
    departments.dept_name AS Department 
    FROM departments`;
    db.query(sql, (err, data) =>{
        console.table(data);
        startProgram();
    })
}

const allRoles = function()
{
    const sql= `SELECT roles.id AS "Role Id", roles.job_title AS Position,
    departments.dept_name AS Department
    FROM roles
    LEFT JOIN departments ON roles.dept_id = departments.id;`;
    db.query(sql, (err, data) =>{
        console.table(data);
        startProgram();
    })
    
}

const allEmployees = function()
{
    const sql= `select employee.id AS "Employee Id", 
    concat(employee.first_name," ",employee.last_name) AS Employee,
    roles.job_title as Position, 
    roles.salary as Salary,
    departments.dept_name as Department, 
    concat(manager.first_name," ",manager.last_name) AS Manager
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.dept_id = departments.id
    INNER JOIN manager ON employee.manager_id = manager.id;`;
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
        //validate is department is already on list
        db.query(`SELECT departments.dept_name AS name FROM departments`, (err, data) => {
            let deptArray = data.map(data=>data.name)
            if(deptArray.indexOf(answer.addDept)>= 0){
                console.log('Department Exists. Update Unsuccesful')
                startProgram();
            }
            //if department does not exist place it in the table
            else
            {
                db.query(`INSERT INTO departments (dept_name) VALUES('${answer.addDept}')`, (err, result) =>{
                    console.log('Added New Department Successful.')
                  startProgram();
                  })

            }
        })
    })
}

//ADD ROLE FUNCTION

const addRole = function(){

    db.query(`SELECT dept_name FROM departments`, (err, data) => {
    inquirer.prompt([
        {
            name: 'roleTitle',
            type: 'input',
            message: 'Enter title of new role: '
        },
        {
            name: 'salary',
            input: 'input',
            message: 'Enter salary amount: '
        },
        {
            name: 'department',
            type: 'list',
            choices: ()=>data.map(data=>data.dept_name)
        }
    ]).then(answer=>{
        db.query(`SELECT dept_name FROM departments`, (err, data)=>{
            const deptArray = data.map(data=>data.dept_name);
            const deptTitle = deptArray.find(deptTitle => deptTitle === answer.department);
            const deptId = deptArray.indexOf(deptTitle) + 1;
            //validate array if role already exist 
            db.query(`SELECT roles.job_title AS Position FROM roles`, (err,data) => {
                let roleArray = data.map(data => data.Position);
                if(roleArray.indexOf(answer.roleTitle)>= 0){
                    console.log('Role Exists. Update Unsuccesful')
                    startProgram();
                }
                //if role does exists role is added 
                else{
                    db.query(`INSERT INTO roles (job_title, salary, dept_id) VALUES ('${answer.roleTitle}', ${answer.salary}, ${deptId})`, (err, data)=>{
                        console.log('New role added!');
                        startProgram();
                    })
                }
            })
        })
    })
    
    })
}

//ADD ROLE FUNCTION END

//ADD EMPLOYEE FUNCTION
const addEmply = function(){
    db.query(`Select roles.job_title AS Position FROM roles;` , (err, data) =>{
        inquirer.prompt([
            {
                name:'firstName',
                type: 'input',
                message: 'Enter first name of new employee:'
            },
            {
                name:'lastName',
                type: 'input',
                message: 'Enter last name of new employee:'
            },
            {
                name: 'roleTitle',
                type: 'list',
                message: "What is the new employee's position: ",
                choices: ()=>data.map(data=>data.Position)
            }
        ]).then(empInfo =>{
            const roleArray = data.map(data=>data.Position);
            const roleTitle = roleArray.find(role => role === empInfo.roleTitle);
            const roleId = roleArray.indexOf(roleTitle) + 1;
            db.query(`SELECT concat(manager.first_name," ",manager.last_name) as Manager FROM manager`, (err,data)=> {
                inquirer.prompt([
                    {
                    name: 'manager',
                    type: 'list',
                    message: 'Choose employee manager: ',
                    choices: ()=>data.map(data=>data.Manager)
                    }

                ]).then(managerName => {
                    const managerArray = data.map(data=>data.Manager);
                    const managerTitle = managerArray.find(name=>name===managerName.manager);
                    const managerId = managerArray.indexOf(managerTitle) + 1;

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${empInfo.firstName}', '${empInfo.lastName}', ${roleId}, ${managerId})`)
                    console.log('Employee Added Successfully');
                    startProgram();
                })
            })
        })
    })
}
//ADD EMPLOYEE FUNCTION END 

//UPDATE EMPLOYEE FUNCTION
const updateEmply = function(){
    db.query(`SELECT CONCAT(employee.first_name," ",employee.last_name) AS employee FROM employee`, (err, data) => {
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Choose an employee to update: ',
                choices: ()=>data.map(data=>data.employee)
            }
        ]).then(empInfo => {
            //find employee ID 
            let empArray = data.map(data=>data.employee);
            let empTitle = empArray.find(name=>name === empInfo.employee)
            let empId = empArray.indexOf(empTitle) + 1;
            
            db.query(`SELECT roles.job_title AS roles FROM roles `, (err, data)=>{
                inquirer.prompt([
                {
                    name: 'role',
                    type: 'list',
                    message: 'Choose new employee role: ',
                    choices: ()=>data.map(data=>data.roles)
                }
                ]).then(roleInfo => {
                    //role id 
                    let roleArray = data.map(data=>data.roles);
                    let roleTitle = roleArray.find(role => role === roleInfo.role);
                    let roleId = roleArray.indexOf(roleTitle) + 1;
                    
                    db.query(`SELECT CONCAT(manager.first_name," ",manager.last_name) AS manager FROM manager`, (err, data)=> {
                        inquirer.prompt([
                            {
                                name: 'managerName',
                                type: 'list',
                                message: 'Please choose the corresponding manager: ',
                                choices: ()=>data.map(data=>data.manager)
                            }
                        ]).then(managerInfo => {                
                            //find manger ID 
                            let managerArray = data.map(data=>data.manager);
                            let managerTitle = managerArray.find(name => name === managerInfo.managerName);
                            let managerId = managerArray.indexOf(managerTitle) + 1;
                            
                            db.query(`UPDATE employee SET role_id = ${roleId}, manager_id = ${managerId} WHERE id = ${empId}`, (err, data) =>{
                                console.log('Employee Updated');
                                startProgram();
                            })
                           
                            
                            
                        })
                    })
                })
            })
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
            case 'Update an Employee Role':
                updateEmply();
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
