let registerLetters = [];

async function initContacts() {
    await getArrayOfRegisterLetters();
    await renderRegisterboxes();
    await renderListOfContacts();
}

//find registerletter in saved contacts of the current user and sort them in a temporary array (registerLetters)
async function getArrayOfRegisterLetters() {
    let userContacts = userData[userIndex]['contacts']; //declare userContacts
    registerLetters = []; //clear array registerLetters
    for (let i = 0; i < userContacts.length; i++) {
        let register = userContacts[i]['register']; //find registerLetter of each contact
        if (!registerLetters.includes(register)) { //if found letter doesn't contains in registerLetters yet, then push it (if it already contains then not)
            registerLetters.push(register);
        }
    }
    registerLetters.sort(); //sort the registerLetters array
}

//render letters of registerletter in contactlist
async function renderRegisterboxes() {
    document.getElementById('register-container').innerHTML = '';

    for (let i = 0; i < registerLetters.length; i++) {
        let registerLetter = registerLetters[i]; //find letters in array...
        generateRegisterboxHTML(registerLetter); //...and generate the HTML-Container
    }
}

function generateRegisterboxHTML(registerLetter) {
    document.getElementById('register-container').innerHTML += /*HTML*/ `
        <div id="registerbox-${registerLetter}" class="d-column-flex-start">
            <div class="registerbox">${registerLetter}</div>
        </div>
        `;
}

//render entire list of all contacts
async function renderListOfContacts() {
    let userContacts = userData[userIndex]['contacts'];
    for (let i = 0; i < userContacts.length; i++) {
        let objContact = userContacts[i]; //find contacts in storage...
        generateContact(objContact, i); //...and generate the contact-container
    }
}

async function generateContact(objContact, i) {
    let badgecolor = objContact['badgecolor'];
    let initials = objContact['initials'];
    let register = objContact['register'];
    let name = objContact['name'];
    let email = objContact['email'];
    document.getElementById(`registerbox-${register}`).innerHTML += generateContactHTML(i, badgecolor, initials, name, email);
}

//try to create a function to get backupfiles of the guest user
async function fetchData() {
    let resp = await fetch('dummy.json');
    dummyUser = await resp.json();
    return dummyUser;

    /*  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value); */
}

//add new contact
async function createContact() {
    let newContact = getContactInput(); //collect and create contact information
    setNewContact(newContact); //push new contact and setItem
    let i = userData[userIndex]['contacts'].length - 1; //index of the last added contact
    clearAddContactForm(); //clear input-form
    await initContacts(); // new initialization with the new contact
    setSlideOutEffects(); // close input form with a slide out-effect
    showContactDetails(i); // show the details of the new added contact
    confirmNewContact(); // show confirmation
    setTimeout(hideConfirmNewContact, 800); // hide confirmation after 0.8 sec.
    setHighlight(i); //highlight the new added contact in the contact list
}

//collect and create contact information
function getContactInput() {
    let newContact = {
        badgecolor: getRandomBadgeColor(),
        initials: getInitials(),
        register: getRegisterLetter(),
        name: document.getElementById('contact-input-name').value,
        email: document.getElementById('contact-input-email').value,
        phone: document.getElementById('contact-input-phone').value,
    };
    return newContact;
}


function getInitials() {
    let inputName = document.getElementById('contact-input-name').value;

    let string = inputName; //set value as string
    let names = string.split(' '); //split string, delimiter = ' '
    let firstletters = names[0].substring(0, 1).toUpperCase(); //take the substring, start from 1. letter (0) and take 1 letter (1) from the first part of splittet string (names[0]) - and make a capitial letter of it...
    if (names.length > 1) {
        firstletters += names[1].substring(0, 1).toUpperCase(); //...if there are more than 1 string after splitting, then do the same but with the second string.
    }
    return firstletters; //return letter(s)
}

function getRegisterLetter() {
    let inputName = document.getElementById('contact-input-name').value;
    let firstletter = inputName.charAt(0); //take the first letter of the name
    firstletter = firstletter.toUpperCase(); //...in capital letter
    return firstletter; //return this letter
}

function getRandomBadgeColor() {
    let max = profileBadgeColors.length; //declare the max index by taking the length of the profileBadgeColors array
    let indexBadge = Math.round(Math.random() * max); //create a random number without decimal number
    return profileBadgeColors[indexBadge]; //take the color fom array with created random index
}

