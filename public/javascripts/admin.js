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
        <td>${a - b}</td>
        <td>${member.endDate}</td> 
        </tr>
        `

    })

    document.querySelector("tbody").innerHTML = rows.join('')
}

function openNewMemberForm() {
    document.getElementById("modal1").style.display = "flex";
}
function closeNewMemberForm() {
    document.getElementById("modal1").style.display = "none";
}

function initEvents() {
    document.getElementById('search').addEventListener('input', memberSearch);
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