let currentCardId = '';
let targetColumnName = '';
let columnsId = [
  'todo-card-container',
  'inProgress-card-container',
  'awaitFeedback-card-container',
  'done-card-container',
];
let labels = ['No task todo', 'no task in progress', 'no task await feedback', 'no task done'];

function initBoard() {
  tasks = userData[userIndex]['tasks'];
  renderAllCards();
  renderGhostCards();
  document.body.classList.remove('stop-scrolling');
  selectCardIsDraggable();
}

/**
 * render Cards and sort by columns based on status
 */
function renderAllCards() {
  let columns = document.querySelectorAll('.card-container');
  for (let i = 0; i < columns.length; i++) {
    const element = columns[i];
    element.innerHTML = '';
    element.innerHTML += labelHTML(labels[i]);
  }

  for (let index = 0; index < tasks.length; index++) {
    let task = tasks[index];
    switch (task['status']) {
      case 'todo':
        renderCard(task, index, 'todo-card-container');
        break;
      case 'inProgress':
        renderCard(task, index, 'inProgress-card-container');
        break;
      case 'awaitFeedback':
        renderCard(task, index, 'awaitFeedback-card-container');
        break;
      case 'done':
        renderCard(task, index, 'done-card-container');
        break;
      default:
        break;
    }
  }
}

/**
 * render ghost Cards to all columns
 */
function renderGhostCards() {
  for (let index = 0; index < columnsId.length; index++) {
    const column = columnsId[index];
    document.getElementById(column).innerHTML += ghostCardHTML();
  }
  adjustGhostCardMargin();
  setLabelVisibity();
}

/**
 * render a single task card
 * @param {Array} tasks
 * @param {Number} index
 * @param {String} containerId
 */
function renderCard(tasks, index, containerId) {
  let container = document.getElementById(containerId);
  let assignHTML = renderCardContacts(tasks);
  let color = getBadgeColor(tasks);
  let { total, finished, progress } = getSubtaskStatus(tasks);
  let progressHTML = progressbarHTML(total, finished, progress);
  let prioHTML = priorityHTML(tasks['priority']);
  container.innerHTML += cardHTML(tasks, index, color, prioHTML, assignHTML, progressHTML);
}
/**
 * render a detail task card of selected task
 * @param {Number} index
 */
function renderDetailCard(index) {
  let container = document.getElementById('popup-card-container');
  let assignHTML = renderDetailsCardContacts(tasks[index]);
  let color = getBadgeColor(tasks[index]);
  let prioHTML = priorityHTML(tasks[index]['priority']);
  let subtasksHTML = '';
  let firstIndex = index;
  tasks[index]['subtasks'].forEach((subtask, index) => {
    subtasksHTML += subtaskStatusHTML(subtask, firstIndex, index);
  });
  container.innerHTML = '';
  container.innerHTML = detailCardHTML(
    tasks[index],
    index,
    color,
    assignHTML,
    prioHTML,
    subtasksHTML
  );
}

// Drag & Drop
/**
 * By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element.
 * @param {Event} ev
 */
function allowDrop(ev) {
  ev.preventDefault();
}
/**
 * Specify what should happen when the element is dragged.
 * The dataTransfer.setData() method sets the data type and the value of the dragged data:
 * @param {Event} ev
 */
function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
  currentCardId = ev.target.id;
}

/**
 * When a card dropped, a drop event occurs.
 * Get index and name of dropped card then change the status of the task where the card is dropped.
 * Render all cards and ghostcard. Save all tasks to server
 * @param {Event} ev
 */
async function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  ev.currentTarget.appendChild(document.getElementById(data));
  let index = extractIndexFromId(currentCardId);
  let name = extractNameFromId(ev.currentTarget.id);
  changeStatusOfTask(index, name);
  renderAllCards();
  renderGhostCards();
  await saveTask();
}
/**
 * Get index of id separated by "_"
 * @param {String} id
 * @returns {Number}
 */
function extractIndexFromId(id) {
  let currentIndex = id.split('_');
  return currentIndex[1];
}
/**
 * Get name of id separated by "-"
 * @param {String} id
 * @returns {String}
 */
function extractNameFromId(id) {
  let currentName = id.split('-');
  return currentName[0];
}
/**
 * Change the status of the task where the card is dropped.
 * @param {Number} index
 * @param {String} status
 */
function changeStatusOfTask(index, status) {
  tasks[index]['status'] = status;
}
/**
 * Save the task to server.
 */
async function saveTask() {
  await setItem('userData', JSON.stringify(userData));
}

/**
 * Status of subtasks. Count of total subtasks and finished subtask. Calculates the progress for progressbar.
 * @param {Object} task
 * @returns {total, finished, progress}
 */