async function setNewContact(newContact) {
    userData[userIndex]['contacts'].push(newContact); //push to array
    await setItem('userData', JSON.stringify(userData)); //save data on server
    
}

function clearAddContactForm() {
    document.getElementById('contact-input-name').innerHTML = '';
    document.getElementById('contact-input-email').innerHTML = '';
    document.getElementById('contact-input-phone').innerHTML = '';
}

function setHighlight(i) {
    removeHighlight();
    document.getElementById(`contact-container-${i}`).classList.add('element-active');
}

function removeHighlight() {
    let containers = document.querySelectorAll('.contact-container'); //choose all contact-container...
    containers.forEach((element) => {
        element.classList.remove('element-active'); //...and remove the highlight(element-active)
    });
}

function showContactDetails(i) {
    if (window.innerWidth < 1200) { //responsive rendering if screen width smaller 1200px
        renderContactDetails(i);
        hideContactList();
        showBackAndMenuBtn();
        renderDetailsMenuBtn(i);
    } else {
        renderContactDetails(i); //rendering if screen width larger 1200px
    }
}

function renderContactDetails(i) {
    let userContacts = userData[userIndex]['contacts'];
    let badgecolor = userContacts[i]['badgecolor'];
    let initials = userContacts[i]['initials'];
    let name = userContacts[i]['name'];
    let email = userContacts[i]['email'];
    let phone = userContacts[i]['phone'];
    let details = document.getElementById('contact-details');
    details.innerHTML = ``;
    details.innerHTML = generateContactDetailsHTML(badgecolor, initials, name, email, phone, i); //render Details in contact-details-section
}

function hideContactList() {
    document.getElementById('contacts-list').classList.add('d-none'); //hide contact list (so contact details will be visible instead)
}

function showBackAndMenuBtn() {
    document.getElementById('arrow-back-lightblue').classList.remove('d-none'); //show back-arrow
    document.getElementById('btn-details-container').classList.remove('d-none'); //show menu button
}

function renderDetailsMenuBtn(i) {
    document.getElementById('btn-details-container').innerHTML = renderDetailsMenuBtnHTML(i); //render menu button
}

function confirmNewContact() {
    document.getElementById('confirmed').innerHTML = confirmNewContactHTML(); //render confirmation after adding new contact
}

function hideConfirmNewContact() {
    document.getElementById('confirmed').innerHTML = ``; //hide confirmation of new added contact
}


function openAddContactSlider() {
    removeHighlight(); //remove any highlight of contacts in contact list
    if(document.getElementById('dark-background').classList.contains('fade-out-animation')){
        document.getElementById('dark-background').classList.remove('fade-out-animation');
    }; // remove fade out effect if it contains
    document.getElementById('contact-slider').innerHTML = ``;
    document.getElementById('contact-slider').innerHTML = generateAddContactSliderContentHTML(); //generate content of "add new contact"-input-form
    document.getElementById('contact-badge').style.backgroundColor = 'var(--clr-light-gray)'; //generate contact badge
    document.getElementById('contact-badge').innerHTML = `<img src="./img/icons/person.svg" alt="">`; //generate image of contact-badge
    document.getElementById('window-headline').innerHTML = `Add contact`; //generate headline of the slider
    document.getElementById('window-claim').innerHTML = `Tasks are better with a team!`; //generate claim of the slider
    setSlideInEffects(); //let the window slide in
}

function openContactSlider(i) {
    if(document.getElementById('dark-background').classList.contains('fade-out-animation')){
        document.getElementById('dark-background').classList.remove('fade-out-animation');
    }; // remove fade out effect if it contains
    let userContacts = userData[userIndex]['contacts'];
    let badgecolor = userContacts[i]['badgecolor'];
    let initials = userContacts[i]['initials'];
    let name = userContacts[i]['name'];
    let email = userContacts[i]['email'];
    let phone = userContacts[i]['phone']; //declare all informations needed for the contact-slider
    document.getElementById('contact-slider').innerHTML = ``;
    document.getElementById('contact-slider').innerHTML = generateOpenContactSliderContentHTML(i); //generate content of "contact-details"-form
    document.getElementById('contact-badge').style.backgroundColor = `${badgecolor}`; //generate contact badge
    document.getElementById('contact-badge').innerHTML = `${initials}`; //generate initials of contact-badge
    document.getElementById('window-headline').innerHTML = `Edit contact`; //generate headline of the slider
    document.getElementById('contact-input-name').value = `${name}`; //generate name of contact to open
    document.getElementById('contact-input-email').value = `${email}`; //generate email of contact to open
    document.getElementById('contact-input-phone').value = `${phone}`; //generate phone of contact to open
    setSlideInEffects(); //let the window slide in
}

