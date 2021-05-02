// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// Include lib modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


//  Empty array to hold employees as they are added
const employees = [];
const manager = [];
const engineers = [];
const interns = [];

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
    console.log(`manager name: ${data.name}, manager id: ${data.id}, manager email: ${data.email}`);
    newManager = new Manager(data.name, data.id, data.email, data.number);
    console.log(newManager);
    inquirer.prompt([
        {
            type: "input",
            name: "number",
            message: "Office Number:",
            default: "9888 8888",
        },
    ])
        // TO DO: add office NUMBER to newManager
        .then(addAnother);
}

function handleEngineer(data) {
    console.log(`handle engineer data: ${data.another}`);
    inquirer.prompt(questions)
        .then((data) => {
            newEngineer = new Engineer(data.name, data.id, data.email, data.github);
            console.log(newEngineer);
        })
        .then(() => {
            inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "github",
                        message: "Github username:",
                        default: "lauren-github",
                    },
                ]
            )
        })

        // TO DO: add github data to newEngineer
        .then(() => {
            addAnother();
        });
}

function handleIntern(data) {
    console.log(`handle intern data: ${data}`);
    inquirer.prompt(questions)
        .then((data) => {
            newIntern = new Intern(data.name, data.id, data.email, data.school);
            console.log(newIntern);
        })
        .then(() => {
            inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "school",
                        message: "School:",
                        default: "Monash",
                    },
                ]
            )
                .then((data) => {
                    // TO DO: add school data to newIntern
                    return data.school
                })
        })
        .then(() => {
            addAnother()
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
                // TO DO: create a generate html function
                generateHTML();
            }
        })
};

// fuction generateHTML(){

// };

promptUser();
