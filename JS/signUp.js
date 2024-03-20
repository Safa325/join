/**
 * Die Checkbox für die Zustimmung.
 * The checkbox for consent.
 * @type {HTMLElement}
 */
const checkbox = document.getElementById("checkbox");

/**
 * Das Container-Element für das Checkbox-Input.
 * The container element for the checkbox input.
 * @type {HTMLElement}
 */
const inputCheckbox = document.getElementById("inputCheckbox");

/**
 * Der Zustand der Checkbox-Zustimmung.
 * The state of the checkbox consent.
 * @type {string}
 */
let checkboxAccept = "false";

/**
 * Der Zustand, ob die Passwörter übereinstimmen.
 * The state indicating whether passwords match.
 * @type {string}
 */
let matchingPw = "false";

/**
 * Das Eingabefeld für das Passwort.
 * The input field for the password.
 * @type {HTMLElement}
 */
const pwInput = document.getElementById("password");

/**
 * Das Eingabefeld für die Bestätigung des Passworts.
 * The input field for confirming the password.
 * @type {HTMLElement}
 */
const cpwInput = document.getElementById("confirmPassword");

/**
 * Das Symbol für das Passwort.
 * The symbol for the password.
 * @type {HTMLElement}
 */
const pwIcon = document.getElementById("pwIcon");

/**
 * Das Symbol für die Bestätigung des Passworts.
 * The symbol for confirming the password.
 * @type {HTMLElement}
 */
const cpwIcon = document.getElementById("cpwIcon");

/**
 * Das Formularelement für die Registrierung.
 * The form element for registration.
 * @type {HTMLElement}
 */
let signUpForm = document.getElementById("signUpForm");

/**
 * Ändert das Bild des Kontrollkästchens beim Überfahren mit der Maus, wenn das Kontrollkästchen akzeptiert ist.
 * Changes the image of the checkbox on mouseover if the checkbox is accepted.
 */
inputCheckbox.addEventListener("mouseover", function () {
  if (checkboxAccept == "true") {
    checkbox.src = "./img/icons/checkbox-checked.svg";
  }
});

/**
 * Setzt das Bild des Kontrollkästchens zurück, wenn die Maus das Kontrollkästchen verlässt.
 * Resets the image of the checkbox when the mouse leaves the checkbox.
 */
inputCheckbox.addEventListener("mouseout", function () {
  checkbox.src = "./img/icons/checkbox-unchecked.svg";
});

/**
 * Ändert den Status des Kontrollkästchens und aktualisiert das Bild entsprechend.
 * Toggles the state of the checkbox and updates the image accordingly.
 */
function acceptCheckbox() {
  if (checkboxAccept == "true") {
    checkboxAccept = "false";
  } else {
    checkbox.src = "./img/icons/checkbox-checked.svg";
    checkboxAccept = "true";
  }
}

/**
 * Aktualisiert das Bild des Passwortfeldsymbols, basierend darauf, ob das Passwortfeld leer ist oder nicht.
 * Updates the image of the password field icon based on whether the password field is empty or not.
 */
pwInput.addEventListener("input", function () {
  if (pwInput.value.trim() !== "") {
    pwIcon.src = "./img/icons/visibility_off.svg";
  } else {
    pwIcon.src = "./img/icons/lock.svg";
    pwInput.type = "password";
  }
});

/**
 * Aktualisiert das Bild des Bestätigungspasswortfeldsymbols, basierend darauf, ob das Passwortfeld leer ist oder nicht.
 * Updates the image of the confirmation password field icon based on whether the password field is empty or not.
 */
cpwInput.addEventListener("input", function () {
  if (cpwInput.value.trim() !== "") {
    cpwIcon.src = "./img/icons/visibility_off.svg";
  } else {
    cpwIcon.src = "./img/icons/lock.svg";
    cpwInput.type = "password";
  }
});

/**
 * Ändert den Typ des Passwortfelds zwischen Text und Passwort und aktualisiert das Bild des Passwortsymbols entsprechend.
 * Toggles the type of the password field between text and password and updates the password symbol accordingly.
 */
pwIcon.addEventListener("click", function () {
  if (pwInput.type === "password") {
    pwIcon.src = "./img/icons/visibility.svg";
    pwInput.type = "text";
  } else {
    pwIcon.src = "./img/icons/visibility_off.svg";
    pwInput.type = "password";
  }
});

