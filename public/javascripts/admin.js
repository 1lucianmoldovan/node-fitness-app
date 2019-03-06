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

var API_URL = {
    CREATE: "members/create",
    READ:"members",
    UPDATE:"members/update",
    DELETE:"members/delete"
}

if(location.host === "1lucianmoldovan.github.io"){
    API_URL.READ = "data/members.json"
}

function loadMembers() {
    $.ajax(API_URL.READ).done(function (members) {

        window.globalMembers = members;
        displayMembers(members);

    })
}

function displayDate(a) {
    a = a < 10 ? "0"+a : a;
    return a;
}

function displayMembers(members) {

    var rows = members.map(function (member) {

       var endDateObj = new Date(member.endDate);
       var getEndYear = endDateObj.getFullYear();
       var getEndMonth = endDateObj.getMonth();
       var getEndDate = endDateObj.getDate();
       var endDateStr = `${displayDate(getEndDate)} / ${displayDate(getEndMonth)} / ${getEndYear}`;

        return `<tr>
        <td id="present_checkbox"><input type="checkbox"></td>
        <td class="tcell" data-id="${member.id}">1</td>
        <td class="tcell" data-id="${member.id}">${member.lastName}</td>
        <td class="tcell" data-id="${member.id}">${member.firstName}</td>
        <td class="tcell" data-id="${member.id}">${member.availableSessions}</td>
        <td class="tcell" data-id="${member.id}">${endDateStr}</span></td> 
        </tr>`
    })

    document.querySelector("tbody").innerHTML = rows.join('')
}

function openNewMemberForm() {
    $('#modal1').fadeIn();
}
function closeNewMemberForm() {
    $('#modal1').fadeOut();
    document.getElementById("adMembersForm").reset();
    document.getElementById('comparePasswords').innerHTML = "";
}

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
    var setEndDate = new Date(startDate);
    setEndDate.setDate(setEndDate.getDate() + 30); 
    var endYear = setEndDate.getFullYear();
    var endMonth = setEndDate.getMonth()+1;
    var endDay = setEndDate.getDate();
    var endDate = `${endYear}-${displayDate(endMonth)}-${displayDate(endDay)}`;
    
    
    
 
    //TODO
    
    
    var initialSessions = "0";
    var usedSessions = "0";

    if(password != confPassword) {
        $('#comparePasswords').html("The passwords don't match");
        return false;
    }
    else if(password.length < 4) {
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

function memberSearch() {
    var searchMember = this.value.toLowerCase();

    var filteredMembers = globalMembers.filter(function (member) {
        return member.firstName.toLowerCase().includes(searchMember) ||
            member.lastName.toLowerCase().includes(searchMember);

    })

    displayMembers(filteredMembers);
}

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
    startDate_input.val(member.startDate);
    //TODO auto-refresh main-sidebar when finshied to display updated info & don't hide main-sidebar
}

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
    var stDate = new Date(member.startDate);
    var year = stDate.getFullYear();
    var month = stDate.getMonth()+1;
    month = month < 10 ? '0' + month : month;
    var date = stDate.getDate();
    date = date < 10 ? '0' + date : date;
    startDateDetails_span.innerHTML = `${date} / ${month} / ${year}`;

    //set end date
    var endDateObj = new Date(member.endDate);
       var getEndYear = endDateObj.getFullYear();
       var getEndMonth = endDateObj.getMonth();
       //TODO month names ???
       getEndMonth = getEndMonth < 10 ? "0" + getEndMonth : getEndMonth;
       var getEndDate = endDateObj.getDate();
       getEndDate = getEndDate < 10 ? "0" + getEndDate : getEndDate;
       endDateDetails_span.innerHTML = `${getEndDate} / ${getEndMonth} / ${getEndYear}`;



    $('#main-sidebar').show("slow");   
}

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