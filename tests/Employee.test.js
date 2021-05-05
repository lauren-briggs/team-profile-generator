const { test, expect } = require("@jest/globals");

const Employee = require("../lib/Employee");

test("Employee constructor", () => {
    let employee = new Employee("employee", "123", "employee@gmail.com");
    expect(employee.name).toBe("employee");
    expect(employee.id).toBe("123");
    expect(employee.email).toBe("employee@gmail.com");
});