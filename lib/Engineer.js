//Importing Employee module
const Employee = require('./Employee')
//Creating a new class called Engineer and extending it off of the Employee class
class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email)
        this.github = github;
    }
    getGithub(){
        return this.github
    }
    getRole(){
        return 'Engineer'
    }
}
//Exporting module for later use in the index.js file
module.exports = Engineer;