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

//Engineers questions
const engQuestions = [
  {
    type: "input",
    message: "What is the engineers name?",
    name: "engName",
    //The validate method checks if the user input is valid. For this case, we are checking for anything that is not a letter.
    validate: function (name){
      valid = /^[A-Za-z\s]*$/.test(name)
      if (valid){
          return true;
      } else {
          console.log("\n Engineer's name should not include numbers (unless you're a cyborg)")
          return false;
      }
    }
  },
  {
    type: "input",
    message: "What is the engineers ID?",
    name: "engID",
    validate: function (id){
      valid = /^[0-9]*$/.test(id)
      if (valid){
          return true;
      } else {
          console.log("\n Engineer's id should not include special characters or letters")
          return false;
      }
    }
  },
  {
    type: "input",
    message: "What is the engineers Email?",
    name: "engEmail",
    validate: function (email){
      valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      if (valid){
          return true;
      } else {
          console.log("\n You must enter email with valid email formatting i.e. 'test@email.com' ")
          return false;
      }
    }
  },
  {
    type: "input",
    message: "What is the engineers Github username?",
    name: "engGithub",
    validate: function (github){
      valid = /^[A-Za-z0-9-]*$/.test(github)
      if (valid){
          return true;
      } else {
          console.log("\n Github username can not include special characters")
          return false;
      }
    }
  },
];
//Interns questions
const intQuestions = [
  {
    type: "input",
    message: "What is the interns name?",
    name: "intName",
    validate: function (name){
      valid = /^[A-Za-z\s]*$/.test(name)
      if (valid){
          return true;
      } else {
          console.log("\n Intern's name should not include numbers (unless you're a cyborg)")
          return false;
      }
    }
  },
  {
    type: "input",
    message: "What is the interns ID?",
    name: "intID",
    validate: function (id){
      valid = /^[0-9]*$/.test(id)
      if (valid){
          return true;
      } else {
          console.log("\n Intern's id should not include special characters or letters")
          return false;
      }
    }
  },
  {
    type: "input",
    message: "What is the interns Email?",
    name: "intEmail",
    validate: function (email){
      valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      if (valid){
          return true;
      } else {
          console.log("\n You must enter email with valid email formatting i.e. 'test@email.com' ")
          return false;
      }
    }
  },
  {
    type: "input",
    message: "Where does the intern go to school?",
    name: "intSchool",
    validate: function (school){
      valid = /^[A-Za-z\s]*$/.test(school)
      if (valid){
          return true;
      } else {
          console.log("\n Intern's school should not include numbers")
          return false;
      }
    }
  },
];
//Starting on node run, asking manager's information
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the managers name?",
      name: "managerName",
      validate: function (name){
        valid = /^[A-Za-z\s]*$/.test(name)
        if (valid){
            return true;
        } else {
            console.log("\n Manager's name should not include numbers (unless you're a cyborg)")
            return false;
        }
      }
    },
    {
      type: "input",
      message: `What is the manager's employee ID?`,
      name: "managerID",
      validate: function (id){
        valid = /^[0-9]*$/.test(id)
        if (valid){
            return true;
        } else {
            console.log("\n Manager's id should not include special characters or letters")
            return false;
        }
      }
    },
    {
      type: "input",
      message: "What is the managers email?",
      name: "managerEmail",
      validate: function (email){
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (valid){
            return true;
        } else {
            console.log("\n You must enter email with valid email formatting i.e. 'test@email.com' ")
            return false;
        }
      }
    },
    {
      type: "input",
      message: "What is the managers office number?",
      name: "managerOffice",
      validate: function (officeNumber){
        valid = /^[0-9]*$/.test(officeNumber)
        if (valid){
            return true;
        } else {
            console.log("\n Manager's office number should not include special characters")
            return false;
        }
      }
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
                ans.engEmail,
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
                ans.intSchool,
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
            fs.writeFile("./dist/index.html", team(teamArr), (err) =>
              err ? console.log(err) : console.log("generating HTML........")
            );
          }
        });
    };
    questions();
  });