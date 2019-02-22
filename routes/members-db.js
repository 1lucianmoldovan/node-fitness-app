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

// /members/create

router.post('/create', function (req, res, next) {

    pool.getConnection(function (err, connection) {
      if (err) throw err;
      var username =req.body.username;
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var password = req.body.password;
      var confPassword = req.body.confPassword;
      var phone = req.body.phone;
      var email = req.body.email;
  
      const sql = `INSERT INTO members (id, username, firstName, lastName, password, confPassword, phone, email) VALUES (NULL, '${username}', '${firstName}', '${lastName}', '${password}', '${confPassword}', '${phone}', '${email}');`;
      connection.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
        res.json({ success: true });
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