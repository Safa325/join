let registerLetters = [];

async function initContacts() {
    
    await getArrayOfRegisterLetters();
    await renderRegisterboxes();
    await renderListOfContacts();

    console.log('userData vom Server. Onload initialisiert ', userData);
    console.log('userIndex', userIndex);    
}

async function getArrayOfRegisterLetters() {
    let userContacts = userData[userIndex]['contacts'];
    registerLetters = [];

    for (let i = 0; i < userContacts.length; i++) {
        let register = userContacts[i]['register'];

        if (!registerLetters.includes(register)) {
            registerLetters.push(register);
        }
    };
    registerLetters.sort();
}

function renderRegisterboxes() {
    document.getElementById('contacts-list').innerHTML = '';

    for (let i = 0; i < registerLetters.length; i++) {
        let registerLetter = registerLetters[i];  
        generateRegisterboxHTML(registerLetter);
    }
}

function generateRegisterboxHTML(registerLetter) {
    document.getElementById('contacts-list').innerHTML += /*HTML*/`
        <div id="registerbox-${registerLetter}" class="d-column-flex-start">
            <div class="registerbox">${registerLetter}</div>
        </div>
        `;
}

function renderListOfContacts() {
    let userContacts = userData[userIndex]['contacts'];

    for (let i = 0; i < userContacts.length; i++) {
        let objContact = userContacts[i];
        generateContact(objContact, i);   
    };
}

