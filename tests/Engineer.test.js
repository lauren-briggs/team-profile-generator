const { test, expect } = require("@jest/globals");

const Engineer = require("../lib/Engineer");

test("Engineer constructor", () => {
    describe("can generate new constructor", () => {
        let engineer = new Engineer("engineer", "123", "engineer@gmail.com", "engineer-github");
        expect(engineer.name).toBe("engineer");
        expect(engineer.id).toBe("123");
        expect(engineer.email).toBe("engineer@gmail.com");
        expect(engineer.github).toBe("engineer-github");
    });
    describe("can get values using get functions", () => {
        let engineer = new Engineer("engineer", "123", "engineer@gmail.com", "engineer-github");
        expect(engineer.getName()).toBe("engineer");
        expect(engineer.getID()).toBe("123");
        expect(engineer.getEmail()).toBe("engineer@gmail.com");
        expect(engineer.getGithub()).toBe("engineer-github");
        expect(engineer.getRole()).toBe("Engineer");
    });
});