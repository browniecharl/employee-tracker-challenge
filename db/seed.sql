USE employees_db;

INSERT INTO department (name)
VALUES
('Marketing'),
('Finance'),
('Sales'),
('Human Rescource'),
('Purchase'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Marketing Specialist', 75000, 601),
('Accountant', 120000, 605),
('Sales Rep', 60000, 610),
('HR Director', 80000, 609),
('Category Buyer', 55000, 604),
('Attorney', 200000, 602);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tony', 'Romo', 09, 400),
('Emmit', 'Smith', 22, 401),
('Dak', 'Prescott', 04, 402),
('Michael', 'Irvin', 88, 403),
('Troy', 'Aikman', 08, 404),
('Terrell', 'Owens', 87, 405);