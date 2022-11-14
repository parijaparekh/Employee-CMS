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
    choices: ["View all departments", "View all roles", "View all employees", "Add a Department", "Add a Role", "Add an employee", "Update Role for an employee", "Exit"],
  }];

department = new Department(inquirer, db);
async function main(){
  const selectedOption = await inquirer.prompt(user_options);
  console.log(selectedOption.userOptions);
  switch(selectedOption.userOptions){
    case "View all departments":
      (async() => {
        const result =  await department.getDepartments(true);  
        console.table(result);
        console.log("hello");
        await db.endConnection();
      })()
    break;
    case "View all roles":
    //main();
    break;
    case "View all employees":
    //main();
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
    case "Exit":
    break;
    default: break;          
  }
  if (selectedOption.userOptions != "Exit"){
     await main();
  }
};

main();










