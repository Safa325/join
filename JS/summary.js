async function initSummary() {
  await greetingUser();
  date();
}

async function greetingUser() {
  let userName = await userData[userIndex]["name"];
  let greeting = document.getElementById("greeting");
  greeting.innerHTML = "";
  if (userIndex == 0) {
    greeting.innerHTML += greetingHtml1();
  } else {
    greeting.innerHTML += greetingHtml2(userName);
  }
}

function greetingHtml1() {
  return /*html*/ `<p>Good morning</p>`;
}

function greetingHtml2(name) {
  return /*html*/ `<p>Good morning,</p>
  <h2>${name}</h2>`;
}

function hoverPencil() {
  const pencil = document.getElementById("pencil");
  pencil.src = "./img/icons/pencil-white-r.svg";
}

function outPencil() {
  const pencil = document.getElementById("pencil");
  pencil.src = "./img/icons/pencil-dark.svg";
}

function hoverDone() {
  const done = document.getElementById("done");
  done.src = "./img/icons/done-white.svg";
}

function outDone() {
  const done = document.getElementById("done");
  done.src = "./img/icons/done-dark.svg";
}

function date() {
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = monthNames[monthIndex];
  let formattedDate = monthName + " " + day + ", " + year;
  includeDate(formattedDate);
}

function includeDate(x) {
  const actuellDate = document.getElementById("actuell-date");
  actuellDate.innerHTML = "";
  actuellDate.innerHTML += x;
}
