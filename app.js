const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


var teamList = [];
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter manager's name:",

    },
    {
        type: "input",
        name: "id",
        message: "Enter ID number:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter manager's email:",

    },
    {
        type: "input",
        name: "officeNum",
        message: "Enter office number:",
    },
    {
        type: "list",
        name: "team",
        message: "Do you have any team members?",
        choices: ["Yes", "No"]
    }
]

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter employee's name:",

    },
    {
        type: "input",
        name: "email",
        message: "Enter employee's email:",

    },
    {
        type: "input",
        name: "id",
        message: "Enter ID number:"
    },
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: ["Engineer", "Intern"]
    },
    {
        when: input => {
            return input.role == "Engineer"
        },
        type: "input",
        name: "github",
        message: "Enter your github username:",

    },
    {
        when: input => {
            return input.role == "Intern"
        },
        type: "input",
        name: "school",
        message: "Enter your school name:",

    },
    {
        type: "list",
        name: "addAnother",
        message: "Add another team member?",
        choices: ["Yes", "No"]
    }
]

function buildTeamList() {
    inquirer.prompt(employeeQuestions).then(employeeInfo => {
        if (employeeInfo.role == "Engineer") {
            var newMember = new Engineer(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.github);
        } else {
            var newMember = new Intern(employeeInfo.name, employeeInfo.id, employeeInfo.email, employeeInfo.school);
        }
        teamList.push(newMember);
        if (employeeInfo.addAnother === "Yes") {
            console.log(" ");
            buildTeamList();
        } else {
            buildHtmlPage();
        }
    })
}

function buildHtmlPage() {
    fs.writeFileSync(outputPath, render(teamList));
};


function init() {
    inquirer.prompt(managerQuestions).then(managerInfo => {
        let teamManager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNum);
        teamList.push(teamManager);
        console.log(" ");
        if (managerInfo.team === "Yes") {
            buildTeamList();
        } else {
            buildHtmlPage();
        }
    })
}

init();


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
