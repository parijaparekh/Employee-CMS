const inquirer = require('inquirer');
const Department = require('./lib/department');
const Roles = require("./lib/roles");
const Employee = require('./lib/employee');
const DB = require("./lib/db");
const { restoreDefaultPrompts } = require('inquirer');

//create DB class object. DB class encapsulates all logic for Database connections. 
const db = new DB();

const user_options = [
  {
    type: "list",
    name: "userOptions",
    message: "Select an operation for employee CMS:", 
    choices: [ "View all departments", "View all roles", "View all employees", "Add a department", "Add a Role", 
              "Add an employee", "Update Role for an employee", "Exit"],
    pageSize: 15,
  }];

department = new Department(inquirer, db);
roles = new Roles(inquirer, db); 
employee = new Employee(inquirer, db);

function convertDBResultToInqChoices (result, fields){
  let x = 0;
  let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  //console.log(result);
  //console.log(typeof result);
  result.forEach(jsonObj => {
    jsonObj["name"] = jsonObj[fields["name"]];
    jsonObj["value"] = jsonObj[fields["value"]];
    jsonObj["key"] = alphabets[x++]; 
  });
  console.log(result);
};

async function main(){
  const selectedOption = await inquirer.prompt(user_options);
  //console.log(selectedOption.userOptions);
  switch(selectedOption.userOptions){
    case "View all departments":
      (async() => {
        const result =  await department.getAllDepartments();  
        console.table(result); 
        main();     
      })()
    break;
    case "View all roles":
      (async() => {
        const result =  await roles.getAllRoles();  
        console.table(result);
        main();
      })()
    break;
    case "View all employees":
      (async() => {
        const result =  await employee.getAllEmployees();  
        console.table(result); 
        main();  
      })()
    //main();
    break;
    case "Add a department":
      console.log("Department");
      (async() => {
        const result =  await department.addDepartment();  
        console.table(result); 
        main();
      })()
    break;
    case "Add a Role":
      (async() => {
        const departmentList =  await department.getAllDepartments();
        convertDBResultToInqChoices(departmentList,{"name": "dept_name", "value": "id"});
        const result =  await roles.addRole(departmentList);   
        main();
      })()
    break;
    case "Add an employee":
      (async() => {
        const rolesList =  await department.getAllRoles();
        const employeeList = await employee.getAllManagers();
        convertDBResultToInqChoices(rolesList,{"name": "title", "value": "id"});
        convertDBResultToInqChoices(employeeList,{"name": "employee_name", "value": "id"});
        const result =  await employee.addEmployee(rolesList, employeeList);   
        main();
      })()
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










