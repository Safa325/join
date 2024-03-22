let registerLetters = [];

async function initContacts() {
    
    await getArrayOfRegisterLetters();
    await renderRegisterboxes();
    await renderListOfContacts();

    // console.log('userData vom Server. Onload initialisiert ', userData);
    // console.log('userIndex', userIndex);    
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

async function renderRegisterboxes() {
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

async function fetchData() {
    let resp = await fetch(
        'dummy.json'
      );
      dummyUser = await resp.json();
      return dummyUser

   /*  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value); */
}

async function renderListOfContacts() {
    let userContacts = userData[userIndex]['contacts'];

    for (let i = 0; i < userContacts.length; i++) {
        let objContact = userContacts[i];
        generateContact(objContact, i);   
    };
}

async function generateContact(objContact, i) {
    let badgecolor = objContact['badgecolor'];
    let initials = objContact['initials'];
    let register = objContact['register'];
    let name = objContact['name'];
    let email = objContact['email'];

    document.getElementById(`registerbox-${register}`).innerHTML += /*HTML*/ `
    <div name="test" id="person-container-${i}" class="person-container" onclick="showContactDetails(${i}); setHighlight(${i})">
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

async function createContact() {
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
    await initContacts();
    setSlideOutEffects();
    showContactDetails(i);
    confirmNewContact();
    setTimeout(hideConfirmNewContact, 800);
    setHighlight(i);
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
    removeHighlight();
    document.getElementById(`person-container-${i}`).classList.add('element-active');
    
}

function removeHighlight() {
    let containers = document.querySelectorAll('.person-container');
    containers.forEach(element => {
    element.classList.remove('element-active')})
}

function showContactDetails(i) {
    if(window.innerWidth < 1200){
        renderContactDetails(i);
        hideContactList();
        showBackAndMenuBtn();
        renderDetailsMenuBtn(i);
    } else {
        renderContactDetails(i);
    };
}

function hideContactList() {
    document.getElementById('contacts-left-column').classList.add('d-none');
}

function renderContactDetails(i) {
    let userContacts = userData[userIndex]['contacts'];
    
    let badgecolor = userContacts[i]['badgecolor'];
        let initials = userContacts[i]['initials'];
        let name = userContacts[i]['name'];
        let email = userContacts[i]['email'];
        let phone = userContacts[i]['phone'];

    let details = document.getElementById('contacts-details');
    details.innerHTML = ``;

    details.innerHTML = generateContactDetailsHTML(badgecolor, initials, name, email, phone, i);
    
}

function generateContactDetailsHTML(badgecolor, initials, name, email, phone, i) {
    return /*HTML*/`
    <div id="details-container" class="details-container d-column-flex-start">
        <div id="detail-header" class="detail-header">
            <div id="person-details-badge" class="person-details-badge" style="background-color: ${badgecolor};">${initials}</div>
            <div class="name-right">
                <h2>${name}</h2>
                <div id="function-container" class="function-container">
                    <button id="edit-btn" class="edit-delete-btn" onclick="openContactSlider(${i})">
                        <img src="./img/icons/pencil-black.svg" alt="">    
                        <span>Edit</span>
                    </button>
                    <button id="delete-btn" class="edit-delete-btn" onclick="deleteContact(${i})">
                        <img src="./img/icons/trashcan-black.svg" alt="">   
                        <span>Delete</span>
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
        <div id="confirmed"></div>
    </div>
    `;
    
}

function confirmNewContact() {
    document.getElementById('confirmed').innerHTML = `<div id="confirmation-container"><span>Contact succesfully created</span></div>`;
}

function hideConfirmNewContact() {
    document.getElementById('confirmed').innerHTML = ``;
}

function showBackAndMenuBtn() {
    document.getElementById('arrow-back-lightblue').classList.remove('d-none');
    document.getElementById('btn-details-container').classList.remove('d-none');
}

function openNewContactSlider() {
    removeHighlight();

    document.getElementById('contact-slider').innerHTML = ``;
    document.getElementById('contact-slider').innerHTML = generateContactSliderContentHTML();

    document.getElementById('person-badge').style.backgroundColor = 'var(--clr-light-gray)';
    document.getElementById('person-badge').innerHTML = `<img src="./img/icons/person.svg" alt="">`;
    document.getElementById('window-headline').innerHTML = `Add contact`;
    document.getElementById('window-claim').innerHTML = `Tasks are better with a team!`;

    document.getElementById('buttons-container').innerHTML = `
    <button id="cancelBtn" class="btn-white btn-pos" onclick="setSlideOutEffects()">
    Cancel<img src="./img/icons/cancel.svg"></button>
    <button id="createContactBtn" class="btn-grey img-white btn-pos" onclick="createContact()">
    Create contact<img src="./img/icons/checked.svg"></button>
    `;
    setSlideInEffects();
}

function openContactSlider(i) {
    
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
    document.getElementById('overlay-window').classList.remove('d-none');
    if(document.getElementById('contact-slider').classList.contains('slide-out-animation')){
        document.getElementById('contact-slider').classList.remove('slide-out-animation')
    };
    document.getElementById('contact-slider').classList.add('slide-in-animation') 
    document.getElementById('dark-background').classList.remove('d-none');
    setTimeout(setDarkBackground, 300);
}

function setSlideOutEffects() {
    if(document.getElementById('contact-slider').classList.contains('slide-in-animation')){
        document.getElementById('contact-slider').classList.add('slide-in-animation')
    }; 
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
    if(document.getElementById('dark-background').classList.contains('fade-in-animation')){
        document.getElementById('dark-background').classList.remove('fade-in-animation');
    };
    document.getElementById('dark-background').classList.add('fade-out-animation'); 
    document.getElementById('overlay-window').classList.add('d-none');
    
}

function removeZindex() {
    document.getElementById('dark-background').style = ('z-index: 0;');
    document.getElementById('dark-background').classList.add('d-none');
}

async function deleteContact(i) {
    userData[userIndex]['contacts'].splice(i, 1);
    await setItem("userData", JSON.stringify(userData));
    document.getElementById('contacts-details').innerHTML = ``;
    initContacts();
}

async function saveEditContact(i) {
    
    let inputName = document.getElementById('contact-input-name').value;
    let inputEmail = document.getElementById('contact-input-email').value;
    let inputPhone = document.getElementById('contact-input-phone').value;

    let contact = userData[userIndex]['contacts'][i];

    contact['name'] = inputName;
    contact['email'] = inputEmail;
    contact['phone'] = inputPhone;

    await setItem('userData', JSON.stringify(userData));
    setSlideOutEffects();
    initContacts();
    showContactDetails(i);
    setHighlight(i);
}

function renderDetailsMenuBtn(i) {
    document.getElementById('btn-details-container').innerHTML = /*html*/`
    <button
    class="btn-grey btn-details-menu"
    onclick="openDetailsMenu(${i})"></button>
    `;
}

function openDetailsMenu() {
        if(document.getElementById('function-container').classList.contains('menu-slide-out-animation')){
            document.getElementById('function-container').classList.remove('menu-slide-out-animation')
        };
        document.getElementById('function-container').classList.add('menu-slide-in-animation') 
}

function closeDetailsMenu() {
    if(document.getElementById('function-container').classList.contains('menu-slide-in-animation')){
        document.getElementById('function-container').classList.remove('menu-slide-in-animation')
    };
    document.getElementById('function-container').classList.add('menu-slide-out-animation') 
}
