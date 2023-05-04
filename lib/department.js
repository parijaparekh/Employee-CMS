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
            },},
            {
                type: "expand", 
                name: "department_id", 
                message: "Select the department to be deleted",
                choices: [
                    {key:"a", 
                    name:"X", 
                    value:"1"}],
                expanded: "false",
                pageSize: 25,
            }];   
    }// end of constructor
    
    // get all departments. 
    async getAllDepartments(){
        const sql = 'select dept_name as dept_name, id as id from department';
        return await this.mysqlCon.executeQuery(sql);            
    }

    //Asks information about the department and persists it to the system 
    async addDepartment(){
        const answers = await this.inquirer.prompt(this.department_questions[0]);
        const sql = 'Insert into department(dept_name) values(?)';
        const params = answers.dept_name;
        //console.log(params);
        await this.mysqlCon.executeQuery(sql, params);
        //console.log(answers.dept_name);
        //saveEmployee(answers.first_name, answers.last_name, this.roles_info[answers.role]);  
    }

    async removeDepartment(departmentlist){
        this.department_questions[1].choices = departmentlist;
        const answers = await this.inquirer.prompt(this.department_questions[1]);
        const sql = 'Delete from department where id = ?';
        const params = answers.department_id;
        await this.mysqlCon.executeQuery(sql, params);
    }

}// end of class
  
module.exports = Department;