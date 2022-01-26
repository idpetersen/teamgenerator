//Importing Employee module
const Employee = require('./Employee')
//Creating a new class called Manager and extending it off of the Employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email)
        this.officeNumber = officeNumber
    }
    getOfficeNumber(){
        return this.officeNumber
    }
    getRole(){
        return 'Manager'
    }
}
//Exporting module for later use in the index.js file
module.exports = Manager;