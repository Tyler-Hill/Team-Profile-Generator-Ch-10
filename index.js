// Enter the team manager’s name, employee ID, email address, and office number
// Menu to add engineer/intern/or finish building team
// Select engineer: I am prompted to enter the engineer’s name, ID, email, and GitHub username,
// I am taken back to the menu
// Select intern: enter the intern’s name, ID, email, and school,
// Select Finish
// Generate HTML File
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const team = [];

// Create Manager
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",
      },

      {
        type: "input",
        message: "What is your manager's employee ID?",
        name: "managerID",
      },

      {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail",
      },

      {
        type: "input",
        message: "What is your manager's number?",
        name: "managerNumber",
      },
    ])
    .then((answers) => {
      console.log(answers);
      // Create a new Manager Object from the manager class.
      const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerNumber);
      // Push manager on to team array.
      team.push(manager);
      createTeam();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Engineer's name?",
        name: "engineerName",
      },

      {
        type: "input",
        message: "What is your Engineer's employee ID?",
        name: "engineerID",
      },

      {
        type: "input",
        message: "What is your Engineer's email?",
        name: "engineerEmail",
      },

      {
        type: "input",
        message: "What is your Engineer's Github?",
        name: "engineerGithub",
      },
    ])
    .then((answers) => {
      console.log(answers);
      // Create a new Manager Object from the manager class.
      const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
      // Push engineer on to team array.
      team.push(engineer);
      // Push engineer on to team array.
      createTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Intern's name?",
        name: "internName",
      },

      {
        type: "input",
        message: "What is your Intern's employee ID?",
        name: "internID",
      },

      {
        type: "input",
        message: "What is your Intern's email?",
        name: "internEmail",
      },

      {
        type: "input",
        message: "What is your Intern's School?",
        name: "internSchool",
      },
    ])
    .then((answers) => {
      console.log(answers);
      // Create a new Manager Object from the manager class.
      const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
      // Push intern on to team array.
      team.push(intern);
      // Push intern on to team array.
      createTeam();
    });
}
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Add an Engineer or an Intern or Finish?",
        name: "mainMenu",
        choices: ["Engineer", "Intern", "Finish"],
      },
    ])
    .then((answers) => {
      if (answers.mainMenu === "Engineer") {
        createEngineer();
      } else if (answers.mainMenu === "Intern") {
        createIntern();
      } else {
        const parseHTML = generateHTML(team);

        // Write to File
        fs.writeFile("team.html", parseHTML, (err) => (err ? console.error(err) : console.log("Success!")));
      }
    });
}
// Generate HTML
const generateHTML = (team) => {
  const managerTemplate = `<div class="manager-card">
<h3 class= "employee-name">${team[0].getName()} </h3>
<h4 class="title">Manager</h4>
<div>ID: ${team[0].getId()} </div>
<div>Email: ${team[0].getEmail()} </div>
<div>Office Number: ${team[0].getOfficeNumber()} </div> 
</div>`;

  const engineers = team.filter((employee) => employee.getRole() === "Engineer");

  let engineerTemplate = "";

  engineers.forEach((engineer) => {
    engineerTemplate += `<div class="engineer-card"> 
<h3 class= "employee-name">${engineer.getName()} </h3>
<h4 class="title">Engineer</h4>
<div>ID: ${engineer.getId()} </div>
<div>Email: ${engineer.getEmail()} </div>
<div>Github: <a href="https://github.com/${engineer.getGithub()}" target="_blank"> ${engineer.getGithub()} </a> </div>
</div>`;
  });

  const interns = team.filter((employee) => employee.getRole() === "Intern");

  let internTemplate = "";

  interns.forEach((intern) => {
    internTemplate += `<div class="intern-card"> 
<h3 class= "employee-name">${intern.getName()} </h3>
<h4 class="title">Intern</h4>
<div>ID: ${intern.getId()} </div>
<div>Email: ${intern.getEmail()} </div>
<div>School: ${intern.getSchool()} </div>
</div>`;
  });

  const document = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Team Profile Builder</title>
</head>
<body>
<h1 class="heading"> Team Profile </h1>
${managerTemplate}
<div class="employee-wrapper">
${engineerTemplate}
${internTemplate}
</div>
</body>
</html>`;
  return document;
};
// Ask Questions to Populate HTML

createManager();
