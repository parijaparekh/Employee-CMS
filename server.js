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
              "Add an employee", "Update Role for an employee", "Delete a Department", "Delete a Employee", "Delete a Role", "Update Employee Managers", "View Employees by Manager", "View Employees by Department", "Total utilized budget of a department", "Exit"],
    pageSize: 25,
  }];

department = new Department(inquirer, db);
roles = new Roles(inquirer, db); 
employee = new Employee(inquirer, db);

function convertDBResultToInqChoices (result, fields){
  let x = 0;
  let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];
  //console.log(result);
  //console.log(typeof result);
  result.forEach(jsonObj => {
    jsonObj["name"] = jsonObj[fields["name"]];
    jsonObj["value"] = jsonObj[fields["value"]];
    jsonObj["key"] = alphabets[x++]; 
  });
  //console.log(result);
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
    break;
    
    case "Add a department":
      console.log("Department");
      (async() => {
        const result =  await department.addDepartment();  
        //console.table(result); 
        main();
      })()
    break;
    
    case "Add a Role":
      (async() => {
        const departmentList =  await department.getAllDepartments();
        convertDBResultToInqChoices(departmentList,{"name": "dept_name", "value": "id"});
        console.log(departmentList);
        const result =  await roles.addRole(departmentList);   
        main();
      })()
    break;
    
    case "Add an employee":
      (async() => {
        const rolesList =  await roles.getAllRoles();
        const employeeList = await employee.getAllManagers();
        convertDBResultToInqChoices(rolesList,{"name": "title", "value": "id"});
        convertDBResultToInqChoices(employeeList,{"name": "employee_name", "value": "id"});
        const result =  await employee.addEmployee(rolesList, employeeList);   
        main();
      })()
    break;

    case "Delete a Department":
      (async() => {
        const departmentList =  await department.getAllDepartments();
        console.log(departmentList);
        convertDBResultToInqChoices(departmentList,{"name": "dept_name", "value": "id"});
        const result =  await department.removeDepartment(departmentList);   
        main();
      })()
    break;

    case "Delete a Employee":
      (async() => {
        const employeeList =  await employee.getAllEmployees();
        console.log(employeeList);
        convertDBResultToInqChoices(employeeList,{"name": "employee_name",  "value": "id"});
        const result =  await employee.removeEmployee(employeeList);   
        main();
      })()
    break; 
    
    case "Delete a Role":
      (async() => {
        const roleList =  await roles.getAllRoles();
        convertDBResultToInqChoices(roleList,{"name": "title",  "value": "id"});
        const result =  await roles.removeRole(roleList);   
        main();
      })()
    break;

    case "Update Role for an employee":
      (async() => {
        const roleList = await roles.getAllRoles();
        const employeeList = await employee.getAllEmployees();
        convertDBResultToInqChoices(employeeList, {"name":"employee_name", "value": "id"});
        convertDBResultToInqChoices(roleList,{"name": "title",  "value": "id"});
        const result = await employee.updateRole(employeeList, roleList);
        main();
      })()
    break;

    case "View Employees by Manager":
      (async() => {
        const managerList = await employee.getAllManagers();
        convertDBResultToInqChoices(managerList, {"name":"employee_name", "value": "id"});
        const result = await employee.getEmployeesByManager(managerList);
        console.table(result);
        main();
      })()
    break;

    case "View Employees by Department":
      (async() => {
        const departmentList = await department.getAllDepartments();
        convertDBResultToInqChoices(departmentList,{"name": "dept_name", "value": "id"});
        const result = await employee.getEmployeesByDepartment(departmentList);
        console.table(result);
        main();
      })()
    break;
    
    case "Update Employee Managers":
      (async() => {
        const employeeList = await employee.getAllEmployees();
        convertDBResultToInqChoices(employeeList, {"name":"employee_name", "value": "id"});
        const managerList = await employee.getAllManagers();
        convertDBResultToInqChoices(managerList, {"name":"employee_name", "value": "id"});
        const result = await employee.updateManager(employeeList, managerList);
        main();
      })()
    break;

    case "Total utilized budget of a department":
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










