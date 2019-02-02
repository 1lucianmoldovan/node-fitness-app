function loadMembers() {
    $.ajax("data/members.json").done(function (members) {
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
        <td>${member.initialSessions}</td>
        <td>${member.usedSessions}</td> 
        <td>${a-b}</td>
        </tr>
        `

    })

document.querySelector("tbody").innerHTML = rows.join('')
}

loadMembers();