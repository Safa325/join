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
 * by click at outside of the dropdown area the dropdown closes
 */
document.addEventListener('click', function (e) {
  assignContainer = document.getElementById('addTask-assigned');
  if (assignContainer != null) {
    var rect = assignContainer.getBoundingClientRect();
    let bottom = rect.bottom + 250;
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > bottom) {
      contactsDropdown.close();
    }
  }
});

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
 * select category text from dropdown, close dropdown
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
 * prepare of render of the selected badges
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
  userData[userIndex]['tasks'].push(task);
  await setItem('userData', JSON.stringify(userData));
  titleField.value = descriptionField.value = dateField.value = '';
  subtasks = [];
  renderSubtasks();
  selectPrio('medium');

  await initBoardHTML();
  // closeAddTaskCard();
}

/**
 * create subtask object, push to array, clear inputfield
 */
function createSubtask() {
  let subtaskText = document.getElementById('addTask-subtask-input');
  console.log(subtaskText.value);
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

/**
 * enable input field of subtask, only with doubleclick in html code
 */
function enableSubtaskInput() {
  let input = document.getElementById('addTask-subtask-input');
  input.readOnly = false;
  input.classList.add('inputField-enabled');
  input.focus();
  document.getElementById('addTask-button-plus').classList.add('d-none');
  document.getElementById('addTask-delete-accept-container').classList.remove('d-none');
}

/**
 * disable input field of subtask, after loosing focus
 */
function disableSubtaskInput() {
  let input = document.getElementById('addTask-subtask-input');
  input.readOnly = true;
  input.classList.remove('inputField-enabled');
  input.value = '';
  document.getElementById('addTask-button-plus').classList.remove('d-none');
  document.getElementById('addTask-delete-accept-container').classList.add('d-none');
}

function disableSubtaskInputDelayed() {
  setTimeout(() => {
    disableSubtaskInput();
  }, 500);
}

function enableEditSubtask(event, index) {
  event.preventDefault();
  removePseudo(index);
  let input = document.getElementById(`addTask-subtask-listElement-input_${index}`);
  input.readOnly = false;
  input.classList.add('inputField-enabled');
  input.focus();

  document.getElementById(`subtask-edit_${index}`).classList.add('d-none');
  document.getElementById(`subtask-accept_${index}`).classList.remove('d-none');
}

function disableEditSubtask(index) {
  let input = document.getElementById(`addTask-subtask-listElement-input_${index}`);
  // input.readOnly = true;
  addPseudo(index);
  input.classList.remove('inputField-enabled');
  document.getElementById(`subtask-edit_${index}`).classList.remove('d-none');
  document.getElementById(`subtask-accept_${index}`).classList.add('d-none');
}

function editSubtask(event, index) {
  event.preventDefault();
  let input = document.getElementById(`addTask-subtask-listElement-input_${index}`);
  subtasks.splice(index, 1, input.value);
}

window.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    indirectDisableEditSubtask();
  }
});

function indirectDisableEditSubtask() {
  let elements = document.querySelectorAll('.addTask-subtask-listElement');
  elements.forEach((element, index) => {
    disableEditSubtask(index);
  });
}

function createTaskEnter(event) {
  if (event.key === 'Enter') {
    createSubtask();
    event.preventDefault();
  }
}

function editSubtaskPreventEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

function indirectCreateSubtask() {
  let activeElement = this.document.activeElement;
  let subtask = document.getElementById('addTask-subtask-input');
  if (activeElement == subtask) {
    createSubtask();
  }
}

function deleteSubtask(index) {
  subtasks.splice(index, 1);
  renderSubtasks();
}

function renderSubtasks() {
  let container = document.getElementById('addTask-subtask-container');

  container.innerHTML = '';
  for (let index = 0; index < subtasks.length; index++) {
    const subtask = subtasks[index];
    console.log(subtask);
    container.innerHTML += subTaskHTML(subtask, index);
  }
}

function removePseudo(index) {
  let subtaskElement = document.getElementById(`addTask-subtask-element_${index}`);
  subtaskElement.classList.remove('dot-before');
  subtaskElement.classList.add('subtask-element-selected');
}

function addPseudo(index) {
  let subtaskElement = document.getElementById(`addTask-subtask-element_${index}`);
  subtaskElement.classList.add('dot-before');
  subtaskElement.classList.remove('subtask-element-selected');

  let input = document.getElementById(`addTask-subtask-listElement-input_${index}`);
  input.readOnly = true;
}

function setOutlineBlue(id) {
  document.getElementById(id).classList.add('blue-outline');
}
function clearOutlineBlue(id) {
  document.getElementById(id).classList.remove('blue-outline');
}
