const employee = require('express').Router();
const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

employee.post('/', ({body}, res)=> {
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) values(?, ?, ?, ?)';
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    db.query(sql, params, (err, rows) => {
      if (err){
        console.log("error");
        res.status(400).json({error:err.message});
      }
      res.json({
        message: "success",
        data: body //data needs to be changed here.
      });
    }); 
  })
  
// Read all employees
employee.get('/', (req, res) => {
    const sql = 'Select first_name, last_name, role.title, department.dept_name from employee, role, department where employee.role_id = role.id and role.department_id = department.id';
    db.query(sql,(err, rows) =>{
      if (err){
        console.log("ERROR");
        res.status(500).json({error:err.message})
      }
      res.json({
        message:"SUCCESS", 
        data: rows
      });
    });
  })
  
// Delete a employee
employee.delete('/:id', (req, res)=> {
    const sql = 'DELETE FROM employee where id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, rows) => {
      if (err){
        console.log("error");
        res.status(400).json({error:err.message});
      }
      else if(!rows.affectedRows){
        res.json({
          message: "Employee Not found"
        })}
        else{
          res.json({
            message:"DELETED", 
            changes: rows.affectedRows, 
            id: params
        });
      }
    }); 
  })

module.exports = employee;
