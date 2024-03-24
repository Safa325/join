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
 * If the column is not empty the label of the column is set to display none
 */
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

/**
 * If drag event is startet the ghost card of the source column is disabled.
 * @param {Event} event
 */
function avoidGhostCard(event) {
    console.log(event.currentTarget);
    let card = event.currentTarget.querySelector('.board-ghostCard');
    if (card) {
        card.classList.add('remove-ghostCard');
    }
}

/**
 * If drag event is started, the current card rotates.
 * @param {Event} event
 */
function rotateCard(event) {
    event.currentTarget.classList.add('card-rotate');
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

/**
 * Slide in animation for popup card.
 * Show board overlay container
 */
function slideInPopupCard() {
    let header = document.querySelector('header');
    let sidebar = document.getElementById('sidebar');
    header.style = sidebar.style = 'z-index: 5';

    let container = document.getElementById('board-overlay-details');
    container.classList.remove('d-none');
    let card = document.getElementById('popup-card-container');
    card.classList.remove('card-slide-out-animation');
    card.classList.add('card-slide-in-animation');
    document.body.classList.add('stop-scrolling');
}

/**
 * Slide out animation for popup card.
 * Hide board overlay container delayed after animation is finished.
 * Clear subtask array.
 */
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

/**
 * Slide out animation for popup card when the background is clicked.
 * Hide board overlay container delayed after animation is finished.
 * Clear subtask array.
 */
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

/**
 * When resize window, decide if cards should be draggable.
 */
window.addEventListener('resize', function () {
    selectCardIsDraggable();
});

/**
 * If window is smaller than 1150px, all cards are set undraggable.
 * If the window is larger all cards are draggable
 */
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

/**
 * In mobile version open popup to move a task card.
 * Stop Propagation for avoid showing detail card.
 * @param {Event} event
 * @param {Number} index - task card index
 */
function openCardMoveMenu(event, index) {
    event.stopPropagation();
    renderPopupCard();
    slideInPopupCard();
    let container = document.getElementById('popup-card-container');
    container.innerHTML = '';
    container.innerHTML = moveCardHTML(index);
}

/**
 * Set filterd card to high opacity.
 * @param {Number} index - task index
 */
function setCardOpacity(index) {
    let cards = document.querySelectorAll('[data-id]');
    cards.forEach((card) => {
        let attr = card.getAttribute('data-id');
        if (attr == index) {
            card.style = 'opacity: 1';
        }
    });
}

/**
 * Set all cards to high opacity.
 */
function resetAllCardOpacity() {
    let cards = document.querySelectorAll('[data-id]');
    cards.forEach((card) => {
        card.style = 'opacity: 1';
    });
}

/**
 * Set all cards to low opacity
 */
function lowAllCardOpcatiy() {
    let cards = document.querySelectorAll('[data-id]');
    cards.forEach((card) => {
        card.style = 'opacity: 0.3';
    });
}

/**
 * In edit mode set cancel button invisible.
 */
function disableCancelButton() {
    let button = document.getElementById('addTask-cancel-btn');
    button.style = 'display: none;';
}
