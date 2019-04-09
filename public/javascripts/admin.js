// TODO!!!

// add sessions enddate if +1 or former endDate is less than today, refresh side-bar when addinfg sessions
// sessions expire if not used in 30 days
// +1 session if memeber is present
// rowcount
//row color
// memberphoto
// update and populate members.json for live preview






var idToEdit = "";

//caching DOM elements
var firstName_input = $('input[name=firstName]');
var lastName_input = $('input[name=lastName]');
var password_input = $('input[name=password]');
var confPassword_input = $('input[name=confPassword]');
var phone_input = $('input[name=phone]');
var email_input = $('input[name=email]');
var availableSessions_input = $('input[name=availableSessions]');
var startDate_input = $('input[name=startDate]');
var delEdit_div = document.querySelector('#delEdit');
var lastNameDetails_span = document.getElementById('lastNameDetails');
var firstNameDetails_span = document.getElementById('firstNameDetails');

var phoneDetails_span = document.getElementById('phoneDetails');
var emailDetails_span = document.getElementById('emailDetails');
var availableSessionsDetails_span = document.getElementById('availableSessionsDetails');
var startDateDetails_span = document.getElementById('startDateDetails');
var endDateDetails_span = document.getElementById('endDateDetails');
var sessionDetails_div = document.getElementById('sessions');

const usedSessionsDetail = document.getElementById('usedSessionsDetails');
const presentBtn = document.getElementById('presentButton');
const checkBox = document.querySelectorAll('.checkMe');

var API_URL = {
    CREATE: "members/create",
    READ: "members",
    UPDATE: "members/update",
    DELETE: "members/delete"
}

if (location.host === "1lucianmoldovan.github.io") {
    API_URL.READ = "data/members.json"
}

function loadMembers() {
    $.ajax(API_URL.READ).done(function (members) {

        window.globalMembers = members;
        displayMembers(members);

    })
}

//get current date for start date input default value
var today = new Date();
today = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

//set save date in db
function saveDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    date = `${year}-${displayDate(month)}-${displayDate(day)}`;
    return date;
}

//set display date 
function setDisplayDate(date) {
    var year = date.getFullYear();
    var monthNr = date.getMonth();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[monthNr];
    var day = date.getDate();
    var showDate = `${displayDate(day)} - ${month} - ${year}`;
    return showDate;
}

//put a 0 at the begining of month and day if necessary (for db)
function displayDate(a) {
    a = a < 10 ? "0" + a : a;
    return a;
}

//display members table
function displayMembers(members) {



    var rows = members.map(function (member) {

        var endDate = new Date(member.endDate);
        endDate = setDisplayDate(endDate);

        var rowColor = '';
        if(member.availableSessions <= 1){
            rowColor = "red";
        }else if(member.availableSessions <= 3){
            rowColor = "yellow";
        }else{
            rowColor = "green"
        }
      
        return `<tr data-id="${member.id}" class="${rowColor}">
        <td id="present_checkbox"><input type="checkbox" class="checkMe" name="checkMe" data-id="${member.id}"></td>
        <td class="tcell" data-id="${member.id}"></td>
        <td class="tcell" data-id="${member.id}">${member.lastName}</td>
        <td class="tcell" data-id="${member.id}">${member.firstName}</td>
        <td class="tcell" data-id="${member.id}">${member.availableSessions}</td>
        <td class="tcell" data-id="${member.id}">${endDate}</span></td> 
        </tr>`
    })

    document.querySelector("tbody").innerHTML = rows.join('')
}

//search member
function memberSearch() {
    var searchMember = this.value.toLowerCase();

    var filteredMembers = globalMembers.filter(function (member) {
        return member.firstName.toLowerCase().includes(searchMember) ||
            member.lastName.toLowerCase().includes(searchMember);

    })

    displayMembers(filteredMembers);
}


function openNewMemberForm() {
    startDate_input.val(today);
    $('#modal1').fadeIn();
}
function closeNewMemberForm() {
    $('#modal1').fadeOut();
    document.getElementById("adMembersForm").reset();
    document.getElementById('comparePasswords').innerHTML = "";
}

//save member in db
function saveNewMember() {
    var firstName = firstName_input.val();
    var lastName = lastName_input.val();
    var password = password_input.val();
    var confPassword = confPassword_input.val();
    var phone = phone_input.val();
    var email = email_input.val();
    var availableSessions = availableSessions_input.val();
    var usedSessions = 0;
    var startDate = startDate_input.val();
    //set end date
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);
    endDate = saveDate(endDate);

    //member input validation
    if (password != confPassword) {
        $('#comparePasswords').html("The passwords don't match");
        return false;
    }
    else if (password.length < 4) {
        $('#comparePasswords').html("The password must have at least 4 digits!");
        return false;
    }
    else {
        var actionUrl = idToEdit ? API_URL.UPDATE + '?id=' + idToEdit : API_URL.CREATE;

        $.post(actionUrl, {
            firstName, // shortcut from Es6 (key is the same as value variable name)
            lastName,
            password,
            confPassword,
            phone: phone, // Es5 loger variant used when key is not the same as value variable name(not the case))
            email: email,
            availableSessions,
            usedSessions,
            startDate,
            endDate

        }).done(function (response) {
            idToEdit = "";
            if (response.success) {
                loadMembers();
                //TODO close form fadeOut?
            }
        })
    }
}

