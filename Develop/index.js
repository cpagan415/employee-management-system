const inquirer = require('inquirer');
const fs = require('fs');
const Choices = require('inquirer/lib/objects/choices');

//here will be the path to generate the HTML
//need to figure out how to do the title another time 

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
    console.log('viewing all departments here')
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
