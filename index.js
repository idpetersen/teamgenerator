//installing required features
const team = require('./util/generateHtml')
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const managerArr = [];
const engineersArr = [];
const internsArr = [];
// const teamArr = Array.prototype.push.apply(managerArr,engineersArr,internsArr)

//Engineers questions
const engQuestions = [{
        type: 'input',
        message: 'What is the engineers name?',
        name: 'engName'
    },
    {
        type: 'input',
        message: 'What is the engineers ID?',
        name: 'engID'
    },
    {
        type: 'input',
        message: 'What is the engineers Email?',
        name: 'engEmail'
    },
    {
        type: 'input',
        message: 'What is the engineers Github username?',
        name: 'engGithub'
    }
]
//Interns questions
const intQuestions = [{
        type: 'input',
        message: 'What is the interns name?',
        name: 'intName'
    },
    {
        type: 'input',
        message: 'What is the interns ID?',
        name: 'intID'
    },
    {
        type: 'input',
        message: 'What is the interns Email?',
        name: 'intEmail'
    },
    {
        type: 'input',
        message: 'Where does the intern go to school?',
        name: 'intGithub'
    }
]
//Starting on node run, asking manager's information
inquirer.prompt([{
        type: 'input',
        message: 'What is the managers name?',
        name: "managerName"
    },
    {
        type: 'input',
        message: `What is the manager's employee ID?`,
        name: "managerID"
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
    const newManager = new Manager(ans.managerName, ans.managerID, ans.managerEmail, ans.managerOffice);
    managerArr.push(newManager);
    console.log(managerArr);
    const questions = () => {
        inquirer.prompt([{
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add an engineer', 'Add an intern', 'Quit'],
            name: 'initial'
        }]).then(ans => {
            if (ans.initial === 'Add an engineer') {
                inquirer.prompt(engQuestions)
                .then(ans => {
                    const newEngineer = new Engineer(ans.engName, ans.engID, ans.endEmail, ans.engGithub)
                    engineersArr.push(newEngineer)
                    console.log(engineersArr)
                    questions()
                })
            } else if (ans.initial === 'Add an intern') {
                inquirer.prompt(intQuestions)
                .then(ans => {
                    const newIntern = new Intern(ans.intName, ans.intID, ans.intEmail, ans.intGithub)
                    internsArr.push(newIntern)
                    questions()
                })
            } else {
                const teamArr = [...managerArr, ...internsArr, ...engineersArr]
                fs.writeFile('index.html', team(teamArr), (err) =>
                err ? console.log(err) : console.log('generating HTML'))
            }
        })
    };
questions()
});