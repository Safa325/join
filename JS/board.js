let currentCardId = '';
let targetColumnName = '';
let columnsId = ['todo-card-container', 'inProgress-card-container', 'awaitFeedback-card-container', 'done-card-container'];
let labels = ['No task todo', 'no task in progress', 'no task await feedback', 'no task done'];

function initBoard() {
  tasks = userData[userIndex]['tasks'];
  renderAllCards();
  renderGhostCards();
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
        renderCards(task, index, 'todo-card-container');
        break;
      case 'inProgress':
        renderCards(task, index, 'inProgress-card-container');
        break;
      case 'awaitFeedback':
        renderCards(task, index, 'awaitFeedback-card-container');
        break;
      case 'done':
        renderCards(task, index, 'done-card-container');
        break;
      default:
        break;
    }
  }
}

function renderGhostCards() {
  for (let index = 0; index < columnsId.length; index++) {
    const column = columnsId[index];
    document.getElementById(column).innerHTML += ghostCardHTML();
  }
  adjustGhostCardMargin();
  setLabelVisibity();
}

function renderCards(tasks, index, containerId) {
  let container = document.getElementById(containerId);
  let assignHTML = renderCardContacts(tasks);
  let color = getBadgeColor(tasks);
  let { total, finished, progress } = getSubtaskStatus(tasks);
  let progressHTML = progressbarHTML(total, finished, progress);
  let prioHTML = priorityHTML(tasks['priority']);
  container.innerHTML += cardHTML(tasks, index, color, prioHTML, assignHTML, progressHTML);
}

function renderDetailCard(index) {
  let container = document.getElementById('details-card-container');
  let assignHTML = renderDetailsCardContacts(tasks[index]);
  let color = getBadgeColor(tasks[index]);
  let prioHTML = priorityHTML(tasks[index]['priority']);
  let subtasksHTML = '';
  let firstIndex = index;

  tasks[index]['subtasks'].forEach((subtask, index) => {
    subtasksHTML += subtaskStatusHTML(subtask, firstIndex, index);
  });

  container.innerHTML = '';
  container.innerHTML = detailCardHTML(tasks[index], index, color, assignHTML, prioHTML, subtasksHTML);
}

// Drag & Drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
  currentCardId = ev.target.id;
}

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

function extractIndexFromId(id) {
  let currentIndex = id.split('_');
  return currentIndex[1];
}

function extractNameFromId(id) {
  let currentName = id.split('-');
  return currentName[0];
}

function changeStatusOfTask(index, status) {
  tasks[index]['status'] = status;
}

async function saveTask() {
  await setItem('userData', JSON.stringify(userData));
}

function getSubtaskStatus(task) {
  let totalSubtasks = task['subtasks'].length;
  let finishedSubtasks = 0;
  let progress = 0;
  for (let index = 0; index < task['subtasks'].length; index++) {
    const subtask = task['subtasks'][index];
    if (subtask['done']) {
      finishedSubtasks += 1;
    }
  }
  if (totalSubtasks > 0) {
    progress = (finishedSubtasks / totalSubtasks) * 100;
  }

  return {
    total: totalSubtasks,
    finished: finishedSubtasks,
    progress: progress,
  };
}

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
  let container = document.getElementById('board-overlay-details');
  container.classList.remove('d-none');
  let card = document.getElementById('details-card-container');
  card.classList.remove('card-slide-out-animation');
  card.classList.add('card-slide-in-animation');
  renderDetailCard(index);
}

function closeDetailCardFromBg(event) {
  let container = document.getElementById('board-overlay-details');
  let card = document.getElementById('details-card-container');
  if (container.id == event.target.id) {
    card.classList.remove('card-slide-in-animation');
    card.classList.add('card-slide-out-animation');

    setTimeout(() => {
      container.classList.add('d-none');
    }, 300);
  }
}

function closeDetailCard() {
  let container = document.getElementById('board-overlay-details');
  let card = document.getElementById('details-card-container');
  card.classList.remove('card-slide-in-animation');
  card.classList.add('card-slide-out-animation');
  setTimeout(() => {
    container.classList.add('d-none');
  }, 300);
}

async function deleteTask(index) {
  tasks.splice(index, 1);
  await saveTask();
  closeDetailCard();
  renderAllCards();
}

async function toggleSubtaskStatus(firstIndex, index) {
  tasks[firstIndex]['subtasks'][index]['done'] = !tasks[firstIndex]['subtasks'][index]['done'];
  await saveTask();
  renderDetailCard(firstIndex);
  renderAllCards();
}

function switchEditTask(index) {
  let container = document.getElementById('details-card-container');
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
  closeDetailCard();
  renderAllCards();
  renderGhostCards();
}

function findTask() {
  let input = document.getElementById('board-search').value;
  if (input.length > 0) {
    lowAllCardOpcatiy();
    input = input[0].toLowerCase() + input.slice(1);
    for (let index = 0; index < tasks.length; index++) {
      let title = tasks[index]['title'];
      title = title[0].toLowerCase() + title.slice(1);
      let subString = title.substring(0, input.length);
      if (subString == input) {
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
  openAddTaskCard();
  let container = document.getElementById('addTask-card-container');
  container.innerHTML = '';
  container.innerHTML = addTaskHTML();
  await addTaskInit();
  initialStatus = initStatus;
}

function openAddTaskCard() {
  let container = document.getElementById('board-overlay-addTask');
  container.classList.remove('d-none');
  let card = document.getElementById('addTask-card-container');
  card.classList.remove('card-slide-out-animation');
  card.classList.add('card-slide-in-animation');
}

function closeAddTaskFromBg(event) {
  let container = document.getElementById('board-overlay-addTask');
  let card = document.getElementById('addTask-card-container');
  if (container.id == event.target.id) {
    card.classList.remove('card-slide-in-animation');
    card.classList.add('card-slide-out-animation');

    setTimeout(() => {
      container.classList.add('d-none');
    }, 300);
  }
}

function closeAddTaskCard() {
  let container = document.getElementById('board-overlay-addTask');
  let card = document.getElementById('addTask-card-container');
  if (container != null && card != null) {
    card.classList.remove('card-slide-in-animation');
    card.classList.add('card-slide-out-animation');
    setTimeout(() => {
      container.classList.add('d-none');
    }, 300);
  }
}
