/**
 * Die Checkbox für die Zustimmung.
 * The checkbox for consent.
 * @type {HTMLElement}
 */
const checkbox = document.getElementById('checkbox');

/**
 * Das Container-Element für das Checkbox-Input.
 * The container element for the checkbox input.
 * @type {HTMLElement}
 */
const inputCheckbox = document.getElementById('inputCheckbox');

/**
 * Der Zustand der Checkbox-Zustimmung.
 * The state of the checkbox consent.
 * @type {string}
 */
let checkboxAccept = 'false';

/**
 * Der Zustand, ob die Passwörter übereinstimmen.
 * The state indicating whether passwords match.
 * @type {string}
 */
let matchingPw = 'false';

/**
 * Das Eingabefeld für das Passwort.
 * The input field for the password.
 * @type {HTMLElement}
 */
const pwInput = document.getElementById('password');

/**
 * Das Eingabefeld für die Bestätigung des Passworts.
 * The input field for confirming the password.
 * @type {HTMLElement}
 */
const cpwInput = document.getElementById('confirmPassword');

/**
 * Das Symbol für das Passwort.
 * The symbol for the password.
 * @type {HTMLElement}
 */
const pwIcon = document.getElementById('pwIcon');

/**
 * Das Symbol für die Bestätigung des Passworts.
 * The symbol for confirming the password.
 * @type {HTMLElement}
 */
const cpwIcon = document.getElementById('cpwIcon');

/**
 * Das Formularelement für die Registrierung.
 * The form element for registration.
 * @type {HTMLElement}
 */
let signUpForm = document.getElementById('signUpForm');

function acceptCheckbox() {
    let checkBox = document.getElementById('errorMessageBox');
    if (checkboxAccept == 'true') {
        checkbox.src = './img/icons/checkbox-unchecked.svg';
        checkboxAccept = 'false';
    } else {
        checkbox.src = './img/icons/checkbox-checked.svg';
        checkboxAccept = 'true';
        if (checkBox.classList.contains('none')) {
        } else {
            checkBox.classList.add('zero-opacity');
        }
    }
}

/**
 * Aktualisiert das Bild des Passwortfeldsymbols, basierend darauf, ob das Passwortfeld leer ist oder nicht.
 * Updates the image of the password field icon based on whether the password field is empty or not.
 */
pwInput.addEventListener('input', function () {
    if (pwInput.value.trim() !== '') {
        pwIcon.src = './img/icons/visibility_off.svg';
    } else {
        pwIcon.src = './img/icons/lock.svg';
        pwInput.type = 'password';
    }
});

/**
 * Aktualisiert das Bild des Bestätigungspasswortfeldsymbols, basierend darauf, ob das Passwortfeld leer ist oder nicht.
 * Updates the image of the confirmation password field icon based on whether the password field is empty or not.
 */
cpwInput.addEventListener('input', function () {
    if (cpwInput.value.trim() !== '') {
        cpwIcon.src = './img/icons/visibility_off.svg';
    } else {
        cpwIcon.src = './img/icons/lock.svg';
        cpwInput.type = 'password';
    }
});

/**
 * Ändert den Typ des Passwortfelds zwischen Text und Passwort und aktualisiert das Bild des Passwortsymbols entsprechend.
 * Toggles the type of the password field between text and password and updates the password symbol accordingly.
 */
pwIcon.addEventListener('click', function () {
    if (pwInput.type === 'password') {
        pwIcon.src = './img/icons/visibility.svg';
        pwInput.type = 'text';
    } else {
        pwIcon.src = './img/icons/visibility_off.svg';
        pwInput.type = 'password';
    }
});

/**
 * Ändert den Typ des Bestätigungspasswortfelds zwischen Text und Passwort und aktualisiert das Bild des Bestätigungspasswortsymbols entsprechend.
 * Toggles the type of the confirmation password field between text and password and updates the confirmation password symbol accordingly.
 */
cpwIcon.addEventListener('click', function () {
    if (cpwInput.type === 'password') {
        cpwIcon.src = './img/icons/visibility.svg';
        cpwInput.type = 'text';
    } else {
        cpwIcon.src = './img/icons/visibility_off.svg';
        cpwInput.type = 'password';
    }
});

/**
 * Überprüft die Übereinstimmung des Bestätigungspassworts mit dem Hauptpasswort, wenn das Bestätigungspasswortfeld geändert wird.
 * Checks if the confirmation password matches the main password when the confirmation password field is changed.
 */
cpwInput.addEventListener('change', function () {
    let cpwField = document.getElementById('cpwField');
    let errorM = document.getElementById('errorMessage');

    if (pwInput.value.trim() == cpwInput.value.trim()) {
        matchingPw = 'true';
        if (cpwField.classList.contains('confirmPassword-field')) {
            cpwField.classList.remove('confirmPassword-field');
            errorM.classList.add('none');
        }
    } else {
        cpwField.classList.add('confirmPassword-field');
        errorM.classList.remove('none');
        matchingPw = 'false';
    }
});

let email = document.getElementById('email');

email.addEventListener('change', function () {
    let emailField = document.getElementById('emailField');
    let errorM = document.getElementById('errorMessageEmail');
    if (emailField.classList.contains('confirmPassword-field')) {
        emailField.classList.remove('confirmPassword-field');
        errorM.classList.add('none');
    }
});

function errorEmail() {
    let emailField = document.getElementById('emailField');
    let errorM = document.getElementById('errorMessageEmail');
    emailField.classList.add('confirmPassword-field');
    errorM.classList.remove('none');
}

/**
 * Verhindert das Standardverhalten des Formulars beim Einreichen und überprüft die eingegebenen Daten.
 * Prevents the default behavior of the form submission and validates the entered data.
 */
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let checkBox = document.getElementById('errorMessageBox');
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (checkboxAccept == 'false') {
        checkBox.classList.remove('zero-opacity');
    } else {
        chekEmailExists(name, email, password);
        e.preventDefault();
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
    document.body.insertAdjacentHTML('beforeend', signUpSuccess());
    checkboxAccept = 'false';
    matchingPw = 'false';
    setTimeout(function () {
        window.location.href = 'login.html';
    }, 2000);
}

const backToLogin = document.getElementById('backToLogIn');

backToLogin.addEventListener('click', function () {
    window.location.href = 'login.html';
});

function newTab(x) {
    if (x == '1') {
        window.open('newTab.html', '_blank');
        localStorage.setItem('Privacy', 'true');
    } else {
        window.open('newTab.html', '_blank');
        localStorage.setItem('Privacy', 'false');
    }
}
