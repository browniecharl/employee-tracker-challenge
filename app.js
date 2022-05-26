const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_db'
});

connection.connect((err) => {
    if (err) throw err;
    tracker();
})

const tracker = () => {
    inquirer.prompt({
        type: 'list',
        name: 'menuOption',
        Message: 'Please choose an option',
        choices: [
            'Add department',
            'Add employee',
            'Add role',
            'View departments',
            'View employees',
            'View roles',
            'Update role'
        ]
    })
    .then((answer) => {
        switch(answer.menuOption) {
            case 'Add department':
                addDept();
                break;
            case 'Add employee':
                addEmp();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View departments':
                viewDep();
                break;
            case 'View employees':
                viewEmp();
                break;
            case 'View roles':
                viewRole();
                break;
            case 'Update role':
                updateRole();
                break;                
        }
    })
};

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'theDepartment',
            message: 'Enter the department name',
        }
    ]).then((answer) => {
        connection.query(
            'INSERT INTO department SET?',
            {
                name: answer.theDepartment
            }
        );
        connection.query('SELECT * FROM department', function (err, res) {
            if (err) throw err;
            console.log ('Department has been successfully added.');
            tracker();
        })

    })
};
const addEmp = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of employee.'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter last name of the employee'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select a role for the employee',
                choices: function () {
                    const roleArray = [];
                    for(let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                }
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter managers ID if employee is not the manager'
            }
        ]).then((answer) => {
            let role_id;
            for (let m = 0; m < res.length; m++) {
                if (res[m].title === answer.role) {
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
                console.log('Employee has been successfully added');
                tracker();
            })
        })
    })
};
const addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the employees role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary for employee'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Select a role for the employee',
                choices: function() {
                    const departmentArray = [];
                    for (let i = 0; i < res.length; i++) {
                        departmentArray.push(res[i].name);
                    }
                    return departmentArray;
                }
            }
        ]).then((answer) => {
            let department_id;
            for (let m = 0; i < res.length; m++) {
                if (res[m].name === answer.department) {
                    department_id = res[m].id;
                }
            }
            connection.query('INSERT INTO role SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: department_id,
            },
            function (err) {
                if (err) throw err;
                console.log('Role for employee has been successfully added');
                tracker();
            })
        })
    })
};