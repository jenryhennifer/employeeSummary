// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email); //super is grabbing from 'emplyee' class and asking for all the constructor elements from employee
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber; //returns whatever the office number given is
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;