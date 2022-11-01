const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
      addDepartment();
      break;
    case "Add a role":
      addRole(await getDepartmentList());
      break;
    case "Add an employee":
      addEmployee(await getRoles(), await getManager());
      break;
    case "Update an employee role":
      break;
    default:
      break;
  }
}

//function that prompts the user to choose what to see or do next.
async function initChoice() {
  console.log("hello");
  let res = await inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View all departments",
      "Add a department",
      "View all roles",
      "Add a role",
      "View all employees",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  });
  return res;
}

//function that displays all the departments
function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    init();
  });
}

//function that displays the roles the company has and which department each role is in
function viewRoles() {
  db.query(
    "SELECT roles.roles_id AS roleID, roles.job_title AS title, roles.salary AS salary, departments.departments_name AS department FROM roles JOIN departments ON departments.departments_id = roles.departments_id;",
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.table(results);
      init();
    }
  );
}

//function that displays the employees of the company including their role and the department they are in
function viewEmployees() {
  db.query(
    'SELECT employees.employees_id AS EmployeeID, CONCAT(employees.first_name, " ", employees.last_name) AS employeeName, employees.manager_name AS managerName, roles.job_title AS jobTitle, roles.salary AS salary, departments.departments_name AS department FROM employees JOIN roles ON roles.roles_id = employees.roles_id JOIN departments ON departments.departments_id = roles.departments_id;',
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      const objKeys = Object.keys(results[0]);
      console.table(results);
      init();
    }
  );
}

//adds a Department to the departments table
async function addDepartment() {
  let { departmentName } = await inquirer.prompt({
    type: "input",
    message: "What is the name of the department",
    name: "departmentName",
  });

  db.query(
    "INSERT INTO departments (departments_name) VALUES (?)",
    departmentName,
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("successfully added department");
    }
  );
  init();
}

function getDepartmentList() {
  return new Promise((resolve, reject) => {
    db.query("SELECT departments_name FROM departments", (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.map((object) => object.departments_name));
    });
  });
}

async function addRole(departmentNames) {
  let { roleName, salary, whichDepartment } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role?",
      name: "roleName",
    },
    {
      type: "input",
      message: "What is the salary for the role?",
      name: "salary",
    },
    {
      type: "list",
      message: "Which department does the role belong to?",
      name: "whichDepartment",
      choices: departmentNames,
    },
  ]);

  db.query(
    "INSERT INTO roles SET job_title = ?, departments_id = (SELECT departments_id FROM departments WHERE departments.departments_name = ?), salary = ?",
    [roleName, whichDepartment, salary],
    (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("successfully added role");
    }
  );
  init();
}

function getRoles() {
  return new Promise((resolve, reject) => {
    db.query("SELECT job_title FROM roles", (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.map((object) => object.job_title));
    });
  });
}

function getManager() {
  return new Promise((resolve, reject) => {
    db.query("SELECT manager_name FROM employees", (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.map((object) => object.manager_name));
    });
  });
}

async function addEmployee(roleName, managerName) {
  let { firstName, lastName, whichRole, manager } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "whichRole",
      choices: roleName,
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",
      choices: managerName,
    },
  ]);

  db.query(
    "INSERT INTO employees SET first_name = ?, last_name = ?, roles_id = (SELECT roles_id FROM roles WHERE roles.job_title = ?), manager_name = ?",
    [firstName, lastName, whichRole, manager],
    (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log("successfully added employee");
    }
  );
  init();
}
