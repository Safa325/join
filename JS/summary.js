/**
 * Initialisiert die Zusammenfassung der Benutzerinteraktionen.
 * Initializes the summary of user interactions.
 */
function initSummary() {
  greetingUser(); // Begrüßt den Benutzer
  date(); // Zeigt das aktuelle Datum an
  showTasks(); // Zeigt die Aufgaben an
  greetingResponsiv(); // Begrüßt den Benutzer je nach Bildschirmgröße
  showGreeting(); // Zeigt die Begrüßungsnachricht an
}

let day; // Die Tageszeit für die Begrüßung

/**
 * Begrüßt den Benutzer entsprechend der Tageszeit und zeigt den Namen an, falls vorhanden.
 * Greets the user based on the time of the day and displays the name if available.
 */
function greetingUser() {
  let userName = userData[userIndex]["name"]; // Holt sich den Benutzernamen
  let greeting = document.getElementById("greeting"); // Holt sich das Begrüßungselement
  greeting.innerHTML = ""; // Leert das Begrüßungselement
  greetingDay(); // Bestimmt die Tageszeit für die Begrüßung
  if (userIndex == 0) {
    // Überprüft, ob es sich um den ersten Benutzer handelt
    if (window.innerWidth < 1200) {
      // Überprüft die Bildschirmbreite für responsive Anpassung
      day = day + "!"; // Fügt ein Ausrufezeichen hinzu, wenn der Bildschirm klein ist
      greeting.innerHTML += greetingHtml1(day); // Fügt die Begrüßung für den ersten Benutzer hinzu
    } else {
      greeting.innerHTML += greetingHtml1(day); // Fügt die Begrüßung für den ersten Benutzer hinzu
    }
  } else {
    greeting.innerHTML += greetingHtml2(userName, day); // Fügt die personalisierte Begrüßung für andere Benutzer hinzu
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
  const currentTime = new Date(); // Holt sich die aktuelle Zeit
  const currentHour = currentTime.getHours(); // Holt sich die aktuelle Stunde
  if (currentHour < 12) {
    day = "Good morning"; // Begrüßung für den Morgen
  } else if (currentHour < 18) {
    day = "Good day"; // Begrüßung für den Tag
  } else {
    day = "Good evening"; // Begrüßung für den Abend
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
  let taskDo = filterBoardStatus("todo"); // Anzahl der Aufgaben im Status "ToDo"
  let taskDone = filterBoardStatus("done"); // Anzahl der erledigten Aufgaben
  let taskUrgent = filterBoardPrio("urgent"); // Anzahl der dringenden Aufgaben
  let taskProgress = filterBoardStatus("inProgress"); // Anzahl der Aufgaben im Status "In Progress"
  let taskFeedback = filterBoardStatus("awaitFeedback"); // Anzahl der Aufgaben im Status "Awaiting Feedback"
  let taskBoard = taskDo + taskDone + taskProgress + taskFeedback; // Gesamtanzahl der Aufgaben im Board
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
      greeting.classList.remove("none"); // Entfernt die Klasse "none", um die Begrüßungsnachricht anzuzeigen
      sessionStorage.setItem("animationGreetingPlayed", true); // Speichert, dass die Begrüßungsanimation abgespielt wurde
      setTimeout(function () {
        greeting.classList.add("none"); // Fügt die Klasse "none" hinzu, um die Begrüßungsnachricht nach einer Sekunde auszublenden
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
        greeting.classList.add("none"); // Blendet die Begrüßungsnachricht aus, wenn der Bildschirm zu klein ist
      }
    } else {
      if (greeting.classList.contains("none")) {
        greeting.classList.remove("none"); // Zeigt die Begrüßungsnachricht wieder an, wenn der Bildschirm groß genug ist
      }
    }
  }
}

window.onresize = function () {
  greetingResponsiv(); // Überprüft die Bildschirmgröße beim Ändern der Fenstergröße
};

/**
 * Filtert die Anzahl der Aufgaben basierend auf ihrem Status.
 * Filters the number of tasks based on their status.
 * @param {string} x - Der Status der Aufgaben, der gefiltert werden soll.
 * @returns {number} - Die Anzahl der Aufgaben mit dem angegebenen Status.
 */
function filterBoardStatus(x) {
  let userTasks = userData[userIndex]["tasks"]; // Holt sich die Aufgaben des Benutzers
  const result = userTasks.filter((task) => task.status === x).length; // Filtert die Aufgaben nach dem angegebenen Status und zählt sie
  return result;
}

/**
 * Filtert die Anzahl der Aufgaben basierend auf ihrer Priorität.
 * Filters the number of tasks based on their priority.
 * @param {string} x - Die Priorität der Aufgaben, die gefiltert werden soll.
 * @returns {number} - Die Anzahl der Aufgaben mit der angegebenen Priorität.
 */
function filterBoardPrio(x) {
  let userTasks = userData[userIndex]["tasks"]; // Holt sich die Aufgaben des Benutzers
  const result = userTasks.filter((task) => task.priority === x).length; // Filtert die Aufgaben nach der angegebenen Priorität und zählt sie
  return result;
}

/**
 * Leitet zur "board.html" Seite weiter.
 * Redirects to the "board.html" page.
 */
function loadBoard() {
  window.location.href = "board.html";
}
