let rememberMeActiv = "false";
let loginExists = "false";
const loadSignUp = document.getElementById("loadSignUp");
let loginIndex;
let rememberMepw;
let rememberMeEmail;
const checkbox = document.getElementById("rememberMe");

loadSignUp.addEventListener("click", function () {
  window.location.href = "signUp.html";
});

function render() {
  fillInput();
}

function fillInput() {
  if (rememberMeActiv == "true") {
    pwInput.value = rememberMepw;
    emailInput.value = rememberMeEmail;
    checkbox.src = "./img/icons/checkbox-checked.svg";
  }
}

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
 * Aktualisiert das Bild des Passwortfeldsymbols, basierend darauf, ob das Passwortfeld leer ist oder nicht.
 */
const pwInput = document.getElementById("logInPassword");

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
 */
const pwIcon = document.getElementById("logInpwIcon");

pwIcon.addEventListener("click", function () {
  if (pwInput.type === "password") {
    pwIcon.src = "./img/icons/visibility.svg";
    pwInput.type = "text";
  } else {
    pwIcon.src = "./img/icons/visibility_off.svg";
    pwInput.type = "password";
  }
});

const emailInput = document.getElementById("logInemail");

const logInForm = document.getElementById("logInForm");

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

function checkUserData() {
  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    if (
      emailInput.value.trim() == element["email"] &&
      pwInput.value.trim() == element["password"]
    ) {
      loginExists = "true";
      loginIndex = i;
      break;
    } else {
      loginExists = "false";
    }
  }
}

function saveInputs() {
  if (rememberMeActiv == "true") {
    rememberMepw = pwInput.value.trim();
    rememberMeEmail = emailInput.value.trim();
  }
  save();
}

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

function hideErrorMessageLogin() {
  let pwField = document.getElementById("pwField");
  let errorM = document.getElementById("errorMessage");
  if (pwField.classList.contains("loginPassword-field")) {
    pwField.classList.remove("loginPassword-field");
    errorM.classList.add("none");
  }
}

function guestLogin() {
  loginIndex = 0;
  window.location.href = "index.html";
}

function logoAnimation() {
  return /*html*/ `<div class="logoAnimation" id='animationLogo'>
  <div class="animation-body" id=signUpSuccess>
    <img src="./img/icons/Capa 1.svg" alt="Logo">
  </div>
</div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  if (!sessionStorage.getItem("animationPlayed")) {
    document.body.insertAdjacentHTML("beforeend", logoAnimation());
    sessionStorage.setItem("animationPlayed", true);
    setTimeout(function () {
      document.getElementById("logInLogo").style.display = "flex";
    }, 1500);
    setTimeout(function () {
      let logo = document.getElementById("animationLogo");
      if (logo) {
        logo.remove();
      }
    }, 1600);
  } else {
    document.getElementById("logInLogo").style.display = "flex";
  }
});
