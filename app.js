const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


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

        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (valid) {
            console.log("Great job");
            return true;
        } else {
            console.log(".  Please enter a valid email")
            return false;
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

        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (valid) {
            console.log("Great job");
            return true;
        } else {
            console.log(".  Please enter a valid email")
            return false;
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
},
{
    type: 'input',
    name: 'id',
    message: 'Employee ID: '
},
{
    type: 'input',
    name: 'email',
    message: 'Email: '
},
{
    type: 'input',
    name: 'github',
    message: 'GitHub'
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
                        console.log(employeeList)
                    })
            } else {
                //add the render here!
                const output = render(employeeList);
                fs.writeFile('output/team.html', output, 'utf8', function (err) {
                    console.log('success!')
                })
                console.log(output);
                console.log(employeeList)
                console.log('DONE')
            }
        })
}

function createManager() {
    inquirer.prompt(managerPrompts)
        .then(function (managerResponse) {
            const manager = new Manager(managerResponse.name, managerResponse.id, managerResponse.email, managerResponse.email);
            employeeList.push(manager)
            newEmployeeMenu();
        })
}

//this will start the newEmployeeMenu
createManager() 