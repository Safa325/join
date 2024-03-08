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

let tasks = [];
let isContactSelected = [];
let priority = 'medium';
let category = '';
let subtasks = [];

function addTaskInit() {
    selectPrio(priority)
    initSelection()
    renderContacts()
    renderBadges()
    renderSubtasks()
}

function initSelection() {
    for (let index = 0; index < tempContacts.length; index++) {
        isContactSelected.push(false) //No selection     
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
    priority = prio;
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
    category = text;
    toggleDropdown('arrow-category', 'category-dropdown-container')

}

function renderContacts() {
    let container = document.getElementById('contact-dropdown-container');
    let svg, html = '';
    container.innerHTML = '';

    for (let index = 0; index < tempContacts.length; index++) {
        let contact = tempContacts[index];
        let selection = isContactSelected[index];
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
    for (let index = 0; index < isContactSelected.length; index++) {
        let selection = isContactSelected[index];
        if (selection) {
            html += badgesHTML(tempContacts[index])
        }
    }
    container.innerHTML = html;
}

function toggleContactSelection(index) {
    isContactSelected[index] = !isContactSelected[index];
    renderContacts()
    renderBadges()
}

function createTask(event) {
    let titleField = document.getElementById('addTask-input-title');
    let descriptionField = document.getElementById('addTask-input-description');
    let dateField = document.getElementById('addTask-input-date');
    let assignedContacts = [];
    for (let index = 0; index < isContactSelected.length; index++) {
        let selection = isContactSelected[index];
        if (selection) {
            assignedContacts.push(tempContacts[index])
        }
    }
    let task = {
        'title': titleField.value,
        'description': descriptionField.value,
        'assignedTo': assignedContacts,
        'priority': priority,
        'category': category,
        'dueDate': dateField.value,
        'subtasks': subtasks
    }
    tasks.push(task)
}

function createSubtask(){
    let subtask = document.getElementById('addTask-subtask-input').value;
    subtasks.push(subtask);
    renderSubtasks();
}

function renderSubtasks(){
    let container = document.getElementById('addTask-subtask-container');
   
    container.innerHTML = '';
    for (let index = 0; index < subtasks.length; index++) {
        const subtask = subtasks[index];
        container.innerHTML += subTaskHTML(subtask)
    }
}

function removePseudo(event){
    let element = event.target
    element.parentElement.classList.remove('dot-before')
}

function addPseudo(event){
    let element = event.target
    element.parentElement.classList.add('dot-before')
}

function subTaskHTML(subtask){
    return /*html*/`
        <div class="addTask-subtask-element dot-before">
        <input onblur="addPseudo(event)" onfocus="removePseudo(event)" class="addTask-subtask-listElement" type="text" value="${subtask}">
            <div class="subtask-icon subtask-edit">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.16667 22.3332H5.03333L16.5333 10.8332L14.6667 8.9665L3.16667 20.4665V22.3332ZM22.2333 8.89984L16.5667 3.29984L18.4333 1.43317C18.9444 0.922059 19.5722 0.666504 20.3167 0.666504C21.0611 0.666504 21.6889 0.922059 22.2 1.43317L24.0667 3.29984C24.5778 3.81095 24.8444 4.42761 24.8667 5.14984C24.8889 5.87206 24.6444 6.48873 24.1333 6.99984L22.2333 8.89984ZM20.3 10.8665L6.16667 24.9998H0.5V19.3332L14.6333 5.19984L20.3 10.8665Z"
                        fill="black" />
                </svg>
            </div>
            <div class="subtask-icon subtask-delete">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z"
                        fill="#2A3647" />
                </svg>
            </div>
        </div>
    `
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

