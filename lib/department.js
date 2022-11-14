const util = require('util');

class Department {
    constructor(inquirer, mysqlCon) {
        this.inquirer = inquirer;
        this.mysqlCon = mysqlCon;
        this.department_questions = [{
            type: "input", 
            name: "dept_name", 
            message:"Enter department name",
            validate: function(value){
                const valid = ((/^[a-z0-9 ,.'-]+$/i.test(value)) && (value.length <= 30));
                return valid || "Max charachter limit is 30. Permissible charachters for department name are alphabets, numbers and selected special charachters(,.-')";
            },
        }];   
    }// end of constructor
    
    // get all departments. 
    async getDepartments(showData){
        const sql = 'select * from department';
        return await this.mysqlCon.executeQuery(sql);            
    }

    //Asks information about the department and persists it to the system 
    async addDepartment(){
        const answers = await this.inquirer.prompt(this.department_questions);
        console.log(answers.dept_name);
        //saveEmployee(answers.first_name, answers.last_name, this.roles_info[answers.role]);  
    }
    
}// end of class
  
module.exports = Department;