/**
 * Ändert den Typ des Bestätigungspasswortfelds zwischen Text und Passwort und aktualisiert das Bild des Bestätigungspasswortsymbols entsprechend.
 * Toggles the type of the confirmation password field between text and password and updates the confirmation password symbol accordingly.
 */
cpwIcon.addEventListener("click", function () {
  if (cpwInput.type === "password") {
    cpwIcon.src = "./img/icons/visibility.svg";
    cpwInput.type = "text";
  } else {
    cpwIcon.src = "./img/icons/visibility_off.svg";
    cpwInput.type = "password";
  }
});

/**
 * Überprüft die Übereinstimmung des Bestätigungspassworts mit dem Hauptpasswort, wenn das Bestätigungspasswortfeld geändert wird.
 * Checks if the confirmation password matches the main password when the confirmation password field is changed.
 */
cpwInput.addEventListener("change", function () {
  let cpwField = document.getElementById("cpwField");
  let errorM = document.getElementById("errorMessage");

  if (pwInput.value.trim() == cpwInput.value.trim()) {
    matchingPw = "true";
    if (cpwField.classList.contains("confirmPassword-field")) {
      cpwField.classList.remove("confirmPassword-field");
      errorM.classList.add("none");
    }
  } else {
    cpwField.classList.add("confirmPassword-field");
    errorM.classList.remove("none");
    matchingPw = "false";
  }
});

/**
 * Verhindert das Standardverhalten des Formulars beim Einreichen und überprüft die eingegebenen Daten.
 * Prevents the default behavior of the form submission and validates the entered data.
 */
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default behavior of the form

  // Holt sich die eingegebenen Werte für Name, E-Mail und Passwort
  let name = document.getElementById("name").value; // Gets the entered value for name
  let email = document.getElementById("email").value; // Gets the entered value for email
  let password = document.getElementById("password").value; // Gets the entered value for password

  // Überprüft, ob die Datenschutzrichtlinie akzeptiert wurde
  if (checkboxAccept == "false") {
    alert("Bitte akzeptieren Sie die Datenschutzrichtlinie!"); // Zeigt eine Benachrichtigung an, wenn die Datenschutzrichtlinie nicht akzeptiert wurde
  }

  // Überprüft, ob die Passwörter übereinstimmen
  if (matchingPw == "false") {
    alert("Bitte stellen Sie sicher, dass Ihre Passwörter übereinstimmen."); // Zeigt eine Benachrichtigung an, wenn die Passwörter nicht übereinstimmen
  } else {
    chekEmailExists(name, email, password); // Ruft die Funktion auf, um zu überprüfen, ob die E-Mail bereits registriert ist
    e.preventDefault(); // Verhindert das erneute Einreichen des Formulars
  }
});

/**
 * Gibt eine Erfolgsmeldung für die Registrierung aus.
 * Displays a success message for registration.
 */
function signUpSuccess() {
  return /*html*/ `<div class="signUpSuccessCard">
   <div class="successBody" id=signUpSuccess>
     Your Sign Up was successful
   </div>
 </div>`;
}

/**
 * Führt eine Erfolgsanimation aus und leitet dann auf die Anmeldeseite weiter.
 * Executes a success animation and then redirects to the login page.
 */
function animationSuccess() {
  document.body.insertAdjacentHTML("beforeend", signUpSuccess());
  checkboxAccept = "false";
  matchingPw = "false";
  setTimeout(function () {
    window.location.href = "login.html";
  }, 2000);
}

const backToLogin = document.getElementById("backToLogIn");

backToLogin.addEventListener("click", function () {
  window.location.href = "login.html";
});

/**
 * Speichert die Benutzerdaten in einem Array.
 * Saves the user data in an array.
 * @param {string} name - Der Benutzername.
 * @param {string} email - Die E-Mail-Adresse des Benutzers.
 * @param {string} password - Das Passwort des Benutzers.
 */
function saveUserData(name, email, password) {
  const useData = {
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
    contacts: [],
    tasks: [],
  };
  userData.push(useData);
  save();
}

/**
 * Führt die erfolgreiche Registrierung aus und leitet zur Anmeldeseite weiter.
 * Executes successful registration and redirects to the login page.
 */
function chekEmailExists(name, email, password) {
  let existingUser = false;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].email === email) {
      existingUser = true;
      break;
    }
  }
  if (!existingUser) {
    saveUserData(name, email, password);
    animationSuccess();
  } else {
    alert("This email already exists. Please use a different email.");
  }
}
