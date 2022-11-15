const inquirer = require('inquirer');
const Department = require('./lib/department');
const Roles = require("./lib/roles");
const Employee = require('./lib/employee');
const DB = require("./lib/db");

//create DB class object. DB class encapsulates all logic for Database connections. 
const db = new DB();

const user_options = [
  {
    type: "list",
    name: "userOptions",
    message: "Select an operation for employee CMS:", 
    choices: [ "View all departments", "View all roles", "View all employees", "Add a Department", "Add a Role", 
              "Add an employee", "Update Role for an employee", "Exit"],
    pageSize: 15,
  }];

department = new Department(inquirer, db);
roles = new Roles(inquirer, db); 
employee = new Employee(inquirer, db);

async function main(){
  const selectedOption = await inquirer.prompt(user_options);
  console.log(selectedOption.userOptions);
  switch(selectedOption.userOptions){
    case "View all departments":
      (async() => {
        const result =  await department.getAllDepartments();  
        console.table(result);      
      })()
    main();
    break;
    case "View all roles":
      (async() => {
        const result =  await roles.getAllRoles();  
        console.table(result);
      })()
    main();
    break;
    case "View all employees":
      (async() => {
        const result =  await employee.getAllEmployees();  
        console.table(result);   
      })()
    main();
    break;
    case "Add a department":
    //main();
    break;
    case "Add a role":
    //main();
    break;
    case "Add an employee":
    //main();
    break; 
    case "Update Role for an employe":
    break;
    case "Exit":
      (async() => {
      await db.endConnection();
      })()
    break;
    default: break;          
  }  
};

main();










