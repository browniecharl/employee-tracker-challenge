const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_db'
});

connection.connect(function(err) {
    if (err) throw err
    console.log('connected as Id' + connection.threadId)
    startTracker();
});

const startTracker = () => {
    inquirer.prompt ({
            type: 'list',
            name: 'choice',
            message: 'Please select an option.',
            choices: [
                'View All Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role'
            ]
        }).then((answer) => {
        switch (answer.choice) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'View Departments':
                viewByDepts();
                break;
            case 'View Roles':
                viewByRole();
                break;
            case 'Add Employee':
                addEmp();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Update Employee Role':
                updateEmpRole();
                break;
        }
    })
};
const viewEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table('Employee List:', res);
        startTracker();
    });
};
const viewByDepts = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table('Department List:', res);
        startTracker();
    });
};
const viewByRole = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table('Role List:', res);
        startTracker();
    });
};
const addEmp = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter first name of employee'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter last name of employee'
            },
            {
                type: 'List',
                name: 'role',
                message: 'Select role for employee',
                choices: function () {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                }
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter manager id of employee'
            }
        ]).then((answer) => {
            let role_id;
            for (let m = 0; m < res.length; m++) {
                if (res[m].title == answer.role) {
                    role_id = res[m].id;
                    console.log(role_id)
                }
            }
            connection.query('INSERT INTO employee SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: role_id,
                manager_id: answer.manager_id
        },
        function (err) {
            if (err) throw err;
            console.log('Employee has been added');
            startTracker();
        })
    })
})
};