function setSlideInEffects() {
    document.getElementById('overlay-window').classList.remove('d-none'); //overlay window as area the slider will be shown
    if (document.getElementById('contact-slider').classList.contains('slide-out-animation')) {
        document.getElementById('contact-slider').classList.remove('slide-out-animation');
    }; //remove slide out effect if it contains
    document.getElementById('contact-slider').classList.add('slide-in-animation'); //add class with slide-in animation
    document.getElementById('dark-background').classList.remove('d-none'); //Background window for darkening effect
    setTimeout(setDarkBackground, 300); //darkening effect after 0.3 sec to match with the slide-in effect
}

function setSlideOutEffects() {
    if (document.getElementById('contact-slider').classList.contains('slide-in-animation')) {
        document.getElementById('contact-slider').classList.add('slide-in-animation');
    }; //remove slide in effect if it contains
    document.getElementById('contact-slider').classList.add('slide-out-animation'); //let the window slide out
    setTimeout(clearDarkBackground, 300); //lighten the darkening background after 0.3 sec to match with slide-out effect
    setTimeout(hideDarkBackground, 1000); //hide the background-layer to avoid conflicts with it
}

function setDarkBackground() {
    document.getElementById('dark-background').style = 'z-index: 1;'; //priorise the background layer
    if (document.getElementById('dark-background').classList.contains('fade-out-animation')) {
        document.getElementById('dark-background').classList.remove('fade-out-animation');
    }; //remove fade out effect if it contains
    document.getElementById('dark-background').classList.add('fade-in-animation'); //set fade in effect on the background layer
}

function clearDarkBackground() {
    if (document.getElementById('dark-background').classList.contains('fade-in-animation')) {
        document.getElementById('dark-background').classList.remove('fade-in-animation');
    } //remove fade in effect if it contains
    document.getElementById('dark-background').classList.add('fade-out-animation'); //set fade out effect of the background layer
    document.getElementById('overlay-window').classList.add('d-none'); //hide overlay window to avoid conflicts with it
}

function hideDarkBackground() {
    document.getElementById('dark-background').style = ('z-index: 0;'); // change z-index from 1 to 0
    document.getElementById('dark-background').classList.add('d-none'); //hide nackground layer to avoid conflicts with it
}

async function deleteContact(i) {
    userData[userIndex]['contacts'].splice(i, 1); //delete contact from contacts array of the user
    await setItem('userData', JSON.stringify(userData)); //save new userData on server
    document.getElementById('contact-details').innerHTML = ``; //clear contact details section
    setSlideOutEffects(); //let the window slide out (slider delete option only)
    initContacts(); //initialize the contacts again
}

async function saveEditContact(i) {
    let contact = userData[userIndex]['contacts'][i]; //delcare the contact object

    contact['name'] = document.getElementById('contact-input-name').value; //set contact name of input form with selected contact name
    contact['email'] = document.getElementById('contact-input-email').value; //set contact email of input form with selected contact email
    contact['phone'] = document.getElementById('contact-input-phone').value; //set contact phone of input form with selected contact phone

    await setItem('userData', JSON.stringify(userData)); //save the amended userdata on server
    setSlideOutEffects(); //let the window slide out (slider delete option only)
    initContacts(); //initialize the contacts again
    showContactDetails(i); //show details of amended contact
    setHighlight(i); //highlight the amended contact in contact list
}

function openDetailsMenu() { //responsive only
    if (document.getElementById('function-container').classList.contains('menu-slide-out-animation')) {
        document.getElementById('function-container').classList.remove('menu-slide-out-animation');
    }; //remove slide out effect if it already contains
    document.getElementById('function-container').classList.add('menu-slide-in-animation'); //let the window slide in
}

function closeDetailsMenu() { //responsive only
    if (document.getElementById('function-container').classList.contains('menu-slide-in-animation')) {
        document.getElementById('function-container').classList.remove('menu-slide-in-animation');
    }; //remove slide in effect if it already contains
    document.getElementById('function-container').classList.add('menu-slide-out-animation'); //let the window slide out
}