function getSubtaskStatus(task) {
  let totalSubtasks = task['subtasks'].length;
  let finishedSubtasks = 0;
  for (let index = 0; index < task['subtasks'].length; index++) {
    const subtask = task['subtasks'][index];
    if (subtask['done']) {
      finishedSubtasks += 1;
    }
  }
  let progress = totalSubtasks > 0 ? (finishedSubtasks / totalSubtasks) * 100 : 0;
  return {
    total: totalSubtasks,
    finished: finishedSubtasks,
    progress: progress,
  };
}

/**
 * Render of all contacts where the actual task is assigned to.
 * @param {Object} task
 * @returns {HTMLElement}
 */
function renderCardContacts(task) {
  let assignHTML = '';
  for (let i = 0; i < task['assignedTo'].length; i++) {
    const assignetTo = task['assignedTo'][i];
    assignHTML += assignedToHTML(assignetTo);
  }
  return assignHTML;
}

function renderDetailsCardContacts(task) {
  let assignHTML = '';
  for (let i = 0; i < task['assignedTo'].length; i++) {
    const assignetTo = task['assignedTo'][i];
    assignHTML += assignedToDetailsHTML(assignetTo);
  }
  return assignHTML;
}

function getBadgeColor(task) {
  return task['category'] == 'User Story' ? '#0038ff' : '#1fd7c1';
}

function showGhostcard() {
  let ghostCard = document.querySelectorAll('.board-ghostCard');
  ghostCard.forEach((element) => {
    element.classList.add('show-ghostCard');
  });
}

function adjustGhostCardMargin() {
  for (let index = 0; index < columnsId.length; index++) {
    const columnId = columnsId[index];
    let column = document.getElementById(columnId);
    let cards = column.querySelectorAll('.board-task-card');
    let ghostCard = column.querySelector('.board-ghostCard');
    if (cards.length == 0) {
      ghostCard.classList.add('margin-55');
    }
  }
}

function setOutlineBlue(id) {
  document.getElementById(id).classList.add('blue-outline');
}
function clearOutlineBlue(id) {
  document.getElementById(id).classList.remove('blue-outline');
}

function setLabelVisibity() {
  for (let index = 0; index < columnsId.length; index++) {
    const columnId = columnsId[index];
    let column = document.getElementById(columnId);
    let cards = column.querySelectorAll('.board-task-card');
    let label = column.querySelector('.board-column-noTask');
    if (cards.length > 0) {
      label.classList.add('d-none');
    }
  }
}

function avoidGhostCard(event) {
  console.log(event.currentTarget);
  let card = event.currentTarget.querySelector('.board-ghostCard');
  if (card) {
    card.classList.add('remove-ghostCard');
  }
}

function rotateCard(event) {
  event.currentTarget.classList.add('card-rotate');
}

function openDetailCard(index) {
  renderPopupCard();
  slideInPopupCard();
  renderDetailCard(index);
}

async function deleteTask(index) {
  tasks.splice(index, 1);
  await saveTask();
  sliedeOutPopupCard();
  renderAllCards();
}

async function toggleSubtaskStatus(firstIndex, index) {
  tasks[firstIndex]['subtasks'][index]['done'] = !tasks[firstIndex]['subtasks'][index]['done'];
  await saveTask();
  renderDetailCard(firstIndex);
  renderAllCards();
}

function switchEditTask(index) {
  let container = document.getElementById('popup-card-container');
  container.innerHTML = '';
  let task = tasks[index];
  container.innerHTML = addTaskHTML(task);
  document.getElementById('addTask-column-wrapper').classList.add('popup');

  initEditTaskFields(task);
  selectPrio(task['priority']);
  getContactsFromUser();
  initContactCopy();
  setSelectedContacts(task);
  renderContacts();
  renderBadges();
  subtasks = [...task['subtasks']];
  renderSubtasks();
  adjustFormWhenEdit(index);
}

function initEditTaskFields(task) {
  document.getElementById('addTask-input-title').value = task['title'];
  document.getElementById('addTask-input-description').innerText = task['description'];
  document.getElementById('addTask-input-date').value = task['dueDate'];
  document.getElementById('addTask-category').value = task['category'];
}

function adjustFormWhenEdit(index) {
  changeSubmitButtonText();
  disableCancelButton();
  changeFormSubmitBehaviour(index);
}

function setSelectedContacts(task) {
  task['assignedTo'].forEach((contact) => {
    arrayOfFilterContact.forEach((filteredContact) => {
      if (contact['name'] == filteredContact['name']) {
        filteredContact.selected = true;
      }
    });
  });
}

function changeSubmitButtonText() {
  let button = document.getElementById('addTask-submit-btn');
  button.innerHTML = /*html*/ `
        Ok
        <svg
          class="create-svg"
          width="38"
          height="30"
          viewBox="0 0 38 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.02832 15.0001L15.2571 26.0662L33.9717 3.93408"
            stroke="white"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
  `;
}

function disableCancelButton() {
  let button = document.getElementById('addTask-cancel-btn');
  button.style = 'display: none;';
}

function changeFormSubmitBehaviour(index) {
  let form = document.getElementById('addTask-form');
  form.setAttribute('onsubmit', `editTaskSubmit(${index}); return false;`);
}

async function editTaskSubmit(index) {
  let status = tasks[index]['status'];
  let titleField = document.getElementById('addTask-input-title');
  let descriptionField = document.getElementById('addTask-input-description');
  let tempcategory = document.getElementById('addTask-category').value;
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
    category: tempcategory,
    dueDate: dateField.value,
    status: status,
    subtasks: subtasks,
  };
  userData[userIndex]['tasks'][index] = task;
  await saveTask();
  sliedeOutPopupCard();
  renderAllCards();
  renderGhostCards();
}

function findTask() {
  let input = document.getElementById('board-search').value;
  if (input.length > 0) {
    lowAllCardOpcatiy();
    input = input.toLowerCase();
    for (let index = 0; index < tasks.length; index++) {
      let title = tasks[index]['title'].toLowerCase();
      let description = tasks[index]['description'].toLowerCase();
      if (title.includes(input) || description.includes(input)) {
        setCardOpacity(index);
      }
    }
  } else {
    resetAllCardOpacity();
  }
}

function setCardOpacity(index) {
  let cards = document.querySelectorAll('[data-id]');
  cards.forEach((card) => {
    let attr = card.getAttribute('data-id');
    if (attr == index) {
      card.style = 'opacity: 1';
    }
  });
}
function resetAllCardOpacity() {
  let cards = document.querySelectorAll('[data-id]');
  cards.forEach((card) => {
    card.style = 'opacity: 1';
  });
}

function lowAllCardOpcatiy() {
  let cards = document.querySelectorAll('[data-id]');
  cards.forEach((card) => {
    card.style = 'opacity: 0.3';
  });
}

async function openAddTaskPopup(initStatus) {
  renderPopupCard();
  // openAddTaskCard();
  slideInPopupCard();
  let container = document.getElementById('popup-card-container');
  container.innerHTML = '';
  container.innerHTML = addTaskHTML();
  await addTaskInit();
  initialStatus = initStatus;
}

function renderPopupCard() {
  let container = document.getElementById('board-overlay-details');
  container.innerHTML = /*html*/ `
     <div id="popup-card-container" class="popup-card-container"></div>
  `;
}

function slideInPopupCard() {
  let container = document.getElementById('board-overlay-details');
  container.classList.remove('d-none');
  let card = document.getElementById('popup-card-container');
  card.classList.remove('card-slide-out-animation');

  card.classList.add('card-slide-in-animation');
  document.body.classList.add('stop-scrolling');
}

function sliedeOutPopupCard() {
  let container = document.getElementById('board-overlay-details');
  let card = document.getElementById('popup-card-container');
  if (container != null && card != null) {
    card.classList.remove('card-slide-in-animation');
    card.classList.add('card-slide-out-animation');
    subtasks = [];
    setTimeout(() => {
      container.classList.add('d-none');
      card.classList.add('d-none');
      document.body.classList.remove('stop-scrolling');
    }, 300);
  }
}

function slideOutPopupFromBg(event) {
  let container = document.getElementById('board-overlay-details');
  let card = document.getElementById('popup-card-container');
  if (container.id == event.target.id) {
    card.classList.remove('card-slide-in-animation');
    card.classList.add('card-slide-out-animation');
    subtasks = [];
    setTimeout(() => {
      container.classList.add('d-none');
      document.body.classList.remove('stop-scrolling');
    }, 300);
  }
}

window.addEventListener('resize', function () {
  console.log('rezice');
  selectCardIsDraggable();
});

function selectCardIsDraggable() {
  let card = document.querySelectorAll('.board-task-card');
  if (card.length > 0) {
    if (window.innerWidth < 1150) {
      card.forEach((element) => {
        element.setAttribute('draggable', 'false');
      });
    } else {
      card.forEach((element) => {
        element.setAttribute('draggable', 'true');
      });
    }
  }
}

function openCardMoveMenu(event, index) {
  event.stopPropagation();

  renderPopupCard();
  slideInPopupCard();
  let container = document.getElementById('popup-card-container');
  container.innerHTML = '';
  container.innerHTML = moveCardHTML(index);
}

function moveCardTo(index, value) {
  var form = document.getElementById('form-moveTo');

  var radVal = form.fav_language.value;

  changeStatusOfTask(index, radVal);
  sliedeOutPopupCard();
  renderAllCards();
  console.log(radVal);
}
