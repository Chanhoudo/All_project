var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'Noo',
    password : '1234',
    database : 'project_db'
});
db.connect();

module.exports = db;