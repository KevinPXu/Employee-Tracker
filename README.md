# Employee-Tracker

## Technologies Used

- JavaScript
- Node.js
- express.js
- nodemon.js
- mysql + mysql express package
- console.table
- VS Code
- Git
- GitHub

## Summary

This project was use as an introduction to the mysql database structure and as an overall introduction to querying and creating databases. Using mysql allowed us to create relational tables which we were able to query for specific data and return a organized table of information. I was also able to add and update values from the already created databases.

## Demonstration

View demo: https://drive.google.com/file/d/1PP7U4nKMJlfxlTPIa4AVQvfEmG5sNTT1/view

## Description

A command line application that allows you to view and track the employees in your business. Each employee has a specific role and each role has a department associated with it. Each role includes the roles name and salary and each employee includes the name of the employee, the manager of that employee and the role they are associated with. You are able to select from a list of options which include viewing and adding to any three of the given categories as well as updating the role on the employee. When viewing the information is given in an organized list.

## Code Snippet

### creates a connection the database we created using the schema and the seed files

```JavaScript
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
```

### example of a query selection to view employees

```JavaScript
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
```

## Author Links

[LinkedIn](https://www.linkedin.com/in/kevin-xu-4672a7215/)
[GitHub](https://github.com/KevinPXu)
1
