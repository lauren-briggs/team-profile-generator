const { test, expect } = require("@jest/globals");

const Intern = require("../lib/Intern");

test("Intern test", () => {
    describe("can generate new constructors", () => {
        let intern = new Intern("intern", "123", "intern@gmail.com", "monash");
        expect(intern.name).toBe("intern");
        expect(intern.id).toBe("123");
        expect(intern.email).toBe("intern@gmail.com");
        expect(intern.school).toBe("monash");
    });
    describe("can get values using get functions", () => {
        let intern = new Intern("intern", "123", "intern@gmail.com", "monash");
        expect(intern.getName()).toBe("intern");
        expect(intern.getID()).toBe("123");
        expect(intern.getEmail()).toBe("intern@gmail.com");
        expect(intern.getSchool()).toBe("monash");
        expect(intern.getRole()).toBe("Intern");
    });
});