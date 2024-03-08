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

let tempContacts = [
    {
        'badgecolor': "#FF7A00",
        'initials': "PN",
        'name': "Pia Nist",
        'email': "PiaNist@mitherz.com"
    },
    {
        'badgecolor': "#FF5EB3",
        'initials': "RS",
        'name': "Rainer Sonnenschein",
        'email': "gutes@wetter.de"
    },
    {
        'badgecolor': "#6E52FF",
        'initials': "KH",
        'name': "Klara Himmel",
        'email': "bitte@sommer.com"
    },
    {
        'badgecolor': "#6E52FF",
        'initials': "KE",
        'name': "Karl Ender",
        'email': "Karl@ender.com"
    },
]

let tasks = []
let contactsSelected = []

function addTaskInit() {

    initSelection()
    renderContacts()
    renderBadges()
}

function initSelection() {
    for (let index = 0; index < tempContacts.length; index++) {
        contactsSelected.push(false) //No selection     
    }
}

function toggleDropdown(id, dropdown) {
    let element = document.getElementById(id)
    element.classList.toggle('arrow-up')

    let dropContainer = document.getElementById(dropdown);
    dropContainer.classList.toggle('d-none')

}


function selectPrio(prio) {
    let containerUrgent = document.getElementById('addTask-prio-urgent');
    let containerMedium = document.getElementById('addTask-prio-medium');
    let containerLow = document.getElementById('addTask-prio-low');

    containerUrgent.classList.remove('selected')
    containerMedium.classList.remove('selected')
    containerLow.classList.remove('selected')

    if (prio == 'urgent') {
        containerUrgent.classList.add('selected')
    } else if (prio == 'medium') {
        containerMedium.classList.add('selected')
    }
    else {
        containerLow.classList.add('selected')
    }
}

function selectCategory(event) {
    let inputField = document.getElementById('addTask-category')
    let text;
    let element = event.target.querySelector("p")
    if (element == null) {
        text = event.target.innerHTML;
    } else {
        text = element.innerHTML;
    }
    inputField.value = text;

    toggleDropdown('arrow-category', 'category-dropdown-container')

}

function renderContacts() {
    let container = document.getElementById('contact-dropdown-container');
    let svg, html = '';
    container.innerHTML = '';

    for (let index = 0; index < tempContacts.length; index++) {
        let contact = tempContacts[index];
        let selection = contactsSelected[index];
        let contactElementClass = selection ? 'contact-selected' : '';
        svg = contactCheckboxSvgHTML(selection)
        html += contactHTML(contact, contactElementClass, index, svg)
    }
    container.innerHTML = html;
};

function renderBadges() {
    let container = document.getElementById('contact-badges-container');
    let html;
    container.innerHTML, html = '';
    for (let index = 0; index < contactsSelected.length; index++) {
        let selection = contactsSelected[index];
        if (selection) {
            html += badgesHTML(tempContacts[index])
        }
    }
    container.innerHTML = html;
}

function toggleContactSelection(index) {
    contactsSelected[index] = !contactsSelected[index];
    renderContacts()
    renderBadges()
}


// HTML-Snippets
function contactHTML(contact, contactElementClass, index, svg) {
    return /*html*/`
        <div onclick="toggleContactSelection(${index})" id="contact-element_${index}" class="contact-element ${contactElementClass}">
            <div class="addTask-profile-badge" style="background-color: ${contact['badgecolor']}">${contact['initials']}</div>
            <p class="addTask-dropdown-text">${contact['name']}</p>
            ${svg}
        </div>`
}

function badgesHTML(contact) {
    return /*html*/`
        <div class="addTask-profile-badge" style="background-color: ${contact['badgecolor']}">${contact['initials']}</div>
    `
}


function contactCheckboxSvgHTML(value) {
    let html = '';
    if (value) {
        html = /*html*/`    
                <svg class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12"
                stroke="white" stroke-width="2" stroke-linecap="round" />
                <path d="M5 9.96582L9 13.9658L17 2.46582" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
                </svg>`
    } else {
        html = /*html*/`
                <svg class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>`
    }
    return html
}

