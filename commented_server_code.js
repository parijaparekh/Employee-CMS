//const express = require('express');
//const api = require('./routes/index.js');
//const PORT = process.env.PORT || 3002;
//const app = express();
//const mysql = require("mysql2");
//const util = require('util');







/*
// node native promisify
const query = util.promisify(db.query).bind(db);

(async () => {
    const rows = await query('select * from department');
    console.log(rows);
    db.end();
    console.log("finally");
  })() */

//console.log("finally");
//async roles.addRoles(); 
//async employee.addEmployee();
// Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
//app.use('/api', api);


// Default response for any other request (Not Found)
//app.use((req, res) => {
//  res.status(404).end();
//});

//app.listen(PORT, () => {
//    console.log(`Server running on port ${PORT}`);
//});