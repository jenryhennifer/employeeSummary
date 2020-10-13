const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const newEmployeeInputs = [{
    type: 'list',
    name: 'employeeType',
    message: 'Add an Employee: ',
    choices: ['Intern', 'Engineer', 'Done']
}]

const managerPrompts = [{
    type: 'input',
    name: 'name',
    message: 'Manager name: ',
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
    name: 'officeNumber',
    massage: 'Office Number: '
}
]
const internPrompts = [{
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
    name: 'school',
    message: 'School: '
}]

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
    name: 'gitHub',
    message: 'GitHub'
}]

//saves array of the employee lists
const employeeList = []

function newEmployeeMenu(){
    inquirer.prompt(newEmployeeInputs)
    .then(function(answer){
        console.log(answer)
        if(answer.employeeType === 'Intern'){
            inquirer.prompt(internPrompts)
            .then(function(internResponse){
                const intern = new Intern(internResponse.name, internResponse.id, internResponse.email, internResponse.school)
                employeeList.push(intern)
                newEmployeeMenu(); // loops the employee menu
            })
        }else if(answer.employeeType === 'Engineer'){
            inquirer.prompt(engineerPrompts)
            .then(function(engineerResponse){
                const engineer = new Engineer(engineerResponse.name, engineerResponse.id, engineerResponse.email, engineerResponse.gitHub)
                employeeList.push(engineer)
                newEmployeeMenu(); // loops the employee menu
                console.log(employeeList)
            })
        }else{
            //add the render here!
        }
    })
}

function createManager(){
    inquirer.prompt(managerPrompts)
    .then(function(managerResponse){
        const manager = new Manager(managerResponse.name,managerResponse.id,managerResponse.email,managerResponse.email);
        employeeList.push(manager)
        newEmployeeMenu();
    })
}

//this will start the newEmployeeMenu
createManager() 