const { test, expect } = require("@jest/globals");

const Employee = require("../lib/Employee");

test("Employee constructor", () => {
    describe("can generate new constructors", () => {
        let employee = new Employee("employee", "123", "employee@gmail.com");
        expect(employee.name).toBe("employee");
        expect(employee.id).toBe("123");
        expect(employee.email).toBe("employee@gmail.com");
    });
    describe("can get values using get functions", () => {
        let employee = new Employee("employee", "123", "employee@gmail.com");
        expect(employee.getName()).toBe("employee");
        expect(employee.getID()).toBe("123");
        expect(employee.getEmail()).toBe("employee@gmail.com");
        expect(employee.getRole()).toBe("Employee");
    });
});