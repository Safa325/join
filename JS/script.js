async function init() {
  loadSession();
  // await includeHTML();
  await getUserData();
  await initSummaryHTML();

  console.log("userData", userData);
  console.log("userIndex", userIndex);
}

async function initSummaryHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="summary.html"></div>
    `;
  await includeHTML();
  clearAllNavActive();
  setNavActive('sidebar-nav-summary');
  initSummary();
}

async function initAddTaskHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="addTask.html"></div>
    `;
  await includeHTML();
  addTaskInit();
  clearAllNavActive();
  setNavActive('sidebar-nav-tasks');
}

async function initBoardHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="board.html"></div>
    `;
  await includeHTML();
  initBoard();
  clearAllNavActive();
  setNavActive("sidebar-nav-board");
}

async function initContactsHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="contacts.html" class="fade-in-animation"></div>
    `;
  await includeHTML();
  initContacts();
  clearAllNavActive();
  setNavActive("sidebar-nav-contacts");
}

function clearAllNavActive() {
  let nav = document.querySelectorAll(".sidebar-nav-element");
  nav.forEach((element) => {
    element.classList.remove("sidebar-element-active");
  });
}

function setNavActive(id) {
  let nav = document.getElementById(id);
  nav.classList.add("sidebar-element-active");
}

async function openHelpHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="help.html"></div>
    `;
  await includeHTML();
}

async function openLegalNoticeHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="legalnotice.html"></div>
    `;
  await includeHTML();
}

async function openPrivacyPolicyHTML() {
  document.getElementById("main-content-container").innerHTML = /*HTML*/ ``;
  document.getElementById("main-content-container").innerHTML = /*HTML*/ `
    <div w3-include-html="privacypolicy.html"></div>
    `;
  await includeHTML();
}
