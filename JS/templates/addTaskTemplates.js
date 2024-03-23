function subTaskHTML(subtask, index) {
  return /*html*/ `
          <div class="addTask-subtask-element dot-before" id="addTask-subtask-element_${index}">
          <input readonly="true" onkeyup="editSubtask(event, ${index})" onkeydown="editSubtaskPreventEnter(event)" ondblclick="enableEditSubtask(event, ${index})" id="addTask-subtask-listElement-input_${index}" class="addTask-subtask-listElement" type="text" value="${subtask.title}">
              <div onclick="enableEditSubtask(event, ${index})" class="subtask-icon subtask-edit" id="subtask-edit_${index}">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M3.16667 22.3332H5.03333L16.5333 10.8332L14.6667 8.9665L3.16667 20.4665V22.3332ZM22.2333 8.89984L16.5667 3.29984L18.4333 1.43317C18.9444 0.922059 19.5722 0.666504 20.3167 0.666504C21.0611 0.666504 21.6889 0.922059 22.2 1.43317L24.0667 3.29984C24.5778 3.81095 24.8444 4.42761 24.8667 5.14984C24.8889 5.87206 24.6444 6.48873 24.1333 6.99984L22.2333 8.89984ZM20.3 10.8665L6.16667 24.9998H0.5V19.3332L14.6333 5.19984L20.3 10.8665Z"
                          fill="black" />
                  </svg>
              </div>
              <div onclick="deleteSubtask(${index})" class="subtask-icon subtask-delete">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z"
                          fill="#2A3647" />
                  </svg>
              </div>
              <div onclick="disableEditSubtask(${index})" class="subtask-icon subtask-accept d-none" id="subtask-accept_${index}">
                  <svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.02832 15.0001L15.2571 26.0662L33.9717 3.93408" stroke="#2A3647" stroke-width="7"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
              </div>
          </div>
      `;
}

function contactHTML(contact, contactElementClass, index, svg) {
  return /*html*/ `
          <div onclick="toggleContactSelection(${index})" id="contact-element_${index}" class="contact-element ${contactElementClass}">
              <div class="addTask-profile-badge" style="background-color: ${contact['badgecolor']}">${contact['initials']}</div>
              <p class="addTask-dropdown-text">${contact['name']}</p>
              ${svg}
          </div>`;
}

function badgesHTML(contact) {
  return /*html*/ `
          <div class="addTask-profile-badge" style="background-color: ${contact['badgecolor']}">${contact['initials']}</div>
      `;
}

function contactCheckboxSvgHTML(value) {
  let html = '';
  if (value) {
    html = /*html*/ `    
                  <svg class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12"
                  stroke="white" stroke-width="2" stroke-linecap="round" />
                  <path d="M5 9.96582L9 13.9658L17 2.46582" stroke="white" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
                  </svg>`;
  } else {
    html = /*html*/ `
                  <svg class="addTask-checkbox" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                  </svg>`;
  }
  return html;
}
