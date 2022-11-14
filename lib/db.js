const mysql = require('mysql2');
const util = require('util');

class db{
    constructor(){
        this.connection = mysql.createConnection(
            {
                host: 'localhost',
                // MySQL username,
                user: 'root',
                password: '',
                database: 'employees_db'
            },
            console.log(`Connected to the employees_db database.`)
        );        
    }

    async executeQuery(sql, params){
        const results = await this.connection.promise().query(sql, params); 
        return results[0];
    }

    async endConnection(){
        await this.connection.promise().end();
    }

}// class db

module.exports = db;