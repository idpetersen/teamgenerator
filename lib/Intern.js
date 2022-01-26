//Importing Employee module
const Employee = require('./Employee')
//Creating a new class called intern and extending it off of the Employee class
class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email)
        this.school = school
    }
    getSchool(){
        return this.school
    }
    getRole(){
        return 'Intern'
    }
}
//Exporting module for later use in the index.js file
module.exports = Intern;