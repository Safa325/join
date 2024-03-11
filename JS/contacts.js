
let registerLetters = [];

async function getRegisterLetters() {
    let userContacts = userData[userIndex]['contacts'];

    for (let i = 0; i < userContacts.length; i++) {
        let register = userContacts[i]['register'];

        if (!registerLetters.includes(register)) {
            registerLetters.push(register);
        }
    };
    registerLetters.sort();
}

function addNewContact() {
    document.getElementById('add-contact-container').classList.remove('slide-out-animation');
    document.getElementById('add-contact-container').classList.remove('d-none');
    document.getElementById('add-contact-container').classList.add('slide-in-animation');
}

function closeAddNewContact() {
    document.getElementById('add-contact-container').classList.remove('slide-in-animation');
    document.getElementById('add-contact-container').classList.add('slide-out-animation');
    setTimeout(hideOverlay, 1000);
}

function hideOverlay() {
    document.getElementById('add-contact-container').classList.add('d-none');
}



function generateRegister() {
    getRegisterLetters();
    let list = document.getElementById('contacts-list');
    list.innerHTML = '';

    for (let i = 0; i < registerLetters.length; i++) {
        var registerLetter = registerLetters[i];
        
        list.innerHTML += /*HTML*/`
        <div id="registerbox-${registerLetter}" class="d-column-flex-start">
            <div class="registerbox">${registerLetter}</div>
        </div>
        `;
    }
}

async function initContacts() {
    await getUserData();
    console.log('userData vom Server. Onload initialisiert ', userData);

    let userContacts = userData[userIndex]['contacts'];

    await generateRegister();

    for (let i = 0; i < userContacts.length; i++) {
        let badgecolor = userContacts[i]['badgecolor'];
        let initials = userContacts[i]['initials'];
        let register = userContacts[i]['register'];
        let name = userContacts[i]['name'];
        let email = userContacts[i]['email'];
        let phone = userContacts[i]['phone'];

        let contactlist = document.getElementById(`registerbox-${register}`);
        contactlist.innerHTML += generateContact(badgecolor, initials, name, email, phone, i);
        
    };
}

function generateContact(badgecolor, initials, name, email, phone, i) {
    return `
    <div class="person-container" onclick="showContactDetails(${i})">
        <div class="initials-circle" style="background-color: ${badgecolor};">${initials}</div>
        <div class="d-column-flex-start">
            <div class="person-name">
                <div>${name}</div>
            </div>
            <div class="person-email">${email}</div>
        </div>
    </div>
    `;
}

function showContactDetails(i) {
    let userContacts = userData[userIndex]['contacts'];

    let badgecolor = userContacts[i]['badgecolor'];
        let initials = userContacts[i]['initials'];
        let register = userContacts[i]['register'];
        let name = userContacts[i]['name'];
        let email = userContacts[i]['email'];
        let phone = userContacts[i]['phone'];

    let details = document.getElementById('contacts-details');
    details.innerHTML = ``;

    details.innerHTML = /*HTML*/`
    <div id="details-container" class="d-column-flex-start">
        <div id="detail-header">
            <div class="person-uni-badge" style="background-color: ${badgecolor};">${initials}</div>
            <div id="name-right">
                <span id="name">${name}</span>
                <div id="function-container"></div>
            </div>
        </div>
        <span>Contact Information</span>
        <div id="email-detail">
            <span>E-Mail</span>
            <span id="email-selected-contact">${email}</span>
        </div>
        <div id="phone-detail">
            <span>Phone</span>
            <span id="phone-selected-contact">${phone}</span>
        </div>
    </div>
    `;

}