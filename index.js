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
