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

//this is to bring up the SQL database
function viewAllDept()
{
    
    db.query(`SELECT * FROM departments`, (err, rows) => {
        console.log(rows);
    });
}

title();

inquirer.prompt([
        {
            name: 'department',
            type: 'list',
            message: 'Which department would you like to view?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department','Add a Role', 'Add an Employee', 'Update Employees' ]
        },
        {
            name: 'allDept',
            when:({ department }) =>
            {
                if(department === 'View all Departments'){
                    viewAllDept();
                }
            }  
        }
    ])
    .then(function(answer){
        console.log(answer);
    })
