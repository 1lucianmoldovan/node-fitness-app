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
        <td>
        <a href="/members/delete?id=${member.id}">&#10006;</a>
        <a href="#" class="edit" data-id="${member.id}">&#9998;</a>
        </td>
        </tr>
        </a>
        `
    })

    document.querySelector("tbody").innerHTML = rows.join('')
}


function saveNewMember() {
    var username = $('input[name=username]').val();
    var firstName = $('input[name=firstName]').val();
    var lastName = $('input[name=lastName]').val();
    var password = $('input[name=password]').val();
    var confPassword = $('input[name=confPassword]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[name=email]').val();

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


function openNewMemberForm() {
    document.getElementById("modal1").style.display = "flex";
}
function closeNewMemberForm() {
    document.getElementById("modal1").style.display = "none";
    document.getElementById("adMembersForm").reset();
}

function initEvents() {
    document.getElementById('search').addEventListener('input', memberSearch);

    // member edit
    $("tbody").delegate("a.edit", "click", function () {
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
    });


    // select row by id
    $('tbody').delegate('tr', 'click', function () {
        var id = this.getAttribute('data-id');

        var member = globalMembers.find(function (member) {
            return member.id == id;
        })
        console.log('clicked: ', id, member.lastName);
        document.getElementById('userNameDetails').innerHTML = member.username;
        document.getElementById('lastNameDetails').innerHTML = member.lastName;
        document.getElementById('firstNameDetails').innerHTML = member.firstName;
        document.getElementById('phoneDetails').innerHTML = member.phone;
        document.getElementById('emailDetails').innerHTML = member.email;
    })
}

function memberSearch() {
    var searchMember = this.value.toLowerCase();

    var filteredMembers = globalMembers.filter(function (member) {
        return member.firstName.toLowerCase().includes(searchMember) ||
            member.lastName.toLowerCase().includes(searchMember);

    })

    displayMembers(filteredMembers);
}




initEvents();
loadMembers();