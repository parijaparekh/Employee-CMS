const department = require('express').Router();
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

department.post('/', ({body}, res)=> {
    const sql = 'INSERT INTO department (dept_name) values(?)';
    const params = [body.dept_name];
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
  
// Read all departments
department.get('/', (req, res) => {
    const sql = 'Select * from department';
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
  
// Delete a department
department.delete('/:id', (req, res)=> {
    const sql = 'DELETE FROM department where id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, rows) => {
      if (err){
        console.log("error");
        res.status(400).json({error:err.message});
      }
      else if(!rows.affectedRows){
        res.json({
          message: "Department Not found"
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

module.exports = department;
