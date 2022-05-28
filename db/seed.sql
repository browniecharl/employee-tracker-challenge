USE employees_db;

INSERT INTO department (name)
VALUES ('Finance');
INSERT INTO department (name)
VALUES ('Legal');
INSERT INTO department (name)
VALUES ('Human Resources');
INSERT INTO department (name)
VALUES ('Sales');
INSERT INTO department (name)
VALUES ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Attorney', 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('HR Specialist', 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Rep', 75000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Tech Support', 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Robert', 'Velez', 11, 22);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carlton', 'Banks', 33, 44);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Will', 'Smith', 55, 66);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tony', 'Hawk', 77, 88);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Bournquist', 99, 98;)