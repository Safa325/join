/**
 * Initialisiert die Zusammenfassung der Benutzerinteraktionen.
 * Initializes the summary of user interactions.
 */
function initSummary() {
  greetingUser();
  date();
  showTasks();
  greetingResponsiv();
  showGreeting();
}

let day;

/**
 * Begrüßt den Benutzer entsprechend der Tageszeit und zeigt den Namen an, falls vorhanden.
 * Greets the user based on the time of the day and displays the name if available.
 */
function greetingUser() {
  let userName = userData[userIndex]["name"];
  let greeting = document.getElementById("greeting");
  greeting.innerHTML = "";
  greetingDay();
  if (userIndex == 0) {
    if (window.innerWidth < 1200) {
      day = day + "!";
      greeting.innerHTML += greetingHtml1(day);
    } else {
      greeting.innerHTML += greetingHtml1(day);
    }
  } else {
    greeting.innerHTML += greetingHtml2(userName, day);
  }
}

/**
 * Erstellt das HTML für die Begrüßungsnachricht ohne den Benutzernamen.
 * Creates the HTML for the greeting message without the username.
 * @param {string} day - Die Tageszeit für die Begrüßung.
 * @returns {string} - Das HTML für die Begrüßungsnachricht.
 */
function greetingHtml1(day) {
  return /*html*/ `<p>${day}</p>`;
}

/**
 * Erstellt das HTML für die personalisierte Begrüßungsnachricht mit dem Benutzernamen.
 * Creates the HTML for the personalized greeting message with the username.
 * @param {string} name - Der Benutzername.
 * @param {string} day - Die Tageszeit für die Begrüßung.
 * @returns {string} - Das HTML für die personalisierte Begrüßungsnachricht.
 */
function greetingHtml2(name, day) {
  return /*html*/ `<p>${day},</p>
  <h2>${name}</h2>`;
}

/**
 * Bestimmt die Tageszeit für die Begrüßung basierend auf der aktuellen Uhrzeit.
 * Determines the time of day for the greeting based on the current time.
 */
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

/**
 * Ändert das Bild des Bleistiftsymbols beim Überfahren mit der Maus.
 * Changes the image of the pencil icon on mouse hover.
 */
function hoverPencil() {
  const pencil = document.getElementById("pencil");
  pencil.src = "./img/icons/pencil-white-r.svg";
}

/**
 * Ändert das Bild des Bleistiftsymbols, wenn die Maus das Symbol verlässt.
 * Changes the image of the pencil icon when the mouse leaves the symbol.
 */
function outPencil() {
  const pencil = document.getElementById("pencil");
  pencil.src = "./img/icons/pencil-dark.svg";
}

/**
 * Ändert das Bild des "Fertig"-Symbols beim Überfahren mit der Maus.
 * Changes the image of the "done" icon on mouse hover.
 */
function hoverDone() {
  const done = document.getElementById("done");
  done.src = "./img/icons/done-white.svg";
}

/**
 * Ändert das Bild des "Fertig"-Symbols, wenn die Maus das Symbol verlässt.
 * Changes the image of the "done" icon when the mouse leaves the symbol.
 */
function outDone() {
  const done = document.getElementById("done");
  done.src = "./img/icons/done-dark.svg";
}

/**
 * Bestimmt das aktuelle Datum und zeigt es im HTML-Element "actuell-date" an.
 * Determines the current date and displays it in the HTML element "actuell-date".
 */
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

/**
 * Fügt das übergebene Datum in das HTML-Element "actuell-date" ein.
 * Inserts the provided date into the HTML element "actuell-date".
 * @param {string} x - Das einzufügende Datum.
 */
function includeDate(x) {
  const actuellDate = document.getElementById("actuell-date");
  actuellDate.innerHTML = "";
  actuellDate.innerHTML += x;
}

/**
 * Zeigt die Anzahl der Aufgaben in verschiedenen Kategorien an.
 * Displays the number of tasks in different categories.
 */
function showTasks() {
  let taskDo = filterBoardStatus("todo");
  let taskDone = filterBoardStatus("done");
  let taskUrgent = filterBoardPrio("urgent");
  let taskProgress = filterBoardStatus("inProgress");
  let taskFeedback = filterBoardStatus("awaitFeedback");
  let taskBoard = taskDo + taskDone + taskProgress + taskFeedback;
  document.getElementById("toDo").innerHTML = taskDo;
  document.getElementById("done1").innerHTML = taskDone;
  document.getElementById("urgent").innerHTML = taskUrgent;
  document.getElementById("inBoard").innerHTML = taskBoard;
  document.getElementById("inProgress").innerHTML = taskProgress;
  document.getElementById("feedback").innerHTML = taskFeedback;
}

/**
 * Zeigt eine Begrüßungsnachricht an, wenn die Seite geladen wird und wenn die Begrüßungsanimation noch nicht abgespielt wurde.
 * Displays a greeting message when the page is loaded and if the greeting animation has not been played yet.
 */
function showGreeting() {
  const greeting = document.getElementById("summaryGreet");
  if (!sessionStorage.getItem("animationGreetingPlayed")) {
    if (window.innerWidth <= 1200) {
      greeting.classList.remove("none");
      sessionStorage.setItem("animationGreetingPlayed", true);
      setTimeout(function () {
        greeting.classList.add("none");
      }, 1000);
    }
  }
}

/**
 * Verwaltet die Anzeige der Begrüßungsnachricht basierend auf der Bildschirmgröße.
 * Manages the display of the greeting message based on the screen size.
 */
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

/**
 * Filtert die Anzahl der Aufgaben basierend auf ihrem Status.
 * Filters the number of tasks based on their status.
 * @param {string} x - Der Status der Aufgaben, der gefiltert werden soll.
 * @returns {number} - Die Anzahl der Aufgaben mit dem angegebenen Status.
 */
function filterBoardStatus(x) {
  let userTasks = userData[userIndex]["tasks"];
  const result = userTasks.filter((task) => task.status === x).length;
  return result;
}

/**
 * Filtert die Anzahl der Aufgaben basierend auf ihrer Priorität.
 * Filters the number of tasks based on their priority.
 * @param {string} x - Die Priorität der Aufgaben, die gefiltert werden soll.
 * @returns {number} - Die Anzahl der Aufgaben mit der angegebenen Priorität.
 */
function filterBoardPrio(x) {
  let userTasks = userData[userIndex]["tasks"];
  const result = userTasks.filter((task) => task.priority === x).length;
  return result;
}

/**
 * Leitet zur "board.html" Seite weiter.
 * Redirects to the "board.html" page.
 */
function loadBoard() {
  window.location.href = "board.html";
}
