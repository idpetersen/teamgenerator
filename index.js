const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const manager = []


    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the managers name?',
            name: "managerName"
        },
        {
            type: 'input',
            message: `What is the manager's employee ID?`,
            name: "managerId"
        },
        {
            type: 'input',
            message: 'What is the managers email?',
            name: "managerEmail"
        },
        {
            type: 'input',
            message: 'What is the managers office number?',
            name: "managerOffice"
        }
    ]).then(ans => {
        const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOffice)
        manager.push(newManager)
        console.log(manager)
    })
