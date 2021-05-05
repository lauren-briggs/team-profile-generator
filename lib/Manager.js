const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, number) {
        super(name, id, email);
        this.number = number;
    }
    getName() {
        return this.name;
    };
    getID() {
        return this.id;
    };
    getEmail() {
        return this.email;
    };
    getNumber() {
        return this.number;
    };
    getRole() {
        return "Manager";
    };
}

module.exports = Manager;