// Add sessions to member
function addNewSessions(e, idToEdit) {
    var sessionsSingPlur = e == 1 ? ' session' : ' sessions';
    if (confirm("Add " + e + sessionsSingPlur + " ?")) {
        var member = globalMembers.find(function (member) {
            return member.id == idToEdit;
        })

        var firstName = member.firstName;
        var lastName = member.lastName;
        var password = member.password;
        var phone = member.phone;
        var email = member.email;
        // add sessions
        var availableSessions = member.availableSessions;
        availableSessions = parseInt(availableSessions) + parseInt(e);
        //add days
        var startDate = today > member.endDate ? today : member.endDate;
        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 30);
        endDate = saveDate(endDate);

        var actionUrl = API_URL.UPDATE + '?id=' + idToEdit;

        $.post(actionUrl, {
            firstName, // shortcut from Es6 (key is the same as value variable name)
            lastName,
            password,
            phone: phone, // Es5 loger variant used when key is not the same as value variable name(not the case))
            email: email,
            availableSessions,
            startDate,
            endDate

        }).done(function (response) {
            idToEdit = "";
            if (response.success) {
                loadMembers();
                availableSessionsDetails_span.innerHTML = availableSessions;
                startDateDetails_span.innerHTML = setDisplayDate(new Date(startDate));
                endDateDetails_span.innerHTML = setDisplayDate(new Date(endDate));


            }
        })
    }

}


//edit member
function memberEdit() {
    idToEdit = this.getAttribute('data-id');

    var member = globalMembers.find(function (member) {
        return member.id == idToEdit;

    });
    openNewMemberForm();

    firstName_input.val(member.firstName);
    lastName_input.val(member.lastName);
    password_input.val(member.password);
    confPassword_input.val(member.password);
    phone_input.val(member.phone);
    email_input.val(member.email);
    availableSessions_input.val(member.availableSessions);
    var startDate = new Date(member.startDate);
    startDate = saveDate(startDate);
    startDate_input.val(startDate);
}


//show member details in main side-bar
function showMemberDetails() {
    var id = this.getAttribute('data-id');

    var member = globalMembers.find(function (member) {
        return member.id == id;
    })

    var addSessions = `<div class="addSessionsButton" name="1" data-id="${member.id}">Add 1 session</div>
                        <div class="addSessionsButton" name="4" data-id="${member.id}">Add 4 sessions</div>
                        <div class="addSessionsButton" name="8" data-id="${member.id}">Add 8 sessions</div>
                        <div class="addSessionsButton" name="12" data-id="${member.id}">Add 12 sessions</div>`


    var editDel = `<a href="${API_URL.DELETE}?id=${member.id}" title="Delete member" class="edit" ><i class="fa fa-trash"></i></a> | 
                    <a href="#" title="Edit member" class="edit" data-id="${member.id}">&#9998;</a>`

    sessionDetails_div.innerHTML = addSessions;
    delEdit_div.innerHTML = editDel;
    lastNameDetails_span.innerHTML = member.lastName;
    firstNameDetails_span.innerHTML = member.firstName;
    phoneDetails_span.innerHTML = member.phone;
    emailDetails_span.innerHTML = member.email;
    availableSessionsDetails_span.innerHTML = member.availableSessions;
    usedSessionsDetail.innerHTML = member.usedSessions;
    //set start date
    var startDate = new Date(member.startDate);
    startDate = setDisplayDate(startDate);
    startDateDetails_span.innerHTML = startDate;
    //set end date
    var endDate = new Date(member.endDate);
    endDate = setDisplayDate(endDate);
    endDateDetails_span.innerHTML = endDate;



    $('#main-sidebar').show("slow");
}

//hide main sidebar 
function hideMemberDetails() {
    $('#main-sidebar').hide("slow");
}

const grid = document.getElementById("tabele1");
let checkBoxes = grid.getElementsByTagName("input");

function presentCheck() {
    console.log('I am alive');

    let boxId = "";
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            boxId = checkBoxes[i].getAttribute('data-id');
            let member = globalMembers.find(function (member) {
                return member.id == boxId;

            });
            let usedSessions = member.usedSessions;
            let firstName = member.firstName;
            let lastName = member.lastName;
            let password = member.password;
            let phone = member.phone;
            let email = member.email;
            let availableSessions = member.availableSessions;
            let startDate = member.startDate;
            let endDate = member.endDate;
            let actionUrl = API_URL.UPDATE + '?id=' + boxId;
            usedSessions++;
            availableSessions--;
            $.post(actionUrl, {
            firstName, // shortcut from Es6 (key is the same as value variable name)
            lastName,
            password,
            phone: phone, // Es5 loger variant used when key is not the same as value variable name(not the case))
            email: email,
            availableSessions,
            startDate,
            endDate,
            usedSessions


            }).done(function (response) {
                boxId = "";
                if (response.success) {
                    loadMembers();
                    usedSessionsDetail.innerHTML = member.usedSessions;
                    console.log("succes");

                }
            })
        }
    }





};

function initEvents() {
    //member search
    document.getElementById('search').addEventListener('input', memberSearch);

    //save new member
    $('#submitBtn').click(saveNewMember);

    //show member details
    $('tbody').delegate("td.tcell", 'click', showMemberDetails);

    // member edit 
    $("#main-sidebar").delegate("a.edit", "click", memberEdit);

    // Add 1 session to member
    $("#main-sidebar").delegate(".addSessionsButton", "click", function () {
        var idToEdit = this.getAttribute('data-id');
        var name = this.getAttribute('name');
        addNewSessions(name, idToEdit);
    });

}

$('.sec-modal').hide();
$('#main-sidebar').hide();
initEvents();
loadMembers();