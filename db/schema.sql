DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Velez", 1, NULL), ("Joe", "Rogan", 2, 1), ("Donald", "Trump", 3, NULL), ("Joe", "Biden", 4, 3), ("Tyrese", "Gibson", 5), ("Ricky", "Ricardo", 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Jordan", 2, 1), ("Kobe", "Bryant", 4, 3), ("Lebron", "James", 6, 5);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1), ("Salesperson", 65000, 1), ("Tech Support", 90000, 2), ("Service Rep", 60000, 2), ("HR Specialist", 100000, 3), ("HR Director", 125000, 3);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Customer Service"), ("Human Resources");