function cardHTML(task, index, color, prioHTML, assignHTML, progressHTML) {
  return /*html*/ `
             <div data-id="${index}" draggable='true' onclick="openDetailCard(${index})" ondragstart="drag(event); rotateCard(event)" id="card_${index}" class="board-task-card">
             <div class="board-card-header">
                <p class="board-task-category" style="background-color: ${color}">${task['category']}</p>
                <svg onclick="openCardMoveMenu(event,${index})" class="board-card-move-btn" xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 512 512">
                <path
                d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h32v96H128V192c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V288h96v96H192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H288V288h96v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6v32H288V128h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z" fill="#091931" />
                </svg>
             </div>  
            
                <h6 class="board-task-title">${task['title']}</h6>
                <p class="board-task-description">${task['description']}</p>
                        ${progressHTML}
               
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

function progressbarHTML(totalSubtasks, finishedSubtasks, progress) {
  if (totalSubtasks > 0) {
    return /*html*/ `
          <div class="board-task-progress">
              <div class="board-task-progressbar">
                  <div class="board-task-progress-inner" style="width: ${progress}%">
                  </div>
              </div>
              <p>${finishedSubtasks}/${totalSubtasks} Subtasks</p>
          </div>
        `;
  } else {
    return ``;
  }
}

function detailCardHTML(task, index, color, assignHTML, prioHTML, subtasks) {
  return /*html*/ `
          <div class="board-task-detail-header">
              <p class="board-task-category detail-card-category" style="background-color: ${color}">${task['category']}</p>
              <svg id="close-detail-card" onclick="sliedeOutPopupCard()" class="board-task-detail-close" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
              d="M6.24953 7.00008L11.4925 12.2431M1.00653 12.2431L6.24953 7.00008L1.00653 12.2431ZM11.4925 1.75708L6.24853 7.00008L11.4925 1.75708ZM6.24853 7.00008L1.00653 1.75708L6.24853 7.00008Z"
              stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
          </div>
             
          <h6 class="board-task-title detail-card-title">${task['title']}</h6>
          <p class="board-task-description detail-card-description">${task['description']}</p>
          <div class="detail-card-line">
              <div class="detail-card-line-label">Due date:</div>
              <div class="detail-card-line-info">${task['dueDate']}</div>
          </div>
          <div class="detail-card-line">
              <div class="detail-card-line-label">Priority:</div>
              <div class="detail-card-line-info">${task['priority']}
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
          <div class="detail-card-footer">
            <div onclick="deleteTask(${index})" class="detail-card-footer-btn">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z"
                    fill="#2A3647" />
              </svg>
            Delete
            </div>
            <div onclick="switchEditTask(${index})" class="detail-card-footer-btn border-left">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.16667 22.3332H5.03333L16.5333 10.8332L14.6667 8.9665L3.16667 20.4665V22.3332ZM22.2333 8.89984L16.5667 3.29984L18.4333 1.43317C18.9444 0.922059 19.5722 0.666504 20.3167 0.666504C21.0611 0.666504 21.6889 0.922059 22.2 1.43317L24.0667 3.29984C24.5778 3.81095 24.8444 4.42761 24.8667 5.14984C24.8889 5.87206 24.6444 6.48873 24.1333 6.99984L22.2333 8.89984ZM20.3 10.8665L6.16667 24.9998H0.5V19.3332L14.6333 5.19984L20.3 10.8665Z"
                  fill="#2a3647" />
              </svg>
            Edit
            </div>
          </div>
      `;
}

function subtaskStatusHTML(subtask, firstIndex, index) {
  let html = '';
  if (subtask['done']) {
    html = /*html*/ `
          <div class="detail-card-subtask">
            <svg onclick="toggleSubtaskStatus(${firstIndex}, ${index})" class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12"
                  stroke="#2A3647" stroke-width="2" stroke-linecap="round" />
                  <path d="M5 9.96582L9 13.9658L17 2.46582" stroke="#2A3647" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p>${subtask['title']}</p>
          </div>    
                 `;
  } else {
    html = /*html*/ `
           <div class="detail-card-subtask">
                <svg onclick="toggleSubtaskStatus(${firstIndex}, ${index})" class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
                <p>${subtask['title']}</p>
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

function assignedToDetailsHTML(assignedTo) {
  return /*html*/ `
        <div class="details-badge-container">
            <div class="details-profile-badge" style="background-color: ${assignedTo['badgecolor']}">
                ${assignedTo['initials']}
            </div>
          ${assignedTo['name']}
        </div>   
        `;
}

function assignedToHTML(assignedTo) {
  return /*html*/ `
             <div class="board-task-profile-badge" style="background-color: ${assignedTo['badgecolor']}">${assignedTo['initials']}</div>
        `;
}

function priorityHTML(priority) {
  if (priority == 'urgent') {
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
  if (priority == 'medium') {
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

function addTaskHTML() {
  return /*html*/ `
     
        <form id="addTask-form" onsubmit="createTask(event); return false;">
        <svg id="close-detail-card" onclick="sliedeOutPopupCard()" class="board-task-detail-close flex-end" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
              d="M6.24953 7.00008L11.4925 12.2431M1.00653 12.2431L6.24953 7.00008L1.00653 12.2431ZM11.4925 1.75708L6.24853 7.00008L11.4925 1.75708ZM6.24853 7.00008L1.00653 1.75708L6.24853 7.00008Z"
              stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
          <div id="addTask-column-wrapper" class="addTask-column-wrapper">
            <div class="addTask-column left-column">
              <div class="addTask-input-element">
                <label class="addTask-label required" for="addTask-input-title"
                  >Title</label
                >
                <input
                  name="title"
                  class="addTask-inputField"
                  type="text"
                  id="addTask-input-title"
                  placeholder="Enter a title"
                  required
                />
              </div>
              <div class="addTask-input-element">
                <label class="addTask-label" for="addTask-input-description"
                  >Description</label>
                <textarea
                  name="description"
                  class="addTask-inputField addTask-textarea"
                  type="text"
                  id="addTask-input-description"
                  placeholder="Enter a description"
                ></textarea>
              </div>
  
            
              <div class="addTask-input-element mb-12">
                <label class="addTask-label" for="addTask-search-assign"
                  >Assigned To</label
                >
                <div
                  id="addTask-assigned"
                  class="addTask-inputField addTask-assigned"
                >
                  <input
                    onblur="clearOutlineBlue('addTask-assigned')"
                    onfocus="setOutlineBlue('addTask-assigned')"
                    onkeyup="setFilter()"
                    class="addTask-searchField"
                    type="text"
                    id="addTask-search-assign"
                    placeholder="Select contacts to assign"
                  />
                  <div class="addTask-round-btn-frame">
                    <img
                      id="arrow-contacts"
                      onclick="contactsDropdown.toggle()"
                      class="addTask-arrow-btn"
                      src="./img/icons/arrow-down-small.svg"
                      alt=""
                    />
                  </div>
                  <div
                    class="addTask-dropdown-container contacts d-none"
                    id="contact-dropdown-container"
                  >
                   
                  </div>
                </div>
              </div>
              <div class="addTask-badges-container" id="contact-badges-container">
              
              </div>
            </div>
            <div class="addTask-separator"></div>
            <div class="addTask-column right-column">
              <div class="addTask-input-element">
                <label class="addTask-label required" for="addTask-input-date"
                  >Due Date</label
                >
                <input
                  class="addTask-inputField"
                  type="date"
                  id="addTask-input-date"
                  placeholder="dd/mm/yy"
                  required
                />
              </div>
  
             
              <div class="addTask-input-element">
                <div class="addTask-label">Prio</div>
                <div class="addTask-btn-container" id="addTask-input-prio">
                  <div
                    onclick="selectPrio('urgent')"
                    id="addTask-prio-urgent"
                    class="addTask-prio-btn urgent"
                  >
                    Urgent
                    <svg
                      width="35"
                      height="26"
                      viewBox="0 0 35 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32.8709 25.1626C32.4699 25.1633 32.0792 25.0337 31.7563 24.7929L17.6511 14.263L3.54584 24.7929C3.34781 24.941 3.1229 25.0482 2.88394 25.1084C2.64497 25.1685 2.39664 25.1805 2.15312 25.1435C1.9096 25.1066 1.67566 25.0214 1.46465 24.893C1.25365 24.7645 1.06971 24.5953 0.923347 24.3949C0.776981 24.1945 0.671052 23.9669 0.611608 23.7251C0.552165 23.4832 0.54037 23.2319 0.576898 22.9855C0.65067 22.4878 0.916792 22.0402 1.31672 21.7411L16.5365 10.3677C16.8591 10.126 17.2498 9.99561 17.6511 9.99561C18.0524 9.99561 18.4431 10.126 18.7657 10.3677L33.9855 21.7411C34.3033 21.9781 34.5389 22.3106 34.6588 22.6912C34.7788 23.0718 34.7768 23.481 34.6532 23.8604C34.5296 24.2398 34.2907 24.57 33.9706 24.8039C33.6506 25.0377 33.2657 25.1633 32.8709 25.1626Z"
                        fill="white"
                      />
                      <path
                        d="M32.8708 15.2109C32.4697 15.2116 32.0791 15.082 31.7562 14.8413L17.651 4.31139L3.54572 14.8413C3.1458 15.1404 2.64482 15.2665 2.15301 15.1919C1.6612 15.1172 1.21883 14.8479 0.923233 14.4432C0.627633 14.0385 0.503012 13.5315 0.576784 13.0339C0.650556 12.5362 0.916678 12.0885 1.31661 11.7894L16.5364 0.415997C16.859 0.174366 17.2497 0.0439453 17.651 0.0439453C18.0523 0.0439453 18.443 0.174366 18.7655 0.415997L33.9854 11.7894C34.3031 12.0264 34.5388 12.359 34.6587 12.7396C34.7786 13.1202 34.7767 13.5294 34.6531 13.9088C34.5295 14.2882 34.2906 14.6184 33.9705 14.8522C33.6505 15.0861 33.2656 15.2116 32.8708 15.2109Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div
                    onclick="selectPrio('medium')"
                    id="addTask-prio-medium"
                    class="addTask-prio-btn medium"
                  >
                    Medium
                    <svg
                      width="21"
                      height="8"
                      viewBox="0 0 21 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
                        fill="#FFA800"
                      />
                      <path
                        d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
                        fill="#FFA800"
                      />
                    </svg>
                  </div>
                  <div
                    onclick="selectPrio('low')"
                    id="addTask-prio-low"
                    class="addTask-prio-btn low"
                  >
                    Low
                    <svg
                      width="21"
                      height="16"
                      viewBox="0 0 21 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
                        fill="#7AE229"
                      />
                      <path
                        d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
                        fill="#7AE229"
                      />
                    </svg>
                  </div>
                </div>
              </div>
  
             
              <div class="addTask-input-element">
                <label class="addTask-label required" for="addTask-category"
                  >Category</label
                >
                <div class="addTask-inputField addTask-assigned">
                  <input
                    class="addTask-searchField"
                    type="text"
                    id="addTask-category"
                    placeholder="Select task category"
                    required
                  />
                  <div class="addTask-round-btn-frame">
                    <img
                      id="arrow-category"
                      onclick="categoryDropdown.toggle()"
                      class="addTask-arrow-btn"
                      src="./img/icons/arrow-down-small.svg"
                      alt=""
                    />
                  </div>
                  <div
                    class="addTask-dropdown-container d-none"
                    id="category-dropdown-container"
                  >
                    <div onclick="selectCategory(event)" class="category-element">
                      <p class="addTask-dropdown-text">Technical Task</p>
                    </div>
                    <div onclick="selectCategory(event)" class="category-element">
                      <p class="addTask-dropdown-text">User Story</p>
                    </div>
                  </div>
                </div>
              </div>
  
              
              <div class="addTask-input-element">
                <label class="addTask-label" for="addTask-subtask-input"
                  >Subtask</label
                >
                <div
                  ondblclick="enableSubtaskInput()" class="addTask-inputField-subtask"
                >
                  <input
                    onkeydown="createTaskEnter(event)"
                    readonly="true"
                    class="addTask-inputField-sub"
                    type="text"
                    id="addTask-subtask-input"
                    placeholder="Add new Subtask"
                  />
  
                  <div
                    id="addTask-delete-accept-container"
                    class="addTask-delete-accept-container d-none"
                  >
                    <div class="addTask-round-btn-frame">
                      <img
                        onclick="disableSubtaskInput()"
                        class="addTask-add-btn"
                        src="./img/icons/cancel.svg"
                        alt=""
                      />
                    </div>
                    <div onclick="createSubtask()" class="addTask-round-btn-frame"
                    >
                      <img class="addTask-add-btn" src="./img/icons/checked.svg" alt="icon checked"
                      />
                    </div>
                  </div>
  
                  <div
                    onclick="enableSubtaskInput()"
                    class="addTask-round-btn-frame"
                    id="addTask-button-plus"
                  >
                    <img
                      class="addTask-add-btn"
                      src="./img/icons/add.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
  
              <div
                class="addTask-subtask-container auto-height"
                id="addTask-subtask-container"
              ></div>
            </div>
          </div>
  
          <div class="addTask-controls">
            <p class="addTask-hint">This field is required</p>
            <div class="addTask-control-btn-container">
              <button id="addTask-cancel-btn" type="reset" class="addTask-control-btn cancel-btn">
                Cancel
                <svg
                  class="cancel-svg"
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.24953 7.00008L11.4925 12.2431M1.00653 12.2431L6.24953 7.00008L1.00653 12.2431ZM11.4925 1.75708L6.24853 7.00008L11.4925 1.75708ZM6.24853 7.00008L1.00653 1.75708L6.24853 7.00008Z"
                    stroke="#2A3647"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button id="addTask-submit-btn" type="submit" class="addTask-control-btn create-btn">
                Create Task
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
              </button>
            </div>
          </div>
        </form>
    `;
}

function moveCardHTML(index) {
  return /*html*/ `
     
      <form id="form-moveTo" onsubmit="moveCardTo(${index}); return false;">
        <p>Move task to:</p>
        <input type="radio" id="radio-todo" name="fav_language" value="todo">
        <label for="radio-todo">todo</label><br>
  
        <input type="radio" id="radio-inProgress" name="fav_language" value="inProgress">
        <label for="radio-inProgress">in progress</label><br>
  
        <input type="radio" id="radio-awaitFeedback" name="fav_language" value="awaitFeedback">
        <label for="radio-awaitFeedback">await Feedback</label><br>
  
          <input type="radio" id="radio-done" name="fav_language" value="done">
        <label for="radio-done">done</label><br>
          
        <input class="move-submit-btn" type="submit" value="Move Task">
      </form>
  
  
    `;
}
