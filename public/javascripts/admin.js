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

//TODO update and papulate members.json for live preview
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

//CURRENTLY NOT USING
//put a 0 at the begining of month and day if necessary 
function displayDate(a) {
    a = a < 10 ? "0" + a : a;
    return a;
}

//display members table
function displayMembers(members) {

    var rows = members.map(function (member) {

        var endDate = new Date(member.endDate);
        endDate = setDisplayDate(endDate);

        return `<tr data-id="${member.id}">
        <td id="present_checkbox"><input type="checkbox"></td>
        <td class="tcell" data-id="${member.id}">1</td>
        <td class="tcell" data-id="${member.id}">${member.lastName}</td>
        <td class="tcell" data-id="${member.id}">${member.firstName}</td>
        <td class="tcell" data-id="${member.id}">${member.availableSessions}</td>
        <td class="tcell" data-id="${member.id}">${endDate}</span></td> 
        </tr>`
    })

    document.querySelector("tbody").innerHTML = rows.join('')
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
    var startDate = startDate_input.val();
    //set end date
    //setDisplayDate() doesn't work because Y M D are reversed
    var setEndDate = new Date(startDate);
    setEndDate.setDate(setEndDate.getDate() + 30);
    var endYear = setEndDate.getFullYear();
    var endMonth = setEndDate.getMonth() + 1;
    var endDay = setEndDate.getDate();
    var endDate = `${endYear}-${displayDate(endMonth)}-${displayDate(endDay)}`;

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

//search member
function memberSearch() {
    var searchMember = this.value.toLowerCase();

    var filteredMembers = globalMembers.filter(function (member) {
        return member.firstName.toLowerCase().includes(searchMember) ||
            member.lastName.toLowerCase().includes(searchMember);

    })

    displayMembers(filteredMembers);
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
    confPassword_input.val(member.confPassword);
    phone_input.val(member.phone);
    email_input.val(member.email);
    availableSessions_input.val(member.availableSessions);
    startDate_input.val(today);
    //TODO auto-refresh main-sidebar when finshied to display updated info & don't hide main-sidebar
}


//show member details in main side-bar
function showMemberDetails() {
    var id = this.getAttribute('data-id');

    var member = globalMembers.find(function (member) {
        return member.id == id;
    })

    var editDel = `<a href="${API_URL.DELETE}?id=${member.id}" title="Delete member" class="edit">&#10006;</a> | 
                    <a href="#" title="Edit member" class="edit" data-id="${member.id}">&#9998;</a>`

    delEdit_div.innerHTML = editDel;
    lastNameDetails_span.innerHTML = member.lastName;
    firstNameDetails_span.innerHTML = member.firstName;
    phoneDetails_span.innerHTML = member.phone;
    emailDetails_span.innerHTML = member.email;
    availableSessionsDetails_span.innerHTML = member.availableSessions;
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


function initEvents() {
    //member search
    document.getElementById('search').addEventListener('input', memberSearch);

    //save new member
    $('#submitBtn').click(saveNewMember);

    //show member details
    $('tbody').delegate("td.tcell", 'click', showMemberDetails);

    // member edit 
    $("#main-sidebar").delegate("a.edit", "click", memberEdit);
}

$('.sec-modal').hide();
$('#main-sidebar').hide();
initEvents();
loadMembers();