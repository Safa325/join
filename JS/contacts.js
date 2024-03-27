let registerLetters = [];

/**
 * initialize contacts-page
 */
async function initContacts() {
    await getArrayOfRegisterLetters();
    await renderRegisterboxes();
    await renderListOfContacts();
}

/**
 * find registerletter in saved contacts of the current user and sort them in a temporary array (registerLetters)
 */
async function getArrayOfRegisterLetters() {
    let userContacts = userData[userIndex]['contacts'];
    registerLetters = [];
    for (let i = 0; i < userContacts.length; i++) {
        let register = userContacts[i]['register'];
        if (!registerLetters.includes(register)) {
            registerLetters.push(register);
        }
    }
    registerLetters.sort();
}

/**
 * render letters of registerletter in contactlist
 */
async function renderRegisterboxes() {
    document.getElementById('register-container').innerHTML = '';

    for (let i = 0; i < registerLetters.length; i++) {
        let registerLetter = registerLetters[i];
        generateRegisterboxHTML(registerLetter);
    }
}

/**
 * render entire list of all contacts
 */
async function renderListOfContacts() {
    let userContacts = userData[userIndex]['contacts'];
    for (let i = 0; i < userContacts.length; i++) {
        let objContact = userContacts[i];
        generateContact(objContact, i);
    }
}
/**
 * declare objects of the contact and generate HTML for contact-list
 * @param {array} objContact object with information of single contact
 * @param {number} i index of selected contact
 */
async function generateContact(objContact, i) {
    let badgecolor = objContact['badgecolor'];
    let initials = objContact['initials'];
    let register = objContact['register'];
    let name = objContact['name'];
    let email = objContact['email'];
    document.getElementById(`registerbox-${register}`).innerHTML += generateContactHTML(i, badgecolor, initials, name, email);
}

/**
 * create a new contact after fill in the input-form
 */
async function createContact() {
    let newContact = getContactInput();
    setNewContact(newContact);
    let i = userData[userIndex]['contacts'].length - 1;
    clearAddContactForm();
    await initContacts();
    setSlideOutEffects();
    showContactDetails(i);
    confirmNewContact();
    setTimeout(hideConfirmNewContact, 800);
    setHighlight(i);
}

/**
 * collect and create contact information from input-form
 * @returns
 */
function getContactInput() {
    let newContact = {
        badgecolor: getRandomBadgeColor(),
        initials: getInitialsFromInput(),
        register: getRegisterLetter(),
        name: document.getElementById('contact-input-name').value,
        email: document.getElementById('contact-input-email').value,
        phone: document.getElementById('contact-input-phone').value,
    };
    return newContact;
}

/**
 * get the initials by splitting the name string and take each first letters
 * @returns
 */
function getInitialsFromInput() {
    let inputName = document.getElementById('contact-input-name').value;

    let string = inputName;
    let names = string.split(' ');
    let firstletters = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        firstletters += names[1].substring(0, 1).toUpperCase();
    }
    return firstletters;
}

/**
 * get registerletter by taking the first letter of the surname
 * @returns
 */
function getRegisterLetter() {
    let inputName = document.getElementById('contact-input-name').value;
    let firstletter = inputName.charAt(0);
    firstletter = firstletter.toUpperCase();
    return firstletter;
}

/**
 * create random index the get a random color of the badge
 * @returns
 */
function getRandomBadgeColor() {
    let max = profileBadgeColors.length;
    let indexBadge = Math.round(Math.random() * max);
    return profileBadgeColors[indexBadge];
}

/**
 * save the new contact on fileserver
 * @param {array} newContact objects of created contact
 */
async function setNewContact(newContact) {
    userData[userIndex]['contacts'].push(newContact);
    await setItem('userData', JSON.stringify(userData));
}

/**
 * clear the input-form
 */
function clearAddContactForm() {
    document.getElementById('contact-input-name').innerHTML = '';
    document.getElementById('contact-input-email').innerHTML = '';
    document.getElementById('contact-input-phone').innerHTML = '';
}

/**
 * highlight contacts entry
 * @param {number} i index of selected contact
 */
function setHighlight(i) {
    removeHighlight();
    document.getElementById(`contact-container-${i}`).classList.add('element-active');
}

/**
 * remove highlight of all entries
 */
