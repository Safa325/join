let tasksRP = [
  {
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
    assignedTo: [
      {
        badgecolor: "#FF7A00",
        initials: "CG",
        register: "C",
        name: "Claire Grube",
        email: "cgrube@mail.de",
        phone: "+49 40 276 5436",
      },
      {
        badgecolor: "#FF5EB3",
        initials: "VP",
        register: "V",
        name: "Volker Putt",
        email: "volkerputt@yahoo.com",
        phone: "+49 30 2589963",
      },
    ],
    priority: "low",
    category: "Technical Task",
    dueDate: "2024-03-12",
    status: "done",
    subtasks: [
      {
        title: "Implement Recipe Recommondation",
        done: true,
      },
      {
        title: "Start Page Layout",
        done: false,
      },
      {
        title: "Push to Git",
        done: false,
      },
    ],
  },
  {
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
    assignedTo: [
      {
        badgecolor: "#FC71FF",
        initials: "CG",
        register: "C",
        name: "Claire Grube",
        email: "cgrube@mail.de",
        phone: "+49 40 276 5436",
      },
      {
        badgecolor: "#FF5EB3",
        initials: "VP",
        register: "V",
        name: "Volker Putt",
        email: "volkerputt@yahoo.com",
        phone: "+49 30 2589963",
      },
    ],
    priority: "medium",
    category: "User Story",
    dueDate: "2024-03-12",
    status: "todo",
    subtasks: [
      {
        title: "Implement Recipe Recommondation",
        done: true,
      },
      {
        title: "Start Page Layout",
        done: false,
      },
    ],
  },

  {
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
    assignedTo: [
      {
        badgecolor: "#FC71FF",
        initials: "CG",
        register: "C",
        name: "Claire Grube",
        email: "cgrube@mail.de",
        phone: "+49 40 276 5436",
      },
      {
        badgecolor: "#FF5EB3",
        initials: "VP",
        register: "V",
        name: "Volker Putt",
        email: "volkerputt@yahoo.com",
        phone: "+49 30 2589963",
      },
    ],
    priority: "medium",
    category: "User Story",
    dueDate: "2024-03-12",
    status: "todo",
    subtasks: [
      {
        title: "Implement Recipe Recommondation",
        done: true,
      },
      {
        title: "Start Page Layout",
        done: false,
      },
    ],
  },
];

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

  for (let index = 0; index < tasksRP.length; index++) {
    let task = tasksRP[index];
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
  let assignHTML = renderDetailsCardContacts(tasksRP[index]);
  let color = getBadgeColor(tasksRP[index]);
  let prioHTML = priorityHTML(tasksRP[index]["priority"]);
  let subtasksHTML = "";
  let firstIndex = index;

  tasksRP[index]["subtasks"].forEach((subtask, index) => {
    subtasksHTML += subtaskStatusHTML(subtask, firstIndex, index);
  });
  console.log(tasksRP[index]["subtasks"]);
  // console.log(subtasks);

  container.innerHTML = "";
  container.innerHTML = detailCardHTML(
    tasksRP[0],
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

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
  let index = extractIndexFromId(currentCardId);
  let name = extractNameFromId(ev.currentTarget.id);
  changeStatusOfTask(index, name);
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

function changeStatusOfTask(index, status) {
  tasksRP[index]["status"] = status;
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
  if(card){
    card.classList.add("remove-ghostCard");
  }
 
}

function rotateCard(event) {
  event.currentTarget.classList.add("card-rotate");
}

function priorityHTML(priority) {
  if (priority == "urgent") {
    return /*html*/ `
             <svg class="board-task-priority " width="17" height="17" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M32.8709 25.1626C32.4699 25.1633 32.0792 25.0337 31.7563 24.7929L17.6511 14.263L3.54584 24.7929C3.34781 24.941 3.1229 25.0482 2.88394 25.1084C2.64497 25.1685 2.39664 25.1805 2.15312 25.1435C1.9096 25.1066 1.67566 25.0214 1.46465 24.893C1.25365 24.7645 1.06971 24.5953 0.923347 24.3949C0.776981 24.1945 0.671052 23.9669 0.611608 23.7251C0.552165 23.4832 0.54037 23.2319 0.576898 22.9855C0.65067 22.4878 0.916792 22.0402 1.31672 21.7411L16.5365 10.3677C16.8591 10.126 17.2498 9.99561 17.6511 9.99561C18.0524 9.99561 18.4431 10.126 18.7657 10.3677L33.9855 21.7411C34.3033 21.9781 34.5389 22.3106 34.6588 22.6912C34.7788 23.0718 34.7768 23.481 34.6532 23.8604C34.5296 24.2398 34.2907 24.57 33.9706 24.8039C33.6506 25.0377 33.2657 25.1633 32.8709 25.1626Z"
                    fill="#ff3d00" />
                <path
                d="M32.8708 15.2109C32.4697 15.2116 32.0791 15.082 31.7562 14.8413L17.651 4.31139L3.54572 14.8413C3.1458 15.1404 2.64482 15.2665 2.15301 15.1919C1.6612 15.1172 1.21883 14.8479 0.923233 14.4432C0.627633 14.0385 0.503012 13.5315 0.576784 13.0339C0.650556 12.5362 0.916678 12.0885 1.31661 11.7894L16.5364 0.415997C16.859 0.174366 17.2497 0.0439453 17.651 0.0439453C18.0523 0.0439453 18.443 0.174366 18.7655 0.415997L33.9854 11.7894C34.3031 12.0264 34.5388 12.359 34.6587 12.7396C34.7786 13.1202 34.7767 13.5294 34.6531 13.9088C34.5295 14.2882 34.2906 14.6184 33.9705 14.8522C33.6505 15.0861 33.2656 15.2116 32.8708 15.2109Z"
                fill="#ff3d00" />
            </svg>
        `;
  }
  if (priority == "medium") {
    return /*html*/ `
             <svg class="board-task-priority" width="17" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
                    fill="#FFA800" />
                <path
                    d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
                    fill="#FFA800" />
            </svg>
        `;
  } else {
    return /*html*/ `
             <svg class="board-task-priority" width="17" height="17" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
                    fill="#7AE229" />
                <path
                    d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
                    fill="#7AE229" />
            </svg>
        `;
  }
}

function assignedToHTML(assignedTo) {
  return /*html*/ `
         <div class="board-task-profile-badge" style="background-color: ${assignedTo["badgecolor"]}">${assignedTo["initials"]}</div>
    `;
}

function assignedToDetailsHTML(assignedTo) {
  return /*html*/ `
    <div class="details-badge-container">
        <div class="details-profile-badge" style="background-color: ${assignedTo["badgecolor"]}">
            ${assignedTo["initials"]}
        </div>
      ${assignedTo["name"]}
    </div>   
    `;
}

function cardHTML(
  task,
  index,
  color,
  prioHTML,
  assignHTML,
  totalSubtasks,
  finishedSubtasks,
  progress
) {
  return /*html*/ `
         <div draggable='true' onclick="openDetailCard(${index})" ondragstart="drag(event); rotateCard(event)" id="card_${index}" class="board-task-card">
            <p class="board-task-category" style="background-color: ${color}">${task["category"]}</p>
            <h6 class="board-task-title">${task["title"]}</h6>
            <p class="board-task-description">${task["description"]}</p>

            <div class="board-task-progress">
                <div class="board-task-progressbar">
                    <div class="board-task-progress-inner" style="width: ${progress}%">
                    </div>
                </div>
                <p>${finishedSubtasks}/${totalSubtasks} Subtasks</p>
            </div>
            <div class="board-task-footer">
                <div class="board-task-profile-badge-container">
                    ${assignHTML}
                </div>
                <div class="board-task-priority-container">               
                ${prioHTML}
                </div>
            </div>
        </div>
    `;
}

function openDetailCard(index) {
  let container = document.getElementById("board-overlay");
  container.classList.remove("d-none");
  renderDetailCard(index);
}
function closeDetailCard(event) {
  event.stopPropagation();
  let container = document.getElementById("board-overlay");
  if (container.id == event.target.id || event.target.id == 'close-detail-card') {
    container.classList.add("d-none");
  }
}

function detailCardHTML(task, color, assignHTML, prioHTML, subtasks) {
  return /*html*/ `
      <div class="board-task-detail-header">
          <p class="board-task-category detail-card-category" style="background-color: ${color}">${task["category"]}</p>
          <svg id="close-detail-card" onclick="closeDetailCard(event)" class="board-task-detail-close" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
          d="M6.24953 7.00008L11.4925 12.2431M1.00653 12.2431L6.24953 7.00008L1.00653 12.2431ZM11.4925 1.75708L6.24853 7.00008L11.4925 1.75708ZM6.24853 7.00008L1.00653 1.75708L6.24853 7.00008Z"
          stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
      </div>
         
      <h6 class="board-task-title detail-card-title">${task["title"]}</h6>
      <p class="board-task-description detail-card-description">${task["description"]}</p>
      <div class="detail-card-line">
          <div class="detail-card-line-label">Due date:</div>
          <div class="detail-card-line-info">${task["dueDate"]}</div>
      </div>
      <div class="detail-card-line">
          <div class="detail-card-line-label">Priority:</div>
          <div class="detail-card-line-info">${task["priority"]}
              ${prioHTML}
          </div>
      </div>
      
      <div class="detail-card-badge-container">
        Assigned To:
          ${assignHTML}
      </div>
      <div class="detail-card-subtask-container">
        Subtasks:
        ${subtasks}
      </div>
  `;
}

function toggleSubtaskStatus(firstIndex, index) {
  tasksRP[firstIndex]["subtasks"][index]["done"] =
    !tasksRP[firstIndex]["subtasks"][index]["done"];
  renderDetailCard(firstIndex);
  renderAllCards();
}

function subtaskStatusHTML(subtask, firstIndex, index) {
  let html = "";
  if (subtask["done"]) {
    html = /*html*/ `
      <div class="detail-card-subtask">
        <svg onclick="toggleSubtaskStatus(${firstIndex}, ${index})" class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
              d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12"
              stroke="#2A3647" stroke-width="2" stroke-linecap="round" />
              <path d="M5 9.96582L9 13.9658L17 2.46582" stroke="#2A3647" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p>${subtask["title"]}</p>
      </div>    
             `;
  } else {
    html = /*html*/ `
       <div class="detail-card-subtask">
            <svg onclick="toggleSubtaskStatus(${firstIndex}, ${index})" class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
            <p>${subtask["title"]}</p>
      </div> `;
  }
  return html;
}

function ghostCardHTML() {
  return /*html*/ `
         <div class="board-ghostCard"></div>`;
}

function labelHTML(label) {
  return /*html*/ `
        <div class="board-column-noTask">${label}</div>`;
}
