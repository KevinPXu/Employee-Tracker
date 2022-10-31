const mysql = require("mysql2");
const inquirer = require("inquirer");

//creates a connection to the mysql database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password",
    database: "employee_db",
  },
  console.log(`employee.db database connection successful`)
);

init();

async function init() {
  console.log("hello");
  do {
    var { choice } = await initChoice();

    switch (choice) {
      case "View all departments":
        viewDepartments();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all employees":
        viewEmployees();
        break;

      case "Add a department":
        break;
      case "Add a department":
        break;
      case "Add a role":
        break;
      case "Add an employee":
        break;
      case "Update an employee":
        break;
      default:
        break;
    }
  } while (choice !== "Quit");
}

async function initChoice() {
  const res = await inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  });
  console.log(res);
  return res;
}

function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.log(results);
  });
}

function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.log(results);
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.log(results);
  });
}