function removeHighlight() {
    let containers = document.querySelectorAll('.contact-container');
    containers.forEach((element) => {
        element.classList.remove('element-active');
    });
}

/**
 * render the contact-details
 * @param {number} i index of selected contact
 */
function showContactDetails(i) {
    if (window.innerWidth < 1200) {
        renderContactDetails(i);
        hideContactList();
        showBackAndMenuBtn();
        renderDetailsMenuBtn(i);
        /* document.getElementById('function-container').classList.add('d-none'); */
    } else {
        renderContactDetails(i);
    }
}

/**
 * get contact-details from userdata and generate details HTML
 * @param {number} i index of selected contact
 */
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

/**
 * hide contact list (so contact details will be visible instead)
 */
function hideContactList() {
    document.getElementById('contacts-list').classList.add('d-none');
}

/**
 * show responsive menu and back-arrow
 */
function showBackAndMenuBtn() {
    document.getElementById('arrow-back-lightblue').classList.remove('d-none');
    document.getElementById('btn-details-container').classList.remove('d-none');
}

/**
 * render menu button
 * @param {number} i index of selected contact
 */
function renderDetailsMenuBtn(i) {
    document.getElementById('btn-details-container').innerHTML = renderDetailsMenuBtnHTML(i);
}

/**
 * render confirmation after adding new contact
 */
function confirmNewContact() {
    document.getElementById('confirmed').innerHTML = confirmNewContactHTML();
}

/**
 * hide confirmation of new added contact
 */
function hideConfirmNewContact() {
    document.getElementById('confirmed').innerHTML = ``;
}

/**
 * open overlay window with an empty input-form to create a new contact
 */
function openAddContactSlider() {
    removeHighlight();
    removeFadeOutAnimation();
    document.getElementById('contact-slider').innerHTML = ``;
    document.getElementById('contact-slider').innerHTML = generateAddContactSliderContentHTML();
    document.getElementById('contact-badge').style.backgroundColor = 'var(--clr-light-gray)';
    document.getElementById('contact-badge').innerHTML = `<img src="./img/icons/person.svg" alt="">`;
    document.getElementById('window-headline').innerHTML = `Add contact`;
    document.getElementById('window-claim').innerHTML = `Tasks are better with a team!`;
    setSlideInEffects();
}

/**
 * open overlay window with an input-form of the selected contact
 * @param {number} i index of selected contact
 */
function openContactSlider(i) {
    removeFadeOutAnimation();

    let userContacts = userData[userIndex]['contacts'];
    let badgecolor = userContacts[i]['badgecolor'];
    let initials = userContacts[i]['initials'];
    let name = userContacts[i]['name'];
    let email = userContacts[i]['email'];
    let phone = userContacts[i]['phone'];
    document.getElementById('contact-slider').innerHTML = ``;
    document.getElementById('contact-slider').innerHTML = generateOpenContactSliderContentHTML(i);
    document.getElementById('contact-badge').style.backgroundColor = `${badgecolor}`;
    document.getElementById('contact-badge').innerHTML = `${initials}`;
    document.getElementById('window-headline').innerHTML = `Edit contact`;
    document.getElementById('contact-input-name').value = `${name}`;
    document.getElementById('contact-input-email').value = `${email}`;
    document.getElementById('contact-input-phone').value = `${phone}`;
    setSlideInEffects();
}

/**
 * set slide in animation to the overlay window and darkening background
 */
function setSlideInEffects() {
    document.getElementById('overlay-window').classList.remove('d-none');
    removeSlideOutAnimation();
    document.getElementById('contact-slider').classList.add('slide-in-animation');
    document.getElementById('dark-background').classList.remove('d-none');
    setTimeout(setDarkBackground, 300);
}

/**
 * remove slide in animation and set slide out animation to the overlay window and lightening background
 */
function setSlideOutEffects() {
    removeSlideInAnimation();
    document.getElementById('contact-slider').classList.add('slide-out-animation');

    setTimeout(clearDarkBackground, 300);
    setTimeout(hideDarkBackground, 1000);

    if (window.innerWidth < 1200) {
        closeDetailsMenu();
    }
}

/**
 * darkening background
 */
function setDarkBackground() {
    removeFadeOutAnimation();
    document.getElementById('dark-background').classList.add('fade-in-animation');
}

/**
 * lightening background
 */
