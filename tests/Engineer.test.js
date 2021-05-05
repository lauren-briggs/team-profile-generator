const { test, expect } = require("@jest/globals");

const Engineer = require("../lib/Engineer");

test("Engineer constructor", () => {
    let engineer = new Engineer("engineer", "123", "engineer@gmail.com", "engineer-github");
    expect(engineer.name).toBe("engineer");
    expect(engineer.id).toBe("123");
    expect(engineer.email).toBe("engineer@gmail.com");
    expect(engineer.github).toBe("engineer-github");
});