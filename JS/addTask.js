class Dropdown {
    constructor(buttonId, containerId) {
        this.buttonId = buttonId;
        this.containerId = containerId;
    }
    open() {
        const element = document.getElementById(this.buttonId);
        element.classList.add('arrow-up');

        const dropContainer = document.getElementById(this.containerId);
        dropContainer.classList.remove('d-none');
    }
    close() {
        const element = document.getElementById(this.buttonId);
        element.classList.remove('arrow-up');

        const dropContainer = document.getElementById(this.containerId);
        dropContainer.classList.add('d-none');
    }
    toggle() {
        const element = document.getElementById(this.buttonId);
        element.classList.toggle('arrow-up');

        const dropContainer = document.getElementById(this.containerId);
        dropContainer.classList.toggle('d-none');
    }
}

let initialStatus = 'todo';
let contacts = [];
let arrayOfContacts = [];
let arrayOfFilterContact = [];
let tasks = [];
let isContactSelected = [];
let priority = 'medium';
let category = '';
let subtasks = [];
let assignContainer;
let contactsDropdown = new Dropdown('arrow-contacts', 'contact-dropdown-container');
let categoryDropdown = new Dropdown('arrow-category', 'category-dropdown-container');

async function addTaskInit() {
    await getUserData();
    getContactsFromUser();
    initialStatus = 'todo';
    subtasks = [];
    initContactCopy();
    selectPrio(priority);
    renderContacts(arrayOfContacts);
    renderBadges();
    renderSubtasks();
}

/**
 * gets contacts of logged in user
 */
function getContactsFromUser() {
    let user = userData[userIndex];
    contacts = [...user.contacts];
}
/**
 * prepare an array for selection
 */
function initContactCopy() {
    arrayOfFilterContact = [...contacts];
    arrayOfFilterContact.forEach((element) => {
        element.selected = false;
    });
}

/**
 * start with keydown to filter the contacts
 */
function setFilter() {
    let inputName = document.getElementById('addTask-search-assign').value;
    if (inputName.length > 0) {
        inputName = inputName.toLowerCase();
        contactsDropdown.open();
    }
    filterArray(inputName);
    renderContacts();
}

/**
 * filter of contacts
 * @param {String} input
 */
function filterArray(input) {
    arrayOfFilterContact = [];

    for (let index = 0; index < contacts.length; index++) {
        let name = contacts[index]['name'];
        name = name.toLowerCase();
        let length = input.length;
        let subString = name.substring(0, length);
        if (subString == input) {
            arrayOfFilterContact.push(contacts[index]);
        }
    }
}

/**
 * selects the priority buttons and change classes
 * @param {String} prio
 */
function selectPrio(prio) {
    let containerUrgent = document.getElementById('addTask-prio-urgent');
    let containerMedium = document.getElementById('addTask-prio-medium');
    let containerLow = document.getElementById('addTask-prio-low');

    containerUrgent.classList.remove('selected');
    containerMedium.classList.remove('selected');
    containerLow.classList.remove('selected');
    priority = prio;
    if (prio == 'urgent') {
        containerUrgent.classList.add('selected');
    } else if (prio == 'medium') {
        containerMedium.classList.add('selected');
    } else {
        containerLow.classList.add('selected');
    }
}

/**
 * select category text from dropdown, close dropdown after selection
 * @param {Event} event
 */
function selectCategory(event) {
    let inputField = document.getElementById('addTask-category');
    let text;
    let element = event.target.querySelector('p');
    if (element == null) {
        text = event.target.innerHTML;
    } else {
        text = element.innerHTML;
    }
    inputField.value = text;
    category = text;
    categoryDropdown.toggle();
}

/**
 * prepare of render the (filtered) contacts to the dropdown field
 */
function renderContacts() {
    let container = document.getElementById('contact-dropdown-container');
    let svg,
        html = '';
    container.innerHTML = '';

    for (let index = 0; index < arrayOfFilterContact.length; index++) {
        let selection = arrayOfFilterContact[index]['selected'];
        let contactElementClass = selection ? 'contact-selected' : '';
        svg = contactCheckboxSvgHTML(selection);
        html += contactHTML(arrayOfFilterContact[index], contactElementClass, index, svg);
    }
    container.innerHTML = html;
}

/**
 * prepare of render of the selected contact badges
 */
function renderBadges() {
    let container = document.getElementById('contact-badges-container');
    let html;
    container.innerHTML, (html = '');
    for (let index = 0; index < arrayOfFilterContact.length; index++) {
        let selection = arrayOfFilterContact[index]['selected'];
        if (selection) {
            html += badgesHTML(arrayOfFilterContact[index]);
        }
    }
    container.innerHTML = html;
}

/**
 * toggles selected contacts
 * @param {Number} index
 */
function toggleContactSelection(index) {
    arrayOfFilterContact[index]['selected'] = !arrayOfFilterContact[index]['selected'];
    renderContacts();
    renderBadges();
}

/**
 * create task only on click of create button, set task object and push to array
 * clear all formfields, reset priority
 * @param {Event} event
 */
async function createTask(event) {
    event.preventDefault();
    let titleField = document.getElementById('addTask-input-title');
    let descriptionField = document.getElementById('addTask-input-description');
    let dateField = document.getElementById('addTask-input-date');
    let assignedContacts = [];
    for (let index = 0; index < arrayOfFilterContact.length; index++) {
        let selection = arrayOfFilterContact[index]['selected'];
        if (selection) {
            assignedContacts.push(arrayOfFilterContact[index]);
        }
    }

    let task = {
        title: titleField.value,
        description: descriptionField.value,
        assignedTo: assignedContacts,
        priority: priority,
        category: category,
        dueDate: dateField.value,
        status: initialStatus,
        subtasks: subtasks,
    };
    sliedeOutPopupCard();
    userData[userIndex]['tasks'].push(task);
    await setItem('userData', JSON.stringify(userData));
    titleField.value = descriptionField.value = dateField.value = '';
    subtasks = [];
    renderSubtasks();
    selectPrio('medium');
    confirmNewTask();
    setTimeout(() => {
        initBoardHTML();
    }, 2000);
}

/**
 * Button "Clear" deletes all temporary subtasks and render them.
 */
function clearForm() {
    subtasks = [];
    renderSubtasks();
}

/**
 * create subtask object, push to array, clear inputfield
 */
function createSubtask() {
    let subtaskText = document.getElementById('addTask-subtask-input');
    let subtask = [];
    if (subtaskText.value) {
        subtask = {
            title: subtaskText.value,
            done: false,
        };
        subtasks.push(subtask);
    }
    renderSubtasks();
    subtaskText.value = '';
    disableSubtaskInput();
}
