const { test, expect } = require("@jest/globals");

const Manager = require("../lib/Manager");

test("Manager test", () => {
    let manager = new Manager("manager", "123", "manager@gmail.com", "9888 9999");
    expect(manager.name).toBe("manager");
    expect(manager.id).toBe("123");
    expect(manager.email).toBe("manager@gmail.com");
    expect(manager.number).toBe("9888 9999");
});