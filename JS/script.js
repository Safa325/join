async function init() {
  loadSession();
  await includeHTML();
  await getUserData();

  console.log("userData", userData);
  console.log("userIndex", userIndex);
}

function initSummaryHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="summary.html"></div>
    `;
  includeHTML();
}

function initAddTaskHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="addTask.html"></div>
    `;
  includeHTML();
}

async function initBoardHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="board.html"></div>
    `;
  await includeHTML();
  initBoard();
}

async function initContactsHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="contacts.html" class="fade-in-animation"></div>
    `;
  await includeHTML();
  initContacts();
}
