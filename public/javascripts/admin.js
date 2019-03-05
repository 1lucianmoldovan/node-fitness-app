var idToEdit = "";

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

function displayMembers(members) {

    var rows = members.map(function (member) {

       var endDateObj = new Date(member.endDate);
       var getEndYear = endDateObj.getFullYear();
       var getEndMonth = endDateObj.getMonth();
       //TODO month names
       getEndMonth = getEndMonth < 10 ? "0" + getEndMonth : getEndMonth;
       var getEndDate = endDateObj.getDate();
       getEndDate = getEndDate < 10 ? "0" + getEndDate : getEndDate;
       var endDateStr = `${getEndDate} / ${getEndMonth} / ${getEndYear}`;

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
    var firstName = $('input[name=firstName]').val();
    var lastName = $('input[name=lastName]').val();
    var password = $('input[name=password]').val();
    var confPassword = $('input[name=confPassword]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[name=email]').val();
    var availableSessions = $('input[name=availableSessions]').val();
    var startDate = $('input[name=startDate]').val();
    //set end date
    var setEndDate = new Date(startDate);
    setEndDate.setDate(setEndDate.getDate() + 30); 
    var endYear = setEndDate.getFullYear();
    var endMonth = setEndDate.getMonth()+1;
    endMonth = endMonth < 10 ? "0" + endMonth : endMonth;
    var endDay = setEndDate.getDate();
    endDay = endDay < 10 ? "0" + endDay : endDay;
    var endDate = `${endYear}-${endMonth}-${endDay}`;
    
    
    
 
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
    
    $('input[name=firstName]').val(member.firstName);
    $('input[name=lastName]').val(member.lastName);
    $('input[name=password]').val(member.password);
    $('input[name=confPassword]').val(member.confPassword);
    $('input[name=phone]').val(member.phone);
    $('input[name=email]').val(member.email);
    $('input[name=availableSessions]').val(member.availableSessions);
    $('input[name=startDate]').val(member.startDate);
    //TODO auto-refresh main-sidebar when finshied to display updated info & don't hide main-sidebar
}

function showMemberDetails() {
    var id = this.getAttribute('data-id');

    var member = globalMembers.find(function (member) {
        return member.id == id;
    })

    var editDel = `<a href="${API_URL.DELETE}?id=${member.id}" title="Delete member" class="edit">&#10006;</a> | 
                    <a href="#" title="Edit member" class="edit" data-id="${member.id}">&#9998;</a>`

    document.querySelector('#delEdit').innerHTML = editDel;
    document.getElementById('lastNameDetails').innerHTML = member.lastName;
    document.getElementById('firstNameDetails').innerHTML = member.firstName;
    document.getElementById('phoneDetails').innerHTML = member.phone;
    document.getElementById('emailDetails').innerHTML = member.email;
    document.getElementById('availableSessionsDetails').innerHTML = member.availableSessions;
    //set start date
    var stDate = new Date(member.startDate);
    var year = stDate.getFullYear();
    var month = stDate.getMonth()+1;
    month = month < 10 ? '0' + month : month;
    var date = stDate.getDate();
    date = date < 10 ? '0' + date : date;
    document.getElementById('startDateDetails').innerHTML = `${date} / ${month} / ${year}`;

    //set end date
    var endDateObj = new Date(member.endDate);
       var getEndYear = endDateObj.getFullYear();
       var getEndMonth = endDateObj.getMonth();
       //TODO month names ???
       getEndMonth = getEndMonth < 10 ? "0" + getEndMonth : getEndMonth;
       var getEndDate = endDateObj.getDate();
       getEndDate = getEndDate < 10 ? "0" + getEndDate : getEndDate;
       document.getElementById('endDateDetails').innerHTML = `${getEndDate} / ${getEndMonth} / ${getEndYear}`;



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