const Department = require("./department.js");

class Roles {
    constructor(inquirer, mysqlCon) {
        this.inquirer = inquirer;
        this.mysqlCon = mysqlCon;
        this.roles_questions = [{
            type: "input", 
            name: "title", 
            message:"Enter the title of this role",
            validate: function(value){
                const valid = ((/^[a-z0-9 ,.'-]+$/i.test(value)) && value.length <= 30);
                return valid || "Max charachter limit is 30. Permissible charachters for role title are alphabets, numbers and selected special charachters(,.-')";
            },
        }, 
        {
            type: "input", 
            name: "salary", 
            message: "Enter the salary scale for this role",
            validate: function(value){
                const valid = !(isNaN(Number(value)));
                return valid || "Salary has to be an integer value";
            },    
        }, 
        {
            type: "expand", 
            name: "department", 
            message: "Department under which this role exists for this organisation",
            choices: [
                {key:'a', 
                //name:"IT", 
                value:'1'}],
            expanded: "false", 
            pageSize: 25,    
        },
        {
            type: "expand", 
            name: "role_id", 
            message: "Select the role to be deleted",
            choices: [
                {key:"a", 
                name:"X", 
                value:"1"}],
            expanded: "false",
            pageSize: 25,
        }];   
    }// end of constructor
    
    async getAllRoles(){
        const sql = 'select r.id, r.title, r.salary, d.dept_name as department  from roles r LEFT OUTER JOIN department d on r.department_id = d.id'; 
        return await this.mysqlCon.executeQuery(sql);            
    }
     
    // Ask first information about the epmloyee. 
    // Then check the values and then persist the infprmation to database. 
    async addRole(departments){
        //console.log(this.roles_questions[2]);
        this.roles_questions[2]["choices"] = departments;  
        //console.log(this.roles_questions[2]);
        const answers = await this.inquirer.prompt(this.roles_questions.slice(0,3));
        //console.log(answers.title, answers.salary, answers.department);
        const params = [answers.title, answers.salary, answers.department];
        const sql = "Insert into roles(title, salary, department_id) values(?,?,?)";
        await this.mysqlCon.executeQuery(sql, params);
        //saveEmployee(answers.first_name, answers.last_name, this.roles_info[answers.role]);  
    }

    async removeRole(rolelist){
        //console.log(this.roles_questions.length, this.roles_questions);
        this.roles_questions[3].choices = rolelist;
        const answers = await this.inquirer.prompt(this.roles_questions[3]);
        const sql = 'Delete from roles where id = ?';
        const params = answers.role_id;
        await this.mysqlCon.executeQuery(sql, params);
    }
    
}// end of class
  
module.exports = Roles;