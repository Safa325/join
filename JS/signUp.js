/**
 * Die Checkbox für die Zustimmung.
 * @type {HTMLElement}
 */
const checkbox = document.getElementById("checkbox");

/**
 * Das Container-Element für das Checkbox-Input.
 * @type {HTMLElement}
 */
const inputCheckbox = document.getElementById("inputCheckbox");

/**
 * Der Zustand der Checkbox-Zustimmung.
 * @type {string}
 */
let checkboxAccept = "false";

/**
 * Der Zustand, ob die Passwörter übereinstimmen.
 * @type {string}
 */
let matchingPw = "false";

/**
 * Das Eingabefeld für das Passwort.
 * @type {HTMLElement}
 */
const pwInput = document.getElementById("password");

/**
 * Das Eingabefeld für die Bestätigung des Passworts.
 * @type {HTMLElement}
 */
const cpwInput = document.getElementById("confirmPassword");

/**
 * Das Symbol für das Passwort.
 * @type {HTMLElement}
 */
const pwIcon = document.getElementById("pwIcon");

/**
 * Das Symbol für die Bestätigung des Passworts.
 * @type {HTMLElement}
 */
const cpwIcon = document.getElementById("cpwIcon");

/**
 * Das Formularelement für die Registrierung.
 * @type {HTMLElement}
 */
let signUpForm = document.getElementById("signUpForm");

/**
 * Ändert das Bild des Kontrollkästchens beim Überfahren mit der Maus, wenn das Kontrollkästchen akzeptiert ist.
 */
inputCheckbox.addEventListener("mouseover", function () {
  if (checkboxAccept == "true") {
    checkbox.src = "./img/icons/checkbox-checked.svg";
  }
});

/**
 * Setzt das Bild des Kontrollkästchens zurück, wenn die Maus das Kontrollkästchen verlässt.
 */
inputCheckbox.addEventListener("mouseout", function () {
  checkbox.src = "./img/icons/checkbox-unchecked.svg";
});

/**
 * Ändert den Status des Kontrollkästchens und aktualisiert das Bild entsprechend.
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

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (checkboxAccept == "false") {
    alert("Please accept the priavcy policy!");
  }
  if (matchingPw == "false") {
    alert("Please match your passwords");
  } else {
    saveUserData(name, email, password);
    animationSuccess();
  }
});

function signUpSuccess() {
  return /*html*/ `<div class="signUpSuccessCard">
  <div class="successBody" id=signUpSuccess>
    You Sign Up was successful
  </div>
</div>`;
}

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
