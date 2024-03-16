async function initSummary() {
  await greetingUser();
  date();
  showTasks();
  showGreeting();
  greetingResponsiv();
}

let day;

async function greetingUser() {
  let userName = await userData[userIndex]["name"];
  let greeting = document.getElementById("greeting");
  greeting.innerHTML = "";
  greetingDay();
  if (userIndex == 0) {
    greeting.innerHTML += greetingHtml1(day);
  } else {
    greeting.innerHTML += greetingHtml2(userName, day);
  }
}

function greetingHtml1(day) {
  return /*html*/ `<p>${day}</p>`;
}

function greetingHtml2(name, day) {
  return /*html*/ `<p>${day},</p>
  <h2>${name}</h2>`;
}

function greetingDay() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  if (currentHour < 12) {
    day = "Good morning";
  } else if (currentHour < 18) {
    day = "Good day";
  } else {
    day = "Good evening";
  }
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

function showTasks() {
  //   let tasks = userData[userIndex]["tasks"];
  let taskDo = filterBoardStatus("todo");
  let taskDone = filterBoardStatus("done");
  let taskUrgent = filterBoardPrio("urgent");
  let taskProgress = filterBoardStatus("inProgress");
  let taskFeedback = filterBoardStatus("awaitFeedback");
  let taskBoard = taskDo + taskDone + taskUrgent + taskProgress + taskFeedback;

  let toDo = document.getElementById("toDo");
  let done = document.getElementById("done1");
  let urgent = document.getElementById("urgent");
  let inBoard = document.getElementById("inBoard");
  let inProgress = document.getElementById("inProgress");
  let feedback = document.getElementById("feedback");

  toDo.innerHTML = "";
  toDo.innerHTML += taskDo;
  done.innerHTML = "";
  done.innerHTML += taskDone;
  urgent.innerHTML = "";
  urgent.innerHTML += taskUrgent;
  inBoard.innerHTML = "";
  inBoard.innerHTML += taskBoard;
  inProgress.innerHTML = "";
  inProgress.innerHTML += taskProgress;
  feedback.innerHTML = "";
  feedback.innerHTML += taskFeedback;
}

function showGreeting() {
  const greeting = document.getElementById("summaryGreet");
  if (window.innerWidth <= 1385) {
    if (!sessionStorage.getItem("animationGreetingPlayed")) {
      greeting.classList.remove("none");
      setTimeout(function () {
        greeting.classList.add("none");
      }, 1000);
      sessionStorage.setItem("animationGreetingPlayed", true);
    }
  }
}

function greetingResponsiv() {
  const greeting = document.getElementById("summaryGreet");
  if (greeting) {
    if (window.innerWidth <= 1385) {
      if (greeting.classList.contains("none")) {
      } else {
        greeting.classList.add("none");
      }
    } else {
      if (greeting.classList.contains("none")) {
        greeting.classList.remove("none");
      }
    }
  }
}

window.onresize = function () {
  greetingResponsiv();
};

function filterBoardStatus(x) {
  let userTasks = userData[userIndex]["tasks"];
  const result = userTasks.filter((task) => task.status === x).length;
  return result;
}

function filterBoardPrio(x) {
  let userTasks = userData[userIndex]["tasks"];
  const result = userTasks.filter((task) => task.priority === x).length;
  return result;
}
