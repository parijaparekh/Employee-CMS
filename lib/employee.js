
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
            pageSize: 25,
        }, 
        {
            type: "expand", 
            name: "manager", 
            message: "Select the manager to be assigned for the new employee",
            choices: [
                {key:"a", 
                name:"Manager", 
                value:"1"}],
            expanded: "false",
            pageSize: 25,
        },
        {
            type: "expand", 
            name: "employee_id", 
            message: "Select the employee whose info needs to be updated",
            choices: [
                {key:"a", 
                name:"X", 
                value:"1"}],
            expanded: "false",
            pageSize: 25,
        },
        {
            type: "expand", 
            name: "employee_id", 
            message: "Select the employee who needs to be deleted",
            choices: [
                {key:"a", 
                name:"X", 
                value:"1"}],
            expanded: "false",
            pageSize: 25,
        }, 
        {
            type: "expand", 
            name: "manager_id", 
            message: "Select the manager for his employee list",
            choices: [
                {key:"a", 
                name:"X", 
                value:"1"}],
            expanded: "false",
            pageSize: 25,
        }, 
        {
            type: "expand", 
            name: "dept_id", 
            message: "Select the department for which the employees need to be listed",
            choices: [
                {key:"a", 
                name:"X", 
                value:"1"}],
            expanded: "false",
            pageSize: 25,
        },
        {
            type: "expand", 
            name: "manager_id", 
            message: "Select the manager to be assigned for this employee",
            choices: [
                {key:"a", 
                name:"Manager", 
                value:"1"}],
            expanded: "false",
            pageSize: 25,
        }, 
    ];
    }// end of constructor
    
    async getAllManagers(){
       const sql = 'select concat(e.first_name," " ,e.last_name) as employee_name, e.id as id from employee e LEFT OUTER JOIN roles r ON e.role_id = r.id where r.title LIKE "%Manager%"';
       return await this.mysqlCon.executeQuery(sql); 
    }

    // Ask first information about the epmloyee. 
    // Then check the values and then persist the infprmation to database. 
    async addEmployee(rolesList, managerList){
        this.employee_questions[2].choices = rolesList;
        this.employee_questions[3].choices = managerList;
        const answers = await this.inquirer.prompt(this.employee_questions.slice(0,4));
        const params = [answers.first_name, answers.last_name, answers.role, answers.manager];
        const sql = "Insert into employee(first_name, last_name, role_id, manager_id) values(?,?,?,?)";
        await this.mysqlCon.executeQuery(sql, params);  
    }

    async updateRole(employeeList, roleList){
        this.employee_questions[4].choices = employeeList;
        this.employee_questions[2].choices = roleList;
        let answers, sql, params;
        const answers_emp = await this.inquirer.prompt(this.employee_questions[4]);
        //sql = 'Select * from employee where id = ?';
        //params = answers.employee_id;
        //const employee_info = (await this.mysqlCon.executeQuery(sql, params));
        const answers_role = await this.inquirer.prompt(this.employee_questions[2]);
        sql = 'update employee set role_id = ? where id = ?';
        params = [answers_role.role, answers_emp.employee_id];
        //console.log(sql, params)
        await this.mysqlCon.executeQuery(sql,params);
    }

    async updateManager(employeeList, managerList){
        this.employee_questions[4].choices = employeeList;
        this.employee_questions[8].choices = managerList;
        const answers_emp = await this.inquirer.prompt(this.employee_questions[4]);
        const answers = await this.inquirer.prompt(this.employee_questions[8]);
        const sql = 'update employee set manager_id = ? where id = ?';
        const params = [answers.manager_id, answers_emp.employee_id];
        //console.log(sql, params)
        await this.mysqlCon.executeQuery(sql,params);
    }

    async getAllEmployees(){
       // select * from roles r, department d, employee e where e.role_id = r .id and r.department_id = d.id;
        const sql = 'select concat(e.first_name," ", e.last_name) as employee_name, r.title as title, e.id as id, d.dept_name as department, r.salary as salary, (select concat(m.first_name," ", m.last_name) from employee m where m.id = e.manager_id) as manager from employee e LEFT OUTER JOIN roles r ON e.role_id = r.id LEFT OUTER JOIN department d ON r.department_id = d.id' ;
        return await this.mysqlCon.executeQuery(sql);
    }

    async getEmployeesByManager(managerList){
        //console.log(managerList, this.employee_questions[6]);
        this.employee_questions[6].choices = managerList;
        const answers = await this.inquirer.prompt(this.employee_questions[6]);
        const sql = 'select * from employee where manager_id=?';
        const params = [answers.manager_id];
        return await this.mysqlCon.executeQuery(sql,params);
    }

    async getEmployeesByDepartment(departmentList){
        this.employee_questions[7].choices = departmentList;
        const answers = await this.inquirer.prompt(this.employee_questions[7]);
        const sql = 'select * from employee e, roles r where e.role_id = r.id and r.department_id=?';
        const params = [answers.dept_id];
        return await this.mysqlCon.executeQuery(sql,params);
    }

    async removeEmployee(employeelist){
        console.log(employeelist);
        this.employee_questions[5].choices = employeelist;
        const answers = await this.inquirer.prompt(this.employee_questions[5]);
        const sql = 'Delete from employee where id = ?';
        const params = answers.employee_id;
        await this.mysqlCon.executeQuery(sql, params);
    }

    async getTotalSalaryByDepartment(department_id){

    }

}// end of class
  
module.exports = Employee;