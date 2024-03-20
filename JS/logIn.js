/**
 * Steuert die Aktivierung des "Remember Me"-Features.
 * Controls the activation of the "Remember Me" feature.
 */
let rememberMeActiv = "false";

/**
 * Überprüft, ob ein Benutzer beim Einloggen existiert.
 * Checks if a user exists during login.
 */
let loginExists = "false";

/**
 * Das Element zum Laden der Registrierungsseite.
 * The element for loading the sign-up page.
 */
const loadSignUp = document.getElementById("loadSignUp");

/**
 * Das Passwort, an das sich "Remember Me" erinnern soll.
 * The password to be remembered by "Remember Me".
 */
let rememberMepw;

/**
 * Die E-Mail-Adresse, an die sich "Remember Me" erinnern soll.
 * The email to be remembered by "Remember Me".
 */
let rememberMeEmail;

/**
 * Das Kontrollkästchenelement für "Remember Me".
 * The checkbox element for "Remember Me".
 */
const checkbox = document.getElementById("rememberMe");

/**
 * Leitet zur Registrierungsseite weiter, wenn auf das Element zum Laden der Registrierungsseite geklickt wird.
 * Redirects to the sign-up page when the element for loading the sign-up page is clicked.
 */
loadSignUp.addEventListener("click", function () {
  window.location.href = "signUp.html";
});

/**
 * Rendert die Benutzeroberfläche.
 * Renders the user interface.
 */
function render() {
  fillInput();
}

/**
 * Füllt die Eingabefelder mit gespeicherten Daten, wenn das "Remember Me"-Feature aktiviert ist.
 * Fills the input fields with saved data when the "Remember Me" feature is activated.
 */
function fillInput() {
  if (rememberMeActiv == "true") {
    pwInput.value = rememberMepw;
    emailInput.value = rememberMeEmail;
    checkbox.src = "./img/icons/checkbox-checked.svg";
  }
}

/**
 * Aktiviert oder deaktiviert das "Remember Me"-Feature.
 * Toggles the "Remember Me" feature.
 */
function rememberMe() {
  if (rememberMeActiv == "true") {
    checkbox.src = "./img/icons/checkbox-unchecked.svg";
    rememberMeActiv = "false";
    rememberMepw = "";
    rememberMeEmail = "";
  } else {
    checkbox.src = "./img/icons/checkbox-checked.svg";
    rememberMeActiv = "true";
  }
  save();
}

/**
 * Das Eingabefeld für das Passwort.
 * The input field for the password.
 */
const pwInput = document.getElementById("logInPassword");

/**
 * Das Symbol für das Passwort.
 * The icon for the password.
 */
const pwIcon = document.getElementById("logInpwIcon");

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
 * Ändert den Typ des Passwortfelds zwischen Text und Passwort und aktualisiert das Bild des Passwortsymbols entsprechend.
 * Toggles the type of the password field between text and password and updates the image of the password icon accordingly.
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
 * Das Eingabefeld für die E-Mail-Adresse beim Einloggen.
 * The input field for the email address during login.
 */
const emailInput = document.getElementById("logInemail");

/**
 * Das Formularelement für das Einloggen.
 * The form element for logging in.
 */
const logInForm = document.getElementById("logInForm");

/**
 * Überprüft die Benutzerdaten beim Einloggen.
 * Checks user data during login.
 */
function checkUserData() {
  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    userIndex = i;
    if (
      emailInput.value.trim() == element["email"] &&
      pwInput.value.trim() == element["password"]
    ) {
      loginExists = "true";
      saveSession();
      break;
    } else {
      loginExists = "false";
    }
  }
}

/**
 * Verarbeitet das Einreichen des Einloggen-Formulars.
 * Handles the submission of the login form.
 */
logInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkUserData();
  hideErrorMessageLogin();
  if (loginExists == "true") {
    saveInputs();
    window.location.href = "index.html";
  } else {
    errorMessageLogin();
  }
});

/**
 * Speichert die Eingaben, wenn das "Remember Me"-Feature aktiviert ist.
 * Saves the inputs if the "Remember Me" feature is activated.
 */
function saveInputs() {
  if (rememberMeActiv == "true") {
    rememberMepw = pwInput.value.trim();
    rememberMeEmail = emailInput.value.trim();
  }
  save();
}

/**
 * Zeigt eine Fehlermeldung beim Einloggen an.
 * Displays an error message during login.
 */
function errorMessageLogin() {
  let pwField = document.getElementById("pwField");
  let errorM = document.getElementById("errorMessage");
  if (errorM.classList.contains("none")) {
    pwField.classList.add("loginPassword-field");
    errorM.classList.remove("none");
    pwInput.value = "";
  }
  rememberMepw = "";
  rememberMeEmail = "";
  save();
}

/**
 * Verbirgt die Fehlermeldung beim Einloggen.
 * Hides the error message during login.
 */
function hideErrorMessageLogin() {
  let pwField = document.getElementById("pwField");
  let errorM = document.getElementById("errorMessage");
  if (pwField.classList.contains("loginPassword-field")) {
    pwField.classList.remove("loginPassword-field");
    errorM.classList.add("none");
  }
}

/**
 * Führt einen Gast-Login durch.
 * Performs a guest login.
 */
function guestLogin() {
  userIndex = 0; // Setzt den Benutzerindex auf 0 für den Gast-Login
  window.location.href = "index.html"; // Weiterleitung zur Hauptseite
  saveSession(); // Speichert die Sitzungsinformationen
}

/**
 * Erstellt die HTML-Struktur für die Logo-Animation.
 * Creates the HTML structure for the logo animation.
 * @returns {string} - Die HTML-Struktur für die Logo-Animation.
 */
function logoAnimation() {
  return /*html*/ `<div class="logoAnimation" id="animationLogo1">
  <div class="animation-body" id="animationLogo">
    <img id="logInLogo1" src="./img/icons/Capa 1.svg" alt="Logo">
  </div>
</div>`;
}

/**
 * Überprüft die Bildschirmbreite und ändert das Logo entsprechend.
 * Checks the screen width and changes the logo accordingly.
 */
function checkWidth() {
  const img = document.getElementById("logInLogo1");
  if (window.innerWidth <= 680) {
    img.src = "./img/join_logo.svg"; // Ändert das Logo für kleinere Bildschirme
    setTimeout(function () {
      img.src = "./img/icons/Capa 1.svg"; // Setzt das Logo nach einer Sekunde zurück
    }, 1000);
  } else {
    img.src = "./img/icons/Capa 1.svg"; // Behält das Standardlogo bei größeren Bildschirmen bei
  }
}

/**
 * Fügt die Animationseffekte hinzu.
 * Adds the animation effects.
 */
function addAnimation() {
  setTimeout(function () {
    document.getElementById("animationLogo").style.animation =
      "slide-topLeft 1.2s ease forwards"; // Führt die Slide-TopLeft Animation für das Logo durch
    document.getElementById("animationLogo1").style.animation =
      "fade-out 1.2s ease forwards"; // Führt die Fade-Out Animation für das Animationselement durch
  }, 200);
}

// Führt die Animation beim Laden der Seite aus
document.addEventListener("DOMContentLoaded", function () {
  if (!sessionStorage.getItem("animationPlayed")) {
    // Überprüft, ob die Animation bereits abgespielt wurde
    document.body.insertAdjacentHTML("beforeend", logoAnimation()); // Fügt die HTML-Struktur für die Animation ein
    checkWidth(); // Überprüft die Bildschirmbreite für die Logo-Anpassung
    sessionStorage.setItem("animationPlayed", true); // Speichert, dass die Animation abgespielt wurde
    addAnimation(); // Fügt die Animationseffekte hinzu
    setTimeout(function () {
      document.getElementById("logInLogo").style.display = "flex"; // Zeigt das Logo nach 1,5 Sekunden an
    }, 1500);
    setTimeout(function () {
      let logo = document.getElementById("animationLogo1");
      if (logo) {
        logo.remove(); // Entfernt das Animationselement nach 1,6 Sekunden
      }
    }, 1600);
  } else {
    document.getElementById("logInLogo").style.display = "flex"; // Zeigt das Logo an, wenn die Animation bereits abgespielt wurde
  }
});
