const express = require('express');

const departmentRouter = require('./api/department');
const employeeRouter = require('./api/employee');
const rolesRouter = require('./api/roles');
const app = express();

app.use('/department', departmentRouter);
app.use('/employee', employeeRouter);
app.use('/roles', rolesRouter);

module.exports = app;
