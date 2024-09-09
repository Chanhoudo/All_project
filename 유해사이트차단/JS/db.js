var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Noo',
    password: '1234',
    database: 'project_db'
});
 
connection.connect();
 

connection.end();