function clearDarkBackground() {
    removeFadeInAnimation();
    document.getElementById('dark-background').classList.add('fade-out-animation');
    document.getElementById('overlay-window').classList.add('d-none');
}

/**
 * hide nackground layer to avoid conflicts with it
 */
function hideDarkBackground() {
    document.getElementById('dark-background').classList.add('d-none');
}

/**
 * splice selected contact from array and save the array on fileserver
 * @param {number} i index of selected contact
 */
async function deleteContact(i) {
    userData[userIndex]['contacts'].splice(i, 1);
    syncContactsWithTasks();
    await setItem('userData', JSON.stringify(userData));
    document.getElementById('contact-details').innerHTML = ``;
    await initContacts();
    setSlideOutEffects();
}

/**
 * save amended user details on fileserver
 * @param {number} i index of selected contact
 */
async function saveEditContact(i) {
    let contact = userData[userIndex]['contacts'][i];

    contact['name'] = document.getElementById('contact-input-name').value;
    contact['email'] = document.getElementById('contact-input-email').value;
    contact['phone'] = document.getElementById('contact-input-phone').value;

    await setItem('userData', JSON.stringify(userData));
    setSlideOutEffects();
    initContacts();
    showContactDetails(i);
    setHighlight(i);
}

/**
 * set slide in animation in responsive design
 */
function openDetailsMenu() {
    document.getElementById('function-container').classList.remove('d-none');
    document.getElementById('click-background').classList.remove('d-none');
    removeFadeOutAnimation();
    removeSlideOutAnimation();
    removeMenuSlideOutAnimation();
    document.getElementById('function-container').classList.add('menu-slide-in-animation');
}

/**
 * set slide out animation in responsive design
 */
function closeDetailsMenu() {
    removeMenuSlideInAnimation();
    removeFadeOutAnimation();
    let functionMenu = document.querySelectorAll('function-container');
    functionMenu.forEach((element) => {
        element.classList.add('menu-slide-out-animation');
    });
    document.getElementById('click-background').classList.add('d-none');
    
    //Wird das wirklich benötigt???
    document.getElementById('function-container').classList.add('menu-slide-out-animation');
}

/**
 * check if any container got the slide in animation and remove it
 */
function removeSlideInAnimation() {
    let containers = document.querySelectorAll('.slide-in-animation');
    containers.forEach((element) => {
        element.classList.remove('slide-in-animation');
    });
}
/**
 * check if any container got the slide out animation and remove it
 */
function removeSlideOutAnimation() {
    let containers = document.querySelectorAll('.slide-out-animation');
    containers.forEach((element) => {
        element.classList.remove('slide-out-animation');
    });
}
/**
 * check if any container got the fade in animation and remove it
 */
function removeFadeInAnimation() {
    let containers = document.querySelectorAll('.fade-in-animation');
    containers.forEach((element) => {
        element.classList.remove('fade-in-animation');
    });
}
/**
 * check if any container got the fade out animation and remove it
 */
function removeFadeOutAnimation() {
    let containers = document.querySelectorAll('.fade-out-animation');
    containers.forEach((element) => {
        element.classList.remove('fade-out-animation');
    });
}
/**
 * check if any container got the menu slide in animation and remove it
 */
function removeMenuSlideInAnimation() {
    let containers = document.querySelectorAll('.menu-slide-in-animation');
    containers.forEach((element) => {
        element.classList.remove('menu-slide-in-animation');
    });
}
/**
 * check if any container got the menu slide out animation and remove it
 */
function removeMenuSlideOutAnimation() {
    let containers = document.querySelectorAll('.menu-slide-out-animation');
    containers.forEach((element) => {
        element.classList.remove('menu-slide-out-animation');
    });
}

/**
 * When a contact is deleted the tasks contacts will also be deleted
 */
function syncContactsWithTasks() {
    let allTasks = [...userData[userIndex].tasks];
    let allContacts = [...userData[userIndex].contacts];

    allTasks.forEach((task, taskIndex) => {
        let assignToArray = task.assignedTo;
        assignToArray.forEach((assignTo, assignedIndex) => {
            let found = 0;
            allContacts.forEach((contact) => {
                if (assignTo['name'] == contact['name']) {
                    found++;
                }
            });
            if (found == 0) {
                userData[userIndex].tasks[taskIndex].assignedTo.splice(assignedIndex, 1);
            }
        });
    });
}
