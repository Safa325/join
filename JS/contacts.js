let profileBadgeColors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
]

let contacts = [];

let registerLetters = [];

async function loadContacts() {
    try {
    contacts = JSON.parse(await getItem('contacts'));
    } catch(e) {
        console.warn('Could not load contacts')
    }
    getRegisterLetters();
}

async function getRegisterLetters() {
    for (let i = 0; i < contacts.length; i++) {
        let register = contacts[i]['register'];

        if (!registerLetters.includes(register)) {
            registerLetters.push(register);
        }
    };
    registerLetters.sort();
    
    console.log('contacts ', contacts);
    console.log('registerLetters ', registerLetters);
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

async function createContact() {
    let inputName = document.getElementById('addcontact-input-name').value;
    let inputEmail = document.getElementById('addcontact-input-email').value;
    let inputPhone = document.getElementById('addcontact-input-phone').value;

    let min = 0;
    let max = profileBadgeColors.length;
    let indexBadge = Math.round(Math.random() * (max - min)) + min;
    let badge = profileBadgeColors[indexBadge];

    let firstletter = inputName.charAt(0);
    
    let string = inputName;

    let names = string.split(' ');
    let firstletters = names[0].substring(0,1).toUpperCase();
        if (names.length > 1) {
            firstletters += names[1].substring(0, 1).toUpperCase();
        };

    let newContact = {
        badgecolor: badge,
        initials: firstletters,
        register: firstletter,
        name: inputName,
        email: inputEmail,
        phone: inputPhone
    };

    createContactBtn.disabled = true;
    contacts.push(newContact);

    await setItem('contacts', JSON.stringify(contacts));

    inputName.innerHTML = ``;
    inputEmail.innerHTML = ``;
    inputPhone.innerHTML = ``;
    initContacts();
}

function generateRegister() {
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
    await loadContacts();

    await generateRegister();

    for (let i = 0; i < contacts.length; i++) {
        let badgecolor = contacts[i]['badgecolor'];
        let initials = contacts[i]['initials'];
        let register = contacts[i]['register'];
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let phone = contacts[i]['phone'];

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

    let badgecolor = contacts[i]['badgecolor'];
        let initials = contacts[i]['initials'];
        let register = contacts[i]['register'];
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let phone = contacts[i]['phone'];

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