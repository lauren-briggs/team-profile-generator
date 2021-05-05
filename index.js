// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// Include lib modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { resolve } = require("path");
// const { left } = require("inquirer/lib/utils/readline");


//  Empty array to hold employees as they are added
let managers = [];
let engineers = [];
let interns = [];

const questions = [
    {
        type: "input",
        name: "name",
        message: "Name:",
        default: "Lauren",
    },
    {
        type: "input",
        name: "id",
        message: "Employee ID:",
        default: "12345",
    },
    {
        type: "input",
        name: "email",
        message: "Email address:",
        default: "lauren@gmail.com",
    },
]

function initApp() {
    generateHTML();
    promptUser();
}

function promptUser() {
    inquirer.prompt(questions)
        .then(handleManager);
}

function handleManager(data) {
    inquirer.prompt([
        {
            type: "input",
            name: "number",
            message: "Office Number:",
            default: "9888 8888",
        }
    ])
        .then((data2) => {
            newManager = new Manager(data.name, data.id, data.email, data2.number);
            managers.push(newManager);
            addTeamMemberHTML(newManager);
            addAnother();
        });
}

function handleEngineer(data) {
    console.log(`Adding a new ${data.another}`);
    inquirer.prompt(questions)
        .then((data) => {
            inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "github",
                        message: "Github username:",
                        default: "lauren-github",
                    },
                ]
            ).then((data2) => {
                newEngineer = new Engineer(data.name, data.id, data.email, data2.github);
                engineers.push(newEngineer);
                addTeamMemberHTML(newEngineer);
                addAnother();
            });
        })
}

function handleIntern(data) {
    console.log(`Adding a new ${data.another}`);
    inquirer.prompt(questions)
        .then((data) => {
            inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "school",
                        message: "School:",
                        default: "Monash",
                    },
                ]
            ).then((data2) => {
                newIntern = new Intern(data.name, data.id, data.email, data2.school);
                interns.push(newIntern);
                addTeamMemberHTML(newIntern);
                addAnother();
            })
        });
}

function addAnother() {
    inquirer.prompt(
        [
            {
                type: "list",
                name: "another",
                message: "Would you like to add another employee?",
                choices: ["Engineer", "Intern", "No I am finished building my team."],
                default: "No I am finished building my team.",
            }
        ]
    )
        .then((data) => {
            if (data.another === "Engineer") {
                handleEngineer(data);
            } else if (data.another === "Intern") {
                handleIntern(data);
            } else {
                finaliseHTML();
                console.log("Finished adding employees")
                console.log(managers);
                console.log(interns);
                console.log(engineers);
            }
        })
};

function generateHTML() {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Generator</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.typekit.net/xhi1jxe.css">
        <link href="style.css" rel="stylesheet">
    </head>
    
    <body>
    
        <header>
            <h1>Team Profile</h1>
        </header>
        <main>
            <section id="output-container">
                <div class="card-group">
    `
    fs.writeFile("index.html", html, (err) => {
        if (err) throw err;
        console.log("Writing file with initial HTML");
    })
};

function addTeamMemberHTML(newEmployee) {
    const name = newEmployee.getName();
    const id = newEmployee.getID();
    const email = newEmployee.getEmail();
    const role = newEmployee.getRole();

    console.log(name, id, email, role)

    let newCode = "";

    if (role === "Manager") {
        const number = newEmployee.getNumber();
        console.log("Adding Manager HTML")
        newCode = `
            <div class="card">
                <div class="card-header manager">
                    <h3 class="card-title" id="name">${name}</h3>
                    <p>${role}</p>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: #${id}</li>
                        <li class="list-group-item"><a href="mailto:${email}">${email}</a></li>
                        <li class="list-group-item">${number}</li>
                    </ul>
                </div>
            </div>
        `
    } else if (role === "Engineer") {
        const github = newEmployee.getGithub();
        console.log("Adding Engineer HTML")
        newCode = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" id="name">${name}</h3>
                <p>${role}</p>
            </div>
            <div class="card-body">

                <ul class="list-group">
                    <li class="list-group-item">ID: #${id}</li>
                    <li class="list-group-item"><a href="mailto:${email}">${email}</a></li>
                    <li class="list-group-item"><a href="https://github.com/${github}"
                            class="card-link">${github}</a></li>
                </ul>
            </div>
        </div>
        `
    } else if (role === "Intern") {
        const school = newEmployee.getSchool();
        console.log("Adding Intern HTML")
        newCode = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" id="name">${name}</h3>
                <p>${role}</p>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: #${id}</li>
                    <li class="list-group-item"><a href="mailto:${email}">${email}</a></li>
                    <li class="list-group-item">${school}</li>
                </ul>
            </div>
        </div>
        `
    }
    fs.appendFile("index.html", newCode, (err) => {
        if (err) throw err;
        console.log("Appending file with code for new employee");
    })
}

function finaliseHTML() {
    const finalHTML = `
                            </div>

                        </div>
                    </section>
                </main>

            </body>

        </html>
        `;
    fs.appendFile("index.html", finalHTML, (err) => {
        if (err) throw err;
        console.log("Appending file with final HTML");
    })
}

initApp();