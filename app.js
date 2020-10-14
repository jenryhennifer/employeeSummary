const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer"); 

//NEW EMPLOYEE DROP OPTIONS 
const newEmployeeInputs = [{
    type: 'list',
    name: 'employeeType',
    message: 'Add an Employee: ',
    choices: ['Intern', 'Engineer', 'Done']
}]
//MANAGER
const managerPrompts = [{
    type: 'input',
    name: 'name',
    message: 'Manager name: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
},
{
    type: 'input',
    name: 'id',
    message: 'Employee ID: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
},
{
    type: 'input',
    name: 'email',
    message: 'Email: ',
    validate: function (email) {
        // tests for proper email format
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (valid) {
            return true;
        } else {
            return "Please enter a valid email";
        }
    }
},
{
    type: 'input',
    name: 'officeNumber',
    massage: 'Office Number: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
}
]
//INTERN
const internPrompts = [{
    type: 'input',
    name: 'name',
    message: 'Name: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
},
{
    type: 'input',
    name: 'id',
    message: 'Employee ID: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
},
{
    type: 'input',
    name: 'email',
    message: 'Email: ',
    validate: function (email) {
        // tests for proper email format
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (valid) {
            return true;
        } else {
            return "Please enter a valid email";
        }
    }
},
{
    type: 'input',
    name: 'school',
    message: 'School: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
}]
//ENGINEER
const engineerPrompts = [{
    type: 'input',
    name: 'name',
    message: 'Name: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
},
{
    type: 'input',
    name: 'id',
    message: 'Employee ID: ',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
},
{
    type: 'input',
    name: 'email',
    message: 'Email: ',
    validate: function (email) {
        // tests for proper email format
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (valid) {
            return true;
        } else {
            return "Please enter a valid email";
        }
    }
},
{
    type: 'input',
    name: 'github',
    message: 'GitHub',
    validate: function (name) {
        if (name.length <= 0) {
            return 'Must provide input';
        }
        return true;
    }
}]

//saves array of the employee lists
const employeeList = []

function newEmployeeMenu() {
    inquirer.prompt(newEmployeeInputs)
        .then(function (answer) {
            console.log(answer)
            if (answer.employeeType === 'Intern') {
                inquirer.prompt(internPrompts)
                    .then(function (internResponse) {
                        const intern = new Intern(internResponse.name, internResponse.id, internResponse.email, internResponse.school)
                        employeeList.push(intern)
                        newEmployeeMenu(); // loops the employee menu
                    })
            } else if (answer.employeeType === 'Engineer') {
                inquirer.prompt(engineerPrompts)
                    .then(function (engineerResponse) {
                        const engineer = new Engineer(engineerResponse.name, engineerResponse.id, engineerResponse.email, engineerResponse.github)
                        employeeList.push(engineer)
                        newEmployeeMenu(); // loops the employee menu
                    })
            } else {
                //add the render here!

                //creating an element for render (render is a function inside of the htmlRenderer.js) which renders employeeList
                const output = render(employeeList);
                //write the file to output/team.html with an error throw
                fs.writeFile('output/team.html', output, 'utf8', function (err) {
                    console.log('success!')
                })
            }
        })
}

function createManager() {
    inquirer.prompt(managerPrompts)
        .then(function (managerResponse) {
            const manager = new Manager(managerResponse.name, managerResponse.id, managerResponse.email, managerResponse.officeNumber);
            employeeList.push(manager)
            newEmployeeMenu(); //begins newEmployeeMenu
        })
}

//this will start the newEmployeeMenu
createManager() 