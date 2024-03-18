

let currentCardId = "";
let targetColumnName = "";
let columnsId = [
  "todo-card-container",
  "inProgress-card-container",
  "awaitFeedback-card-container",
  "done-card-container",
];
let labels = [
  "No task todo",
  "no task in progress",
  "no task await feedback",
  "no task done",
];

function initBoard() {
  tasks = userData[userIndex]["tasks"];
  renderAllCards();
  renderGhostCards();
  renderDetailCard(0);
}

function renderAllCards() {
  let columns = document.querySelectorAll(".card-container");
  for (let i = 0; i < columns.length; i++) {
    const element = columns[i];
    element.innerHTML = "";
    element.innerHTML += labelHTML(labels[i]);
  }

  for (let index = 0; index < tasks.length; index++) {
    let task = tasks[index];
    switch (task["status"]) {
      case "todo":
        renderCards(task, index, "todo_", "todo-card-container");
        break;
      case "inProgress":
        renderCards(task, index, "inProgress_", "inProgress-card-container");
        break;
      case "awaitFeedback":
        renderCards(
          task,
          index,
          "awaitFeedback_",
          "awaitFeedback-card-container"
        );
        break;
      case "done":
        renderCards(task, index, "done_", "done-card-container");
        break;
      default:
        break;
    }
  }
}

function calculateGhostCardPosition() {
  let container = document.getElementById("todo-card-container");
  let elements = container.querySelectorAll(".board-task-card");
  let lastElement = elements[1].getBoundingClientRect();
}

function renderGhostCards() {
  for (let index = 0; index < columnsId.length; index++) {
    const column = columnsId[index];
    document.getElementById(column).innerHTML += ghostCardHTML();
  }
  adjustGhostCardMargin();
  setLabelVisibity();
}

function renderCards(tasks, index, prefix, containerId) {
  let container = document.getElementById(containerId);
  let assignHTML = renderCardContacts(tasks);
  let color = getBadgeColor(tasks);
  let { total, finished, progress } = getSubtaskStatus(tasks);
  let prioHTML = priorityHTML(tasks["priority"]);
  container.innerHTML += cardHTML(
    tasks,
    index,
    color,
    prioHTML,
    assignHTML,
    total,
    finished,
    progress
  );
}

function renderDetailCard(index) {
  let container = document.getElementById("details-card-container");
  console.log(tasks);
  let assignHTML = renderDetailsCardContacts(tasks[index]);
  let color = getBadgeColor(tasks[index]);
  let prioHTML = priorityHTML(tasks[index]["priority"]);
  let subtasksHTML = "";
  let firstIndex = index;

  tasks[index]["subtasks"].forEach((subtask, index) => {
    subtasksHTML += subtaskStatusHTML(subtask, firstIndex, index);
  });

  container.innerHTML = "";
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
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  currentCardId = ev.target.id;
}

async function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
  let index = extractIndexFromId(currentCardId);
  let name = extractNameFromId(ev.currentTarget.id);
  await changeStatusOfTask(index, name);
  renderAllCards();
  renderGhostCards();
}

function extractIndexFromId(id) {
  let currentIndex = id.split("_");
  return currentIndex[1];
}

function extractNameFromId(id) {
  let currentName = id.split("-");
  return currentName[0];
}

async function changeStatusOfTask(index, status) {
  tasks[index]["status"] = status;
  await saveTask();
}

async function saveTask() {
  await setItem("userData", JSON.stringify(userData));
}

function getSubtaskStatus(task) {
  let totalSubtasks = task["subtasks"].length;
  let finishedSubtasks = 0;
  for (let index = 0; index < task["subtasks"].length; index++) {
    const subtask = task["subtasks"][index];
    if (subtask["done"]) {
      finishedSubtasks += 1;
    }
  }
  return {
    total: totalSubtasks,
    finished: finishedSubtasks,
    progress: (finishedSubtasks / totalSubtasks) * 100,
  };
}

function renderCardContacts(task) {
  let assignHTML = "";
  for (let i = 0; i < task["assignedTo"].length; i++) {
    const assignetTo = task["assignedTo"][i];
    assignHTML += assignedToHTML(assignetTo);
  }
  return assignHTML;
}

function renderDetailsCardContacts(task) {
  let assignHTML = "";
  for (let i = 0; i < task["assignedTo"].length; i++) {
    const assignetTo = task["assignedTo"][i];
    assignHTML += assignedToDetailsHTML(assignetTo);
  }
  return assignHTML;
}

function getBadgeColor(task) {
  return task["category"] == "User Story" ? "#0038ff" : "#1fd7c1";
}

function showGhostcard(event) {
  let ghostCard = document.querySelectorAll(".board-ghostCard");
  ghostCard.forEach((element) => {
    element.classList.add("show-ghostCard");
  });
}

function adjustGhostCardMargin() {
  for (let index = 0; index < columnsId.length; index++) {
    const columnId = columnsId[index];
    let column = document.getElementById(columnId);
    let cards = column.querySelectorAll(".board-task-card");
    let ghostCard = column.querySelector(".board-ghostCard");
    if (cards.length == 0) {
      ghostCard.classList.add("margin-55");
    }
  }
}

function setOutlineBlue(id) {
  document.getElementById(id).classList.add("blue-outline");
}
function clearOutlineBlue(id) {
  document.getElementById(id).classList.remove("blue-outline");
}

function setLabelVisibity() {
  for (let index = 0; index < columnsId.length; index++) {
    const columnId = columnsId[index];
    let column = document.getElementById(columnId);
    let cards = column.querySelectorAll(".board-task-card");
    let label = column.querySelector(".board-column-noTask");
    if (cards.length > 0) {
      label.classList.add("d-none");
    }
  }
}

function avoidGhostCard(event) {
  console.log(event.currentTarget);
  let card = event.currentTarget.querySelector(".board-ghostCard");
  if (card) {
    card.classList.add("remove-ghostCard");
  }
}

function rotateCard(event) {
  event.currentTarget.classList.add("card-rotate");
}

function openDetailCard(index) {
  let container = document.getElementById("board-overlay");
  container.classList.remove("d-none");
  renderDetailCard(index);
}
function closeDetailCardFromBg(event) {
  let container = document.getElementById("board-overlay");
  if (container.id == event.target.id) {
    container.classList.add("d-none");
  }
}

function closeDetailCard() {
  let container = document.getElementById("board-overlay");
  container.classList.add("d-none");
}

async function deleteTask(index) {
  tasks.splice(index, 1);
  await saveTask();
  closeDetailCard();
  renderAllCards();
}

async function toggleSubtaskStatus(firstIndex, index) {
  tasks[firstIndex]["subtasks"][index]["done"] =
    !tasks[firstIndex]["subtasks"][index]["done"];
  await saveTask();
  renderDetailCard(firstIndex);
  renderAllCards();
}

function switchEditTask(index) {
  let container = document.getElementById("details-card-container");
  container.innerHTML = "";
  let task = tasks[index];
  container.innerHTML = addTaskHTML(task, index);
  selectPrio(task["priority"]);
  getContactsFromUser();
  initContactCopy();
  setSelectedContacts(task);
}

function setSelectedContacts(task) {
  task["assignedTo"].forEach((contact) => {
    arrayOfFilterContact.forEach((filteredContact) => {
      if (contact["name"] == filteredContact["name"]) {
        filteredContact.selected = true;
      }
    });
  });
}
