var express = require('express');
var router = express.Router();

//   MySQL 로드
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host     : 'localhost',
    user     : 'Noo',
    password : '1234',
    database : 'project_db'    
});

router.get('/', function(req, res, next) {
    res.redirect('/block/list');
});

router.get('/list', function(req,res,next){
    pool.getConnection(function (err, connection) {
        var sql = "SELECT domain, DATE_FORMAT(created_at,'%Y-%M-%D %H:%m:%S') created_at FROM blocked_domain_list";
        connection.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);
//            console.log("rows : " + JSON.stringify(rows));
            res.render('block/list', {rows: rows?rows:{}});
            connection.release();
        });
    }); 
});

router.get('/read', function(req,res,next){
    pool.getConnection(function (err, connection) {
        var sql = "SELECT domain, DATE_FORMAT(created_at,'%Y-%M-%D %H:%m:%S') created_at FROM blocked_domain_list" +
                  " WHERE domain = ?";
            console.log("rows : " + sql);
        connection.query(sql, req.query.brdno, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));
            
            res.render('block/read', {row: rows[0]});
            connection.release();
        });
    }); 
});

router.get('/form', function(req,res,next){
    if (!req.query.brdno) {
        res.render('block/form', {row: ""});
        return;
    }
    pool.getConnection(function (err, connection) {
        var sql = "SELECT domain, DATE_FORMAT(created_at,'%Y-%M-%D %H:%m:%S') created_at FROM blocked_domain_list"+
                  " WHERE domain= ?";
        connection.query(sql, req.query.brdno, function (err, rows) {
            if (err) console.error("err : " + err);

            res.render('block/form', {row: rows});
            connection.release();
        });
    }); 
});

router.post('/save', function(req,res,next){
    var data = [req.body.add];
    console.log("rows : " + data);

    pool.getConnection(function (err, connection) {
        
        var sql = "";
        if (req.body.add) {
            sql = "INSERT INTO blocked_domain_list(domain, created_at) VALUES(?, NOW())";
        }
        connection.query(sql, data, function (err, rows) {
            if (err) console.error("err : " + err);

            res.redirect('/block/list');
            connection.release();
        });
    }); 
});

router.get('/delete', function(req,res,next){
    pool.getConnection(function (err, connection) {
        var sql = "DELETE FROM blocked_domain_list" +
                  " WHERE domain= ?";
        connection.query(sql, req.query.brdno, function (err, rows) {
            if (err) console.error("err : " + err);

            res.redirect('/block/list');
            connection.release();
        });
    }); 
});

router.get('/', function(req, res, next) {
    res.redirect('/block/log');
});

router.get('/log', function(req,res,next){

    pool.getConnection(function (err, connection) {
        var sql = "SELECT domain, DATE_FORMAT(created_at,'%Y-%M-%D %H:%m:%S') created_at FROM tb_packet_log";
        connection.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);
//            console.log("rows : " + JSON.stringify(rows));
            res.render('block/log', {rows: rows?rows:{}});
            connection.release();
        });
    }); 
});

module.exports = router;
