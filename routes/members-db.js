var express = require('express');
var mysql = require('mysql')
var router = express.Router();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    pass: "",
    database: "fitness"
});

/* GET users reading */
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = "SELECT * FROM members";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            console.log(results);
            res.json(results);
        })
    })
});

// /contacts/delete?id=3
router.get('/delete', function (req, res, next) {
    var id = req.query.id;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `DELETE FROM members WHERE id=${id}`;
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.redirect('/admin.html');
        })
    })
});


module.exports = router;
