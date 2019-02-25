var idToEdit = "";

function loadMembers() {
    $.ajax("members/").done(function (members) {

        window.globalMembers = members;
        displayMembers(members);

    })
}

function displayMembers(members) {

    var rows = members.map(function (member) {

        var a = member.initialSessions;
        var b = member.usedSessions;

        return `<a href="#"><tr data-id="${member.id}">
        <td class="hidden">${member.id}</td>
        <td>${member.lastName}</td>
        <td>${member.firstName}</td>
        <td>${a - b}</td>
        <td>${member.endDate}</td> 
        </tr>
        </a>`
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
    var username = $('input[name=username]').val();
    var firstName = $('input[name=firstName]').val();
    var lastName = $('input[name=lastName]').val();
    var password = $('input[name=password]').val();
    var confPassword = $('input[name=confPassword]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[name=email]').val();
    //TODO
    var startDate = "0";
    var endDate = "0";
    var initialSessions = "0";
    var usedSessions = "0";

    if (password != confPassword) {
        document.getElementById('comparePasswords').innerHTML = "Passwords do not match!";
    }

    else if (password.length < 4) {
        document.getElementById('comparePasswords').innerHTML = "The password must have at least 4 digits!";
    }

    else {
        var actionUrl = idToEdit ? 'members/update?id=' + idToEdit : 'members/create';

        $.post(actionUrl, {
            username,
            firstName, // shortcut from Es6 (key is the same as value variable name)
            lastName,
            password,
            confPassword,
            phone: phone, // Es5 loger variant used when key is not the same as value variable name(not the case))
            email: email

        }).done(function (response) {
            idToEdit = "";
            if (response.success) {
                closeNewMemberForm()
                loadMembers();
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
    $('input[name=username]').val(member.username);
    document.querySelector('input[name=firstName]').value = member.firstName;
    $('input[name=lastName]').val(member.lastName);
    $('input[name=password]').val(member.password);
    $('input[name=confPassword]').val(member.confPassword);
    $('input[name=phone]').val(member.phone);
    $('input[name=email]').val(member.email);
    

    //TODO auto-refresh main-sidebar when finshied to display updated info
}


function showMemberDetails() {
    var id = this.getAttribute('data-id');
    
    var member = globalMembers.find(function (member) {
        return member.id == id;
    })

    var editDel =  `<a href="/members/delete?id=${member.id}" class="edit">&#10006;</a> | 
                    <a href="#" class="edit" data-id="${member.id}">&#9998;</a>`
    
    document.querySelector('#delEdit').innerHTML = editDel;
    document.getElementById('userNameDetails').innerHTML = member.username;
    document.getElementById('lastNameDetails').innerHTML = member.lastName;
    document.getElementById('firstNameDetails').innerHTML = member.firstName;
    document.getElementById('phoneDetails').innerHTML = member.phone;
    document.getElementById('emailDetails').innerHTML = member.email;
   
    $('#main-sidebar').animate({
        width: "toggle"
    });
}

function hideMemberDetails() {
    $('#main-sidebar').animate({
        width: "toggle"
    });
}

function initEvents() {
    //member search
    document.getElementById('search').addEventListener('input', memberSearch);

    
    //show member details
    $('tbody').delegate('tr', 'click', showMemberDetails);

    // member edit 
    $("#main-sidebar").delegate("a.edit", "click", memberEdit);
}

$('#main-sidebar').hide();
initEvents();
loadMembers();