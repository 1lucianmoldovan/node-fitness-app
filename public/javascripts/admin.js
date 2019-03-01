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

        return `<tr>
        <td id="present_checkbox"><input type="checkbox"></td>
        <td class="tcell" data-id="${member.id}">1</td>
        <td class="tcell" data-id="${member.id}">${member.lastName}</td>
        <td class="tcell" data-id="${member.id}">${member.firstName}</td>
        <td class="tcell" data-id="${member.id}">${a - b}</td>
        <td class="tcell" data-id="${member.id}">${member.endDate}</span></td> 
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

    if(password != confPassword) {
        $('#comparePasswords').html("The passwords don't match");
        return false;
    }
    else if(password.length < 4) {
        $('#comparePasswords').html("The password must have at least 4 digits!");
        return false;
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
                // closeNewMemberForm()
                loadMembers();
                //TODO close form fadeOut
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


    //TODO auto-refresh main-sidebar when finshied to display updated info
}


function showMemberDetails() {
    var id = this.getAttribute('data-id');

    var member = globalMembers.find(function (member) {
        return member.id == id;
    })

    var editDel = `<a href="/members/delete?id=${member.id}" title="Delete member" class="edit">&#10006;</a> | 
                    <a href="#" title="Edit member" class="edit" data-id="${member.id}">&#9998;</a>`

    document.querySelector('#delEdit').innerHTML = editDel;
    document.getElementById('userNameDetails').innerHTML = member.username;
    document.getElementById('lastNameDetails').innerHTML = member.lastName;
    document.getElementById('firstNameDetails').innerHTML = member.firstName;
    document.getElementById('phoneDetails').innerHTML = member.phone;
    document.getElementById('emailDetails').innerHTML = member.email;
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