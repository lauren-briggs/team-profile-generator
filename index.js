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
                <link href="style.css" rel="stylesheet">
            </head>

            <body>

                <header>
                    <h1>Team Profile</h1>
                </header>
                <main>
                    <section id="output-container">
                        <div class="row row-cols-1 row-cols-md-2 g-4">
                        </div>
                    </section>
                </main>

            </body>

        </html>
    `
    fs.writeFile("index.html", html, (err) => {
        if (err) throw err;
        console.log("Write file")
    })
};

// function addTeamMember(){
//     <div class="card border-info mb-3">
//     <div class="card-header" id="position">Header</div>
//     <div class="card-body">
//         <h5 class="card-title" id="name">Info card title</h5>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk
//             of
//             the card's content.</p>
//     </div>
// </div>
// </div>
// }

promptUser();