function generateContact(objContact, i) {
    let badgecolor = objContact['badgecolor'];
    let initials = objContact['initials'];
    let register = objContact['register'];
    let name = objContact['name'];
    let email = objContact['email'];

    document.getElementById(`registerbox-${register}`).innerHTML += /*HTML*/ `
    <div name="test" id="person-container-${i}" class="person-container" onclick="renderContactDetails(${i})">
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

function createContact() {
    let inputName = document.getElementById('contact-input-name').value;
    let inputEmail = document.getElementById('contact-input-email').value;
    let inputPhone = document.getElementById('contact-input-phone').value;

    //Badgecolor random zuweisen function getRandomBadgeColor()
    let min = 0;
    let max = profileBadgeColors.length;
    let indexBadge = Math.round(Math.random() * (max - min)) + min;
    let badge = profileBadgeColors[indexBadge];

    //Initialen ermitteln function getInitials()
    let firstletter = inputName.charAt(0);
    firstletter = firstletter.toUpperCase();
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
    let i = userData[userIndex]['contacts'].length -1;
    clearAddContactForm();
    initContacts();
    setSlideOutEffects();
    renderContactDetails(i);
}

async function setNewContact(newContact) {
    userData[userIndex]['contacts'].push(newContact);
    await setItem('userData', JSON.stringify(userData));
}

function clearAddContactForm() {
    document.getElementById('contact-input-name').innerHTML = '';
    document.getElementById('contact-input-email').innerHTML = '';
    document.getElementById('contact-input-phone').innerHTML = '';
}

function setHighlight(i) {
    document.getElementById(`person-container-${i}`).classList.add('element-active');
    
}

function removeHighlight() {
    let containers = document.querySelectorAll('.person-container');
    containers.forEach(element => {
    element.classList.remove('element-active')})
}

async function renderContactDetails(i) {
    let userContacts = userData[userIndex]['contacts'];
    removeHighlight();
    
    let badgecolor = userContacts[i]['badgecolor'];
        let initials = userContacts[i]['initials'];
        let name = userContacts[i]['name'];
        let email = userContacts[i]['email'];
        let phone = userContacts[i]['phone'];

    let details = document.getElementById('contacts-details');
    details.innerHTML = ``;

    details.innerHTML = generateContactDetailsHTML(badgecolor, initials, name, email, phone, i);
    
    await setHighlight(i);
}

function generateContactDetailsHTML(badgecolor, initials, name, email, phone, i) {
    return /*HTML*/`
    <div id="details-container" class="details-container d-column-flex-start">
        <div id="detail-header" class="detail-header">
            <div class="person-badge" style="background-color: ${badgecolor};">${initials}</div>
            <div class="name-right">
                <h2>${name}</h2>
                <div class="function-container">
                    <button id="edit-icon" class="edit-delete-btn" onmouseover="svgHoverEditBtn()" onmouseout="svgStandardEditBtn()" onclick="editContactBtn(${i})"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" 
                        fill="#2a3d59"/></svg>
                        <span style="color: var(--clr-dark-gray);">Edit</span>
                    </button>
                    <button id="delete-icon" class="edit-delete-btn" onmouseover="svgHover()" onmouseout="svgStandard()" onclick="deleteContact(${i})"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" 
                        fill="#2a3d59"/></svg>
                        <span style="color: var(--clr-dark-gray);">Delete</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="contact-information-header">Contact Information</div>
        <div class="contact-information-container">
            <h6>E-Mail</h6>
            <a href="mailto:${email}" id="email-selected-contact">${email}</a>    
            <h6>Phone</h6>
            <span id="phone-selected-contact">${phone}</span>
        </div>
    </div>
    `;
}

function svgHoverEditBtn() {
    document.getElementById('edit-icon').innerHTML = `
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" 
                        fill="#29abe2"/></svg>
                        <span style="color: var(--clr-light-blue);">Edit</span>
    `;
}

function svgStandardEditBtn() {
    document.getElementById('edit-icon').innerHTML = `
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" 
                        fill="#2a3d59"/></svg>
                        <span style="color: var(--clr-dark-gray);">Edit</span>
    `;
}

function addNewContactBtn() {
    document.getElementById('contact-slider').innerHTML = ``;
    document.getElementById('contact-slider').innerHTML = generateContactSliderContentHTML();

    document.getElementById('person-badge').style.backgroundColor = 'var(--clr-light-gray)';
    document.getElementById('person-badge').innerHTML = `<img src="./img/icons/person.svg" alt="">`;
    document.getElementById('window-headline').innerHTML = `Add contact`;
    document.getElementById('window-claim').innerHTML = `Tasks are better with a team!`;

    document.getElementById('buttons-container').innerHTML = `
    <button class="btn-white btn-pos" onclick="setSlideOutEffects()">
    Cancel<img src="./img/icons/cancel.svg"></button>
    <button id="createContactBtn" class="btn-grey img-white btn-pos" onclick="createContact()">
    Create contact<img src="./img/icons/checked.svg"></button>
    `;
    setSlideInEffects();
}

function editContactBtn(i) {
    let userContacts = userData[userIndex]['contacts'];
    
    let badgecolor = userContacts[i]['badgecolor'];
    let initials = userContacts[i]['initials'];
    let name = userContacts[i]['name'];
    let email = userContacts[i]['email'];
    let phone = userContacts[i]['phone'];

    document.getElementById('contact-slider').innerHTML = ``;
    document.getElementById('contact-slider').innerHTML = generateContactSliderContentHTML();
    
    document.getElementById('person-badge').style.backgroundColor = `${badgecolor}`;
    document.getElementById('person-badge').innerHTML = `${initials}`;
    document.getElementById('window-headline').innerHTML = `Edit contact`;

    document.getElementById('contact-input-name').value = `${name}`;
    document.getElementById('contact-input-email').value = `${email}`;
    document.getElementById('contact-input-phone').value = `${phone}`;

    document.getElementById('buttons-container').innerHTML = `
    <button class="btn-white btn-pos" onclick="deleteContact(${i})">
    Delete</button>
    <button id="createContactBtn" class="btn-grey img-white btn-pos" onclick="saveEditContact(${i})">
    Save<img src="./img/icons/checked.svg"></button>

    `;
    setSlideInEffects();
}

function generateContactSliderContentHTML() {
    return `
    <div class="left-container">
        <img src="./img/join_logo.svg" alt="">
        <h1 id="window-headline" class="no-margin clr-white"></h1>
        <div id="window-claim" class="add-claim"></div>
        <div class="separator-across-lightblue"></div>
    </div>
    <div class="right-container">
        <div class="cancel-x" onclick="setSlideOutEffects()"><img src="./img/icons/cancel.svg" alt=""></div>

        <div id="person-badge" class="person-badge">
            
        </div>
        <div class="control-elements-container">
            <div class="inputfields">
                <label id="contact-name-label">
                    <input class="contact-inputField" type="text" id="contact-input-name" placeholder="Name" required>
                </label>
                <label id="contact-email-label">
                    <input class="contact-inputField" type="email" id="contact-input-email" placeholder="Email" required>
                </label>
                <label id="contact-phone-label">
                    <input class="contact-inputField" type="tel" id="contact-input-phone" placeholder="Phone" required>
                </label>
            </div>
            <div id="buttons-container" class="cancel-create-buttons-container">
            </div>
        </div>
    </div>
`;
}

function setSlideInEffects() {
    if(document.getElementById('contact-slider').classList.contains('slide-out-animation')){
        document.getElementById('contact-slider').classList.remove('slide-out-animation')
    };
    document.getElementById('contact-slider').classList.add('slide-in-animation');   
    setTimeout(setDarkBackground, 300);
}

function setSlideOutEffects() {
    document.getElementById('contact-slider').classList.remove('slide-in-animation');
    document.getElementById('contact-slider').classList.add('slide-out-animation');   
    setTimeout(clearDarkBackground, 300);
    setTimeout(removeZindex, 1000);
}

function setDarkBackground() { 
    document.getElementById('dark-background').style = ('z-index: 1;');
    if(document.getElementById('dark-background').classList.contains('fade-out-animation')){
        document.getElementById('dark-background').classList.remove('fade-out-animation');
    };
    document.getElementById('dark-background').classList.add('fade-in-animation'); 
}

function clearDarkBackground() {
    document.getElementById('dark-background').classList.add('fade-out-animation'); 
}

function removeZindex() {
    document.getElementById('dark-background').style = ('z-index: 0;');
}

async function deleteContact(i) {
    userData[userIndex]['contacts'].splice(i, 1);
    await setItem("userData", JSON.stringify(userData));
    document.getElementById('contacts-details').innerHTML = ``;
    initContacts();
}

function saveEditContact(i) {
    //hier muss noch code hin
}