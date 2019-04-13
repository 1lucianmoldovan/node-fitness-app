// TODO!!!

// add sessions enddate if +1 or former endDate is less than today, refresh side-bar when addinfg sessions
// sessions expire if not used in 30 days
// +1 session if memeber is present
// rowcount
// row color
// memberphoto
// update and populate members.json for live preview






var idToEdit = "";

//caching DOM elements
const globalVarStuf = {
    firstName_input: $('input[name=firstName]'),
    lastName_input: $('input[name=lastName]'),
    password_input: $('input[name=password]'),
    confPassword_input: $('input[name=confPassword]'),
    phone_input: $('input[name=phone]'),
    email_input: $('input[name=email]'),
    availableSessions_input: $('input[name=availableSessions]'),
    usedSessions_input: $('input[name=usedSessions]'),
    startDate_input: $('input[name=startDate]'),
    delEdit_div: document.querySelector('#delEdit'),
    lastNameDetails_span: document.getElementById('lastNameDetails'),
    firstNameDetails_span: document.getElementById('firstNameDetails'),
    availableSessionsDetails_span: document.getElementById('availableSessionsDetails'),
    startDateDetails_span: document.getElementById('startDateDetails'),
    endDateDetails_span: document.getElementById('endDateDetails'),
}




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
        if (member.availableSessions < 1) {
            rowColor = "red";
        } else if (member.availableSessions <= 3) {
            rowColor = "yellow";
        } else {
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
    globalVarStuf.startDate_input.val(today);
    $('#modal1').fadeIn();
}
function closeNewMemberForm() {
    $('#modal1').fadeOut();
    document.getElementById("adMembersForm").reset();
    document.getElementById('comparePasswords').innerHTML = "";
}

//save member in db
function saveNewMember() {
    var firstName = globalVarStuf.firstName_input.val();
    var lastName = globalVarStuf.lastName_input.val();
    var password = globalVarStuf.password_input.val();
    var confPassword = globalVarStuf.confPassword_input.val();
    var phone = globalVarStuf.phone_input.val();
    var email = globalVarStuf.email_input.val();
    var availableSessions = globalVarStuf.availableSessions_input.val();
    let usedSessions = globalVarStuf.usedSessions_input.val();
    var startDate = globalVarStuf.startDate_input.val();
    //set end date
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);
    endDate = saveDate(endDate);

    //member input validation
    if (firstName == "") {
        alert("Please provide First Name");
        globalVarStuf.firstName_input.focus();
        return false;
    } else if (lastName == "") {
        alert("Please provide Last Name");
        globalVarStuf.lastName_input.focus();
        return false;
    }
    else if (password.length < 4) {
        alert("The password must have at least 4 digits!");
        globalVarStuf.password_input.focus();
        return false;
    }
    else if (password != confPassword) {
        alert("The passwords don't match!");
        globalVarStuf.confPassword_input.focus();
        return false;
    } else if (phone == "") {
        alert("Please provide phone number");
        globalVarStuf.phone_input.focus();
        return false;
    } else if (email == "") {
        alert("Please provide email");
        globalVarStuf.email_input.focus();
        return false;
    } else if (availableSessions < 0 || availableSessions == "") {
        alert("Please provide available sessions");
        globalVarStuf.availableSessions_input.focus();
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

    if (confirm("Add " + e + " sessions ?")) {
        var member = globalMembers.find(function (member) {
            return member.id == idToEdit;
        })

        var firstName = member.firstName;
        var lastName = member.lastName;
        var password = member.password;
        var phone = member.phone;
        var email = member.email;
        var usedSessions = member.usedSessions;
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
            usedSessions,
            startDate,
            endDate

        }).done(function (response) {
            idToEdit = "";
            if (response.success) {
                loadMembers();
                globalVarStuf.availableSessionsDetails_span.innerHTML = availableSessions;
                globalVarStuf.startDateDetails_span.innerHTML = setDisplayDate(new Date(startDate));
                globalVarStuf.endDateDetails_span.innerHTML = setDisplayDate(new Date(endDate));


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

    globalVarStuf.firstName_input.val(member.firstName);
    globalVarStuf.lastName_input.val(member.lastName);
    globalVarStuf.password_input.val(member.password);
    globalVarStuf.confPassword_input.val(member.password);
    globalVarStuf.phone_input.val(member.phone);
    globalVarStuf.email_input.val(member.email);
    globalVarStuf.availableSessions_input.val(member.availableSessions);
    var startDate = new Date(member.startDate);
    startDate = saveDate(startDate);
    globalVarStuf.startDate_input.val(startDate);
    globalVarStuf.usedSessions_input.val(member.usedSessions);
}


//show member details in main side-bar
function showMemberDetails() {
    const id = this.getAttribute('data-id');
    const phoneDetails_span = document.getElementById('phoneDetails');
    const emailDetails_span = document.getElementById('emailDetails');
    const sessionDetails_div = document.getElementById('sessions');
    var member = globalMembers.find(function (member) {
        return member.id == id;
    })

    var addSessions = `<div class="addSessionsButton" name="4" data-id="${member.id}">Add 4 sessions</div>
                        <div class="addSessionsButton" name="8" data-id="${member.id}">Add 8 sessions</div>
                        <div class="addSessionsButton" name="12" data-id="${member.id}">Add 12 sessions</div>`


    var editDel = `<a href="${API_URL.DELETE}?id=${member.id}" title="Delete member" class="edit" ><i class="fa fa-trash"></i></a> | 
                    <a href="#" title="Edit member" class="edit" data-id="${member.id}">&#9998;</a>`

    sessionDetails_div.innerHTML = addSessions;
    globalVarStuf.delEdit_div.innerHTML = editDel;
    globalVarStuf.lastNameDetails_span.innerHTML = member.lastName;
    globalVarStuf.firstNameDetails_span.innerHTML = member.firstName;
    phoneDetails_span.innerHTML = member.phone;
    emailDetails_span.innerHTML = member.email;
    globalVarStuf.availableSessionsDetails_span.innerHTML = member.availableSessions;
    usedSessionsDetail.innerHTML = member.usedSessions;
    //set start date
    var startDate = new Date(member.startDate);
    startDate = setDisplayDate(startDate);
    globalVarStuf.startDateDetails_span.innerHTML = startDate;
    //set end date
    var endDate = new Date(member.endDate);
    endDate = setDisplayDate(endDate);
    globalVarStuf.endDateDetails_span.innerHTML = endDate;

    //gravatar picture
    var email = member.email;
    var gravatar_image_url = get_gravatar_image_url(email, 175);
    $('#image').attr('src', gravatar_image_url);

    $('#main-sidebar').show("slow");
}

// get gravatar picture
function get_gravatar_image_url(email, size) {
    var MD5 = function (s) { function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() };

    return 'http://www.gravatar.com/avatar/' + MD5(email) + '.jpg?s=' + size;
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
            if (availableSessions < 0) {
                availableSessions = 0;
            }
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
                    console.log("succes to present");
                };
            });
        };

    };





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