var idToEdit = "";

function loadMembers() {
    $.ajax("data/members.json").done(function (members) {

        window.globalMembers = members;
        displayMembers(members);
        
    })
}

function displayMembers(members) {
    var listMembers = $("table tbody");
    var rows = members.map(function (member) {

        var a = member.initialSessions;
        var b = member.usedSessions;


        console.info('functioneaza', 'sedinte ramase sunt =', a - b);

        return `<tr>
        <td>${member.lastName}</td>
        <td>${member.firstName}</td>
        <td>${a-b}</td>
        <td>${member.endDate}</td> 
        </tr>
        `

    })

document.querySelector("tbody").innerHTML = rows.join('')
}

function openNewMemberForm() {
   document.getElementById("modal1").style.display = "flex";
}
function closeNewMemberForm(){
    document.getElementById("modal1").style.display = "none";
}

function initEvents(){
    document.getElementById('search').addEventListener('input', memberSearch);
}

function memberSearch(){
     var searchMember = this.value.toLowerCase();
     console.log("search member is " + searchMember);
     var filteredMembers = globalMembers.filter(function(member){
        return member.firstName.toLowerCase().includes(searchMember) ||
                 member.lastName.toLowerCase().includes(searchMember);
         
     })

     displayMembers(filteredMembers);
}


function saveNewMember() {

    var firstName = $('input[name=firstName]').val();
    var lastName = $('input[name=lastName]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[email]').val();
    console.log('I am alive', firstName, lastName, phone, email )

    console.log('save contact', firstName, lastName, phone, email);

    var actionUrl = 'members/create'; // inline iff similat cu if (idToEdit){actionUrl=...}else {...}

    $.post(actionUrl, {
        firstName, // shortcut from Es6 (key is the same as value variable name)
        lastName,
        phone: phone, // Es5 loger variant used when key is not the same as value variable name(not the case))
        email: email

    }).done(function (response) {
        console.warn("done creating Member", response);
        if (response.success) {
            closeNewMemberForm()
            loadMembers();
        }
    })
}


initEvents();
loadMembers();