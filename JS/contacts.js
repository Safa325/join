let registerLetters = [];

async function initContacts() {
    
    await getArrayOfRegisterLetters();
    await renderRegisterboxes();
    await renderListOfContacts();

    
}

async function getArrayOfRegisterLetters() {
    let userContacts = userData[userIndex]['contacts'];

    for (let i = 0; i < userContacts.length; i++) {
        let register = userContacts[i]['register'];

        if (!registerLetters.includes(register)) {
            registerLetters.push(register);
        }
    };
    registerLetters.sort();
}

function renderRegisterboxes() {
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

function renderListOfContacts() {
    let userContacts = userData[userIndex]['contacts'];

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

function openAddNewContact() {
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

    //Badgecolor random zuweisen function getRandomBadgeColor()
    let min = 0;
    let max = profileBadgeColors.length;
    let indexBadge = Math.round(Math.random() * (max - min)) + min;
    let badge = profileBadgeColors[indexBadge];

    //Initialen ermitteln function getInitials()
    let firstletter = inputName.charAt(0);
    let string = inputName;
    let names = string.split(' ');
    let firstletters = names[0].substring(0,1).toUpperCase();
        if (names.length > 1) {
            firstletters += names[1].substring(0, 1).toUpperCase();
        };

    //Kontakt nach Eingabe function getContactInput()
    let newContact =
        {
        badgecolor: badge,
        initials: firstletters,
        register: firstletter,
        name: inputName,
        email: inputEmail,
        phone: inputPhone
    };
    
    setNewContact(newContact);
    clearAddContactForm();
    initContacts();
    closeAddNewContact();
}

async function setNewContact(newContact) {
    userData[userIndex]['contacts'].push(newContact);
    await setItem('userData', JSON.stringify(userData));
}

function generateContact(badgecolor, initials, name, email, phone, i) {
    return `
    <div name="test" id="person-container-${i}" class="person-container" onclick="showContactDetails(${i})">
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

function clearAddContactForm() {
    document.getElementById('addcontact-input-name').innerHTML = '';
    document.getElementById('addcontact-input-email').innerHTML = '';
    document.getElementById('addcontact-input-phone').innerHTML = '';
}

function setHighlight(i) {
    document.getElementById(`person-container-${i}`).classList.add('element-active');
}

function removeHighlight() {
    let containers = document.querySelectorAll('.person-container');
    containers.forEach(element => {
    element.classList.remove('element-active')})
}

function showContactDetails(i) {

    let userContacts = userData[userIndex]['contacts'];
    removeHighlight();
    setHighlight(i);

    let badgecolor = userContacts[i]['badgecolor'];
        let initials = userContacts[i]['initials'];
        let name = userContacts[i]['name'];
        let email = userContacts[i]['email'];
        let phone = userContacts[i]['phone'];

    let details = document.getElementById('contacts-details');
    details.innerHTML = ``;

    details.innerHTML = renderContactDetailsHTML(badgecolor, initials, name, email, phone);
}

function renderContactDetailsHTML(badgecolor, initials, name, email, phone) {
    return /*HTML*/`
    <div id="details-container" class="details-container d-column-flex-start">
        <div id="detail-header" class="detail-header">
            <div class="person-uni-badge" style="background-color: ${badgecolor};">${initials}</div>
            <div class="name-right">
                ${name}
                <div class="function-container">
                    <div class="edit-delete-btn">
                        <label for="edit-icon">
                        <svg name="edit-icon" width="18.28" height="18.25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M3.16667 22.3332H5.03333L16.5333 10.8332L14.6667 8.9665L3.16667 20.4665V22.3332ZM22.2333 8.89984L16.5667 3.29984L18.4333 1.43317C18.9444 0.922059 19.5722 0.666504 20.3167 0.666504C21.0611 0.666504 21.6889 0.922059 22.2 1.43317L24.0667 3.29984C24.5778 3.81095 24.8444 4.42761 24.8667 5.14984C24.8889 5.87206 24.6444 6.48873 24.1333 6.99984L22.2333 8.89984ZM20.3 10.8665L6.16667 24.9998H0.5V19.3332L14.6333 5.19984L20.3 10.8665Z"
                        fill="#2a3d59" />
                        </svg>
                        Edit</label>
                    </div>
                    <div class="edit-delete-btn">
                        <label for="delete-icon">
                        <svg width="22" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z"
                        fill="#2a3d59" />
                        </svg>
                        Delete</label>
                    </div>
                </div>
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