//installing required features
const team = require("./util/generateHtml");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
//Creating empty arrays for the newly created objects to be stored in
const managerArr = [];
const engineersArr = [];
const internsArr = [];
// const teamArr = Array.prototype.push.apply(managerArr,engineersArr,internsArr)

//Engineers questions
const engQuestions = [
  {
    type: "input",
    message: "What is the engineers name?",
    name: "engName",
  },
  {
    type: "input",
    message: "What is the engineers ID?",
    name: "engID",
  },
  {
    type: "input",
    message: "What is the engineers Email?",
    name: "engEmail",
  },
  {
    type: "input",
    message: "What is the engineers Github username?",
    name: "engGithub",
  },
];
//Interns questions
const intQuestions = [
  {
    type: "input",
    message: "What is the interns name?",
    name: "intName",
  },
  {
    type: "input",
    message: "What is the interns ID?",
    name: "intID",
  },
  {
    type: "input",
    message: "What is the interns Email?",
    name: "intEmail",
  },
  {
    type: "input",
    message: "Where does the intern go to school?",
    name: "intGithub",
  },
];
//Starting on node run, asking manager's information
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the managers name?",
      name: "managerName",
    },
    {
      type: "input",
      message: `What is the manager's employee ID?`,
      name: "managerID",
    },
    {
      type: "input",
      message: "What is the managers email?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "What is the managers office number?",
      name: "managerOffice",
    },
  ])
  .then((ans) => {
    //creating a new MANAGER with the MANAGER class
    const newManager = new Manager(
      ans.managerName,
      ans.managerID,
      ans.managerEmail,
      ans.managerOffice
    );
    //Storing the newly made manager into an array for later use
    managerArr.push(newManager);
    // console.log(managerArr);
    //After the manager questions have been answered and executed, a menu populates with the choices, add engineer, add intern or quit
    const questions = () => {
      inquirer
        .prompt([
          {
            type: "list",
            message: "What would you like to do?",
            choices: ["Add an engineer", "Add an intern", "Quit"],
            name: "initial",
          },
        ])
        .then((ans) => {
            //This IF/ELSE chain checks what option the user picked and displaying the appropriate prompts
          if (ans.initial === "Add an engineer") {
              //Putting engineer questions through the .prompt method
            inquirer.prompt(engQuestions).then((ans) => {
               //creating a new ENGINEER with the ENGINEER class 
              const newEngineer = new Engineer(
                ans.engName,
                ans.engID,
                ans.endEmail,
                ans.engGithub
              );
              //Pushing any and all engineers into a new array called engineersArr
              engineersArr.push(newEngineer);
            //   console.log(engineersArr);
              questions();
            });
          } else if (ans.initial === "Add an intern") {
              //Putting intern questions through the .promt method
            inquirer.prompt(intQuestions).then((ans) => {
                //Creating a new INTERN with the INTERN class
              const newIntern = new Intern(
                ans.intName,
                ans.intID,
                ans.intEmail,
                ans.intGithub
              );
              //Pushing any and all interns into a new array called internsArr
              internsArr.push(newIntern);
              questions();
            });
            //This else statement will trigger if the user selects QUIT in the console
          } else {
              //Pushing all arrays together into teamArr using ES6 (...) because the TEAM() function only allows one parameter to pass through
            const teamArr = [...managerArr, ...internsArr, ...engineersArr];
            //Writing new file with the newly created array as the content
            fs.writeFile("index.html", team(teamArr), (err) =>
              err ? console.log(err) : console.log("generating HTML........")
            );
          }
        });
    };
    questions();
  });