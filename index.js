const mysql = require("mysql2");
const inquirer = require("inquirer");

//creates a connection to the mysql database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password",
    database: "employees_db",
  },
  console.log(`employee.db database connection successful`)
);

db.connect((err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  init();
});

// init();

async function init() {
  let { choice } = await initChoice();
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
}

//function that prompts the user to choose what to see or do next.
async function initChoice() {
  console.log("hello");
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

//function that displays all the departments
function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    const objKeys = Object.keys(results[0]);
    console.table(results, objKeys);
    init();
  });
}

//function that displays the roles the company has and which department each role is in
function viewRoles() {
  db.query(
    "SELECT roles.roles_id AS roleID, roles.job_title AS title, roles.salary AS salary, departments.departments_name AS department FROM roles JOIN departments ON departments.departments_id = roles.departments_id;",
    function (err, results) {
      const objKeys = Object.keys(results[0]);
      console.table(results, objKeys);
      init();
    }
  );
}

//function that displays the employees of the company including their role and the department they are in
function viewEmployees() {
  db.query(
    'SELECT employees.employees_id AS EmployeeID, CONCAT(employees.first_name, " ", employees.last_name) AS employeeName, employees.manager_name AS managerName, roles.job_title AS jobTitle, roles.salary AS salary, departments.departments_name AS department FROM employees JOIN roles ON roles.roles_id = employees.roles_id JOIN departments ON departments.departments_id = roles.departments_id;',
    function (err, results) {
      const objKeys = Object.keys(results[0]);
      console.table(results, objKeys);
      init();
    }
  );
}
