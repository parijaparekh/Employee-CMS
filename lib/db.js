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
        try{
            const results = await this.connection.promise().query(sql, params); 
            //console.log(results[0]);
            return results[0];
        }
        catch(e){
            console.log("Error:",e);
        }       
    }

    async endConnection(){
        try{
            await this.connection.promise().end();
        }
        catch(e){
            console.log("Error:", e);
        }
    }

    async executeInsert(sql, params){
        try{
            const results = await this.connection.promise().insert(sql, params);
            return results[0];
        }
        catch(e){
            console.log("Error:", e);
        }
    }

}// class db

module.exports = db;