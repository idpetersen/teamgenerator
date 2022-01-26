//Defining and exporting the Employee's class. This class has all the basic elements needed for an employee
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email
    }
    getRole(){
        return 'Employee'
    }
}
//Exporting module for later use in each new class that depends on it
module.exports = Employee