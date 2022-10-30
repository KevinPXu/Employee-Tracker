DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    departments_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    departments_id INT,
    FOREIGN KEY (departments_id)
    REFERENCES departments(departments_id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    employees_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    manager_name VARCHAR(60),
    roles_id INT,
    FOREIGN KEY(roles_id)
    REFERENCES roles(roles_id)
    ON DELETE SET NULL
);

