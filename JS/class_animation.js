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
 * disable input field of subtask, when focus change
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
/**
 * enable input of subtask, change look of inputfield, set focus
 * @param {Event} event
 * @param {Number} index
 */
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

/**
 * disable input of subtask, change look of inputfield
 * @param {Number} index
 */
function disableEditSubtask(index) {
  let input = document.getElementById(`addTask-subtask-listElement-input_${index}`);
  addPseudo(index);
  input.classList.remove('inputField-enabled');
  document.getElementById(`subtask-edit_${index}`).classList.remove('d-none');
  document.getElementById(`subtask-accept_${index}`).classList.add('d-none');
}

/**
 * change subtask text
 * @param {Event} event
 * @param {Number} index
 */
function editSubtask(event, index) {
  event.preventDefault();
  let input = document.getElementById(`addTask-subtask-listElement-input_${index}`);
  subtasks.splice(index, 1, input.value);
}

/**
 * hitting enter disable subtask edit
 */
window.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    indirectDisableEditSubtask();
  }
});

/**
 * change mode of all subtasks to disable edit
 */
function indirectDisableEditSubtask() {
  let elements = document.querySelectorAll('.addTask-subtask-listElement');
  for (let index = 0; index < elements.length; index++) {
    disableEditSubtask(index);
  }
}
/**
 * hit enter create the subtask but doesn´t submit form
 * @param {Event} event
 */
function createTaskEnter(event) {
  if (event.key === 'Enter') {
    createSubtask();
    event.preventDefault();
  }
}
/**
 * hit enter doesn´t submit the form
 * @param {Event} event
 */
function editSubtaskPreventEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

// function indirectCreateSubtask() {
//   let activeElement = this.document.activeElement;
//   let subtask = document.getElementById('addTask-subtask-input');
//   if (activeElement == subtask) {
//     createSubtask();
//   }
// }

/**
 * delete selected subtask
 * @param {Number} index
 */
function deleteSubtask(index) {
  subtasks.splice(index, 1);
  renderSubtasks();
}

/**
 * render all subtask with text and control buttons
 */
function renderSubtasks() {
  let container = document.getElementById('addTask-subtask-container');
  container.innerHTML = '';
  for (let index = 0; index < subtasks.length; index++) {
    const subtask = subtasks[index];
    container.innerHTML += subTaskHTML(subtask, index);
  }
}

/**
 * remove the pseudoclass of selected subtask when start editing
 * @param {Number} index
 */
function removePseudo(index) {
  let subtaskElement = document.getElementById(`addTask-subtask-element_${index}`);
  subtaskElement.classList.remove('dot-before');
  subtaskElement.classList.add('subtask-element-selected');
}

/**
 * add the pseudoclass of selected subtask after editing, set readOnly of inputfield
 * @param {Number} index
 */
function addPseudo(index) {
  let subtaskElement = document.getElementById(`addTask-subtask-element_${index}`);
  subtaskElement.classList.add('dot-before');
  subtaskElement.classList.remove('subtask-element-selected');
  let input = document.getElementById(`addTask-subtask-listElement-input_${index}`);
  input.readOnly = true;
}

/**
 * add class at inputfield to blue outline of selected id
 * @param {String} id
 */
function setOutlineBlue(id) {
  document.getElementById(id).classList.add('blue-outline');
}
/**
 * remove class at inputfield to blue outline of selected id
 * @param {String} id
 */
function clearOutlineBlue(id) {
  document.getElementById(id).classList.remove('blue-outline');
}

/**
 * show label "Task added to board" when task is created
 */
function confirmNewTask() {
  let confirm = document.getElementById('task-confirmation-container');
  confirm.classList.remove('confirm-slide-out-animation');
  confirm.classList.add('confirm-slide-in-animation');
  setTimeout(() => {
    hideConfirmNewTask();
  }, 2000);
}
/**
 * hide label "Task added to board"
 */
function hideConfirmNewTask() {
  let confirm = document.getElementById('task-confirmation-container');
  confirm.classList.remove('confirm-slide-in-animation');
  confirm.classList.add('confirm-slide-out-animation');
}
