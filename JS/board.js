let currentCardId = '';
let targetColumnName = '';
let columnsId = ['todo-card-container', 'inProgress-card-container', 'awaitFeedback-card-container', 'done-card-container'];
let labels = ['No task todo', 'no task in progress', 'no task await feedback', 'no task done'];

function initBoard() {
    document.querySelector('.board-column-container').style = 'opacity: 0';
    tasks = userData[userIndex]['tasks'];
    renderAllCards();
    renderGhostCards();
    document.body.classList.remove('stop-scrolling');
    selectCardIsDraggable();
    setTimeout(() => {
        document.querySelector('.board-column-container').style = 'opacity: 1';
    }, 200);
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
    setLabelVisibity();
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
    container.innerHTML = detailCardHTML(tasks[index], index, color, assignHTML, prioHTML, subtasksHTML);
}

/**
 * By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element.
 * @param {Event} ev
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * The dataTransfer.setData() method sets the data type and the value of the dragged data:
 * @param {Event} ev
 */
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    currentCardId = ev.target.id;
}

/**
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
 * Change the status of the task where the card is dropped.
 * @param {Number} index
 * @param {String} status
 */
function changeStatusOfTask(index, status) {
    tasks[index]['status'] = status;
}

/**
 * Save task.
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
 * Render all contacts where the actual task is assigned to. Used for small cards.
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

/**
 * Render all contacts where the actual task is assigned to. Used for detail cards.
 * @param {Object} task
 * @returns {HTMLElement}
 */
function renderDetailsCardContacts(task) {
    let assignHTML = '';
    for (let i = 0; i < task['assignedTo'].length; i++) {
        const assignetTo = task['assignedTo'][i];
        assignHTML += assignedToDetailsHTML(assignetTo);
    }
    return assignHTML;
}

/**
 * Returns the color of the task category badge color
 * @param {Object} task
 * @returns {String} - color Hex Code
 */
function getBadgeColor(task) {
    return task['category'] == 'User Story' ? '#0038ff' : '#1fd7c1';
}

/**
 * Sets all ghost cards to visible
 */
function showGhostcard() {
    let ghostCard = document.querySelectorAll('.board-ghostCard');
    ghostCard.forEach((element) => {
        element.classList.add('show-ghostCard');
    });
}
/**
 * If the column is empty the margin-top of the ghost card is set to 55px
 */
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

/**
 * Function sequence. Render a empty popup card, slide-in animation and render detail card.
 * @param {Number} index
 */
function openDetailCard(index) {
    renderPopupCard();
    slideInPopupCard();
    renderDetailCard(index);
}
/**
 * Removes a task from Array, save all tasks, slide-out animation for detail card and re-render all cards.
 * @param {Number} index - selected task index
 */
async function deleteTask(index) {
    tasks.splice(index, 1);
    await saveTask();
    sliedeOutPopupCard();
    renderAllCards();
}
/**
 * Toggles the subtask status when clicked in detail card, save all tasks, re-render detail card and all cards.
 * @param {Number} firstIndex - task index
 * @param {Number} index - subtask index
 */
async function toggleSubtaskStatus(firstIndex, index) {
    tasks[firstIndex]['subtasks'][index]['done'] = !tasks[firstIndex]['subtasks'][index]['done'];
    await saveTask();
    renderDetailCard(firstIndex);
    renderAllCards();
}
/**
 * The task shown in the detail card can be edited. Prepare data for editing.
 * @param {Number} index - task index
 */
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

/**
 * The input fields are filled with the actual data of the selected task.
 * @param {Object} task - selected task
 */
function initEditTaskFields(task) {
    document.getElementById('addTask-input-title').value = task['title'];
    document.getElementById('addTask-input-description').innerText = task['description'];
    document.getElementById('addTask-input-date').value = task['dueDate'];
    document.getElementById('addTask-category').value = task['category'];
}

/**
 * In edit mode change text of submit button. Delete Cancel button. Change function for submit button to editTaskSubmit
 * @param {Number} index - task index
 */
function adjustFormWhenEdit(index) {
    changeSubmitButtonText();
    disableCancelButton();
    changeFormSubmitBehaviour(index);
}

/**
 * In edit mode all contacts are availible and the selected contacts are set.
 * @param {Object} task
 */
function setSelectedContacts(task) {
    task['assignedTo'].forEach((contact) => {
        arrayOfFilterContact.forEach((filteredContact) => {
            if (contact['name'] == filteredContact['name']) {
                filteredContact.selected = true;
            }
        });
    });
}

/**
 * In edit mode change onsubmit function
 * @param {Number} index - task index
 */
function changeFormSubmitBehaviour(index) {
    let form = document.getElementById('addTask-form');
    form.setAttribute('onsubmit', `editTaskSubmit(${index}); return false;`);
}

/**
 * In edit mode get all input fields and update selected task. Save all task and rerender.
 * @param {Number} index - task index
 */
async function editTaskSubmit(index) {
    let assignedContacts = [];
    for (let index = 0; index < arrayOfFilterContact.length; index++) {
        let selection = arrayOfFilterContact[index]['selected'];
        if (selection) {
            assignedContacts.push(arrayOfFilterContact[index]);
        }
    }

    let task = {
        title: document.getElementById('addTask-input-title').value,
        description: document.getElementById('addTask-input-description').value,
        assignedTo: assignedContacts,
        priority: priority,
        category: document.getElementById('addTask-category').value,
        dueDate: document.getElementById('addTask-input-date').value,
        status: tasks[index]['status'],
        subtasks: subtasks,
    };

    userData[userIndex]['tasks'][index] = task;
    await saveTask();
    sliedeOutPopupCard();
    renderAllCards();
    renderGhostCards();
}

/**
 * Find all tasks where title or description includes the text input. Lower opactity of all cards and highlight card which match.
 */
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

/**
 * Add Task as popup. Render empty card, slide-in animation and use html template. Set status.
 * @param {String} initStatus - status of new task - e.g. todo, inProgress, awaitFeedback
 */
async function openAddTaskPopup(initStatus) {
    renderPopupCard();
    slideInPopupCard();
    let container = document.getElementById('popup-card-container');
    container.innerHTML = '';
    container.innerHTML = addTaskHTML();
    await addTaskInit();
    initialStatus = initStatus;
}

/**
 * Get values from radiobuttons and set new status of task. Slide-out animation and rerender all cards.
 * @param {Number} index - task index
 */
function moveCardTo(index) {
    var form = document.getElementById('form-moveTo');
    var radVal = form.fav_language.value;
    changeStatusOfTask(index, radVal);
    sliedeOutPopupCard();
    renderAllCards();
    setLabelVisibity();
}
