const inquirer = require('inquirer');
const fs = require('fs');
const db = require('./db/connect');const { table } = require('console');
const { deepEqual } = require('assert');
const { debugPort } = require('process');
require('console.table');


//here will be the path to generate the HTML
//need to figure out how to do the title another time 
//using easy-table to displat tables, see references here:
//https://github.com/mcintyrehh/bamazon/blob/master/bamazonCustomer.js
//https://www.npmjs.com/package/easy-table

   

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
/*function viewAllDept()
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

//here I need to make prompt questions then take
//those prompt questions need to display the correct sql table
//the new problem you are having is that the prompt question
//does not show after the table appears*/


inquirer.prompt([
    {
    name: 'appChoice',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees']
    }
]).then(answer => {
    //validation here, need async function to repeat question?
    if(answer.appChoice === 'View All Departments')
    {
        db.query(`SELECT * FROM departments`, (err, data)=>{
            console.table(data);
        })
    }
    else
    {
        console.log('run again');
    }
})