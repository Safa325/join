async function init() {
    await includeHTML();
}

function initSummaryHTML() {
    document.getElementById('main-content-container').innerHTML = /*HTML*/``;
    document.getElementById('main-content-container').innerHTML = /*HTML*/`
    <div w3-include-html="summary.html"></div>
    `;
    includeHTML();
}

function initAddTaskHTML() {
    document.getElementById('main-content-container').innerHTML = /*HTML*/``;
    document.getElementById('main-content-container').innerHTML = /*HTML*/`
    <div w3-include-html="addTask.html"></div>
    `;
    includeHTML();
}

function initBoardHTML() {
    document.getElementById('main-content-container').innerHTML = /*HTML*/``;
    document.getElementById('main-content-container').innerHTML = /*HTML*/`
    <div w3-include-html="board.html"></div>
    `;
    includeHTML();
}

async function initContactsHTML() {
    document.getElementById('main-content-container').innerHTML = /*HTML*/``;
    document.getElementById('main-content-container').innerHTML = /*HTML*/`
    <div w3-include-html="contacts.html"></div>
    `;
    includeHTML();
    await initContacts();
}