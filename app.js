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
            
        ])
    })
}