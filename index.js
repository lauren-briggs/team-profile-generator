// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// Include lib modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
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


function promptUser() {
    inquirer.prompt(questions)
        .then(handleManager);
}

function handleManager(data) {
    // console.log(`manager name: ${data.name}, manager id: ${data.id}, manager email: ${data.email}`);
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
            addAnother();
        });
}

function handleEngineer(data) {
    console.log(`handle engineer data: ${data.another}`);
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
                addAnother();
            });
        })
}

function handleIntern(data) {
    console.log(`handle intern data: ${data}`);
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
                addAnother()
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
                generateHTML();
            }
        })
};

function generateHTML() {
    console.log(managers);
    console.log(interns);
    console.log(engineers);


};

promptUser();
