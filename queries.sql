SELECT employees.employees_id AS EmployeeID, CONCAT(employees.first_name, " ", employees.last_name) AS employeeName, employees.manager_name AS managerName, roles.job_title AS jobTitle, roles.salary AS salary, departments.departments_name AS department
FROM employees 
JOIN roles ON roles.roles_id = employees.roles_id JOIN departments ON departments.departments_id = roles.departments_id;