const { test, expect } = require("@jest/globals");

const Manager = require("../lib/Manager");

test("Manager test", () => {
    describe("can generate new constructor", () => {
        let manager = new Manager("manager", "123", "manager@gmail.com", "9888 9999");
        expect(manager.name).toBe("manager");
        expect(manager.id).toBe("123");
        expect(manager.email).toBe("manager@gmail.com");
        expect(manager.number).toBe("9888 9999");
    });
    describe("can get values using get functions", () => {
        let manager = new Manager("manager", "123", "manager@gmail.com", "9888 9999");
        expect(manager.getName()).toBe("manager");
        expect(manager.getID()).toBe("123");
        expect(manager.getEmail()).toBe("manager@gmail.com");
        expect(manager.getNumber()).toBe("9888 9999");
        expect(manager.getRole()).toBe("Manager");
    });
});