//   MySQL 로드
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host     : 'localhost',
    user     : 'Noo',
    password : '1234',
    database : 'project_db'    
});

module.exports = pool;
