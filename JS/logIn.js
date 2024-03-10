let rememberMeActiv = "false";
let pwExists = "false";
let emailExists = "false";
const loadSignUp = document.getElementById("loadSignUp");
let loginIndex;
let rememberMepw = "";
let rememberMeEmail = "";

loadSignUp.addEventListener("click", function () {
  window.location.href = "signUp.html";
});

function rememberMe() {
  const checkbox = document.getElementById("rememberMe");
  if (pwInput.value.trim() !== "" && emailInput.value.trim() !== "") {
    rememberMepw = pwInput.value.trim();
    rememberMeEmail = emailInput.value.trim();
    if (rememberMeActiv == "true") {
      checkbox.src = "./img/icons/checkbox.svg";
      rememberMeActiv = "false";
    } else {
      checkbox.src = "./img/icons/checkedbox.svg";
      rememberMeActiv = "true";
    }
  } else {
    alert("Please enter your user data");
  }
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

pwInput.addEventListener("input", function () {
  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    if (pwInput.value.trim() == element["password"]) {
      pwExists = "true";
      loginIndex = i;
    } else {
      pwExists = "false";
      loginIndex = "";
    }
  }
});

const emailInput = document.getElementById("logInemail");

emailInput.addEventListener("input", function () {
  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    if (emailInput.value.trim() == element["email"]) {
      emailExists = "true";
    } else {
      emailExists = "false";
    }
  }
});

const logInForm = document.getElementById("logInForm");

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (emailExists == "true" && pwExists == "true") {
    // window.location.href = "index.html";
    alert("Log in successfull");
  } else {
    alert("user data is false");
  }
});
