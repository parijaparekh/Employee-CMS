const roles = require('express').Router();
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

roles.post('/', ({body}, res)=> {
    const sql = 'INSERT INTO roles (title, salary, department_id) values(?, ?, ?)';
    const params = [body.title, body.salary, body.department_id];
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
  
// Read all roles
roles.get('/', (req, res) => {
    const sql = 'Select r.id, r.title, d.dept_name, r.salary  from roles r, department d where r.department_id = d.id';
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
  
// Delete a roles
roles.delete('/:id', (req, res)=> {
    const sql = 'DELETE FROM roles where id = ?';
    const params = [req.params.id];
    db.query(sql, params, (err, rows) => {
      if (err){
        console.log("error");
        res.status(400).json({error:err.message});
      }
      else if(!rows.affectedRows){
        res.json({
          message: "roles Not found"
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

module.exports = roles;
