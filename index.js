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

async function init(){
    do{
        var {choice} = await initChoice();
        
        switch

    }while(choice !== "quit");
}

async function initChoice(){
    const res = inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees", 
            "add a department", 
            "add a role",
            "add an employee", 
            "update an employee role",
            "quit"]
    });
    return res;
}
