const { test, expect } = require("@jest/globals");

const Intern = require("../lib/Intern");

test("Intern test", () => {
    let intern = new Intern("intern", "123", "intern@gmail.com", "monash");
    expect(intern.name).toBe("intern");
    expect(intern.id).toBe("123");
    expect(intern.email).toBe("intern@gmail.com");
    expect(intern.school).toBe("monash");
});