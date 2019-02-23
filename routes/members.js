var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


//member create
router.post('/create', function (req, res, next) {
    var id = new Date().getTime();
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
    var mail = req.body.email;
    var startDate = "0";
    var endDate = "0";
    var initialSessions = "0";
    var usedSessions = "0";


    var content = fs.readFileSync('public/data/members.json');
    var members = JSON.parse(content);

    members.push({
        id,
        firstName,
        lastName,
        startDate,
        endDate,
        initialSessions,
        usedSessions,
        phone,
        mail

    })

    content = JSON.stringify(members, null, 2);
    fs.writeFileSync('public/data/members.json', content);

    res.json({ success: true });

});




// /contacts/delete?id
router.get('/delete', function(req, res, next) {
    var id = req.query.id;
  
    var content = fs.readFileSync('public/data/members.json');
    var members = JSON.parse(content);
  
    var remainingMembers = members.filter(function(member){
      return member.id != id;
    });
  
    content = JSON.stringify(remainingMembers, null, 2);
    fs.writeFileSync('public/data/members.json', content);
    
    
    res.redirect('/admin.html');
  });


module.exports = router;
