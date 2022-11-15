
class Employee {
    constructor(inquirer, mysqlCon) {
        this.inquirer = inquirer;
        this.mysqlCon = mysqlCon;
        this.employee_questions = [{
            type: "input", 
            name: "first_name", 
            message:"Enter the first name of the employee",
            validate: function(value){
                const valid = (/^[a-z ,.'-]+$/i.test(value));
                return valid || "Enter only alphabets for first_name";
            },
        }, 
        {
            type: "input", 
            name: "last_name", 
            message: "Enter the last name of the employee",
            validate: function(value){
                const valid = (/^[a-z ,.'-]+$/i.test(value));
                return valid || "Enter only alphabets for last_name";
            },    
        }, 
        {
            type: "expand", 
            name: "role", 
            message: "Select the role of the employee in the organisation",
            choices: [
                {key:"a", 
                name:"Manager", 
                value:"1"}],
            expanded: "false",
        }];   
    }// end of constructor
    
    async getAllEmployees(){
       const sql = 'select e.first_name, e.last_name, r.title, m.first_name + m.last_name as manager from employee e LEFT OUTER JOIN roles r ON e.role_id = r.id LEFT OUTER JOIN employee m ON e.manager_id = m.id';
       return await this.mysqlCon.executeQuery(sql); 
    }
    // Ask first information about the epmloyee. 
    // Then check the values and then persist the infprmation to database. 
    async addEmployee(){
        const answers = await this.inquirer.prompt(this.employee_questions);
        console.log(answers.first_name, answers.last_name, answers.role);
        //saveEmployee(answers.first_name, answers.last_name, this.roles_info[answers.role]);  
    }
    
}// end of class
  
module.exports = Employee;