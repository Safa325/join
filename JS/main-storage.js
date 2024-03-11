// INFORMATION: Funktion getUserData() gibt uns 


//1. STORAGE Funktionen und Konstanten deklarieren!

const STORAGE_TOKEN = '9S1H4HWTZGHLKS4NMCOP04FRPPUG3BPBWN1B6HFV';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}

//2. ARRAYS!
let profileBadgeColors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B',];

let userData = [];                          //userData ALLER User

let userIndex = 0;                          //dieser Index variabel je nach aktiven User. 0 = Guest


//3. USERDATA anlegen (set) und/oder abrufen (get)!

async function setUserData() {
    let userName = 'guest';             //hier den sign up inuserput Name einfügen
    let userEmail = 'guest@guest.com';  //hier den sign up input E-Mail einfügen
    let userPassword = 'guest';         //hier den sign up input Passwort oder bestätigtes Passwort einfügen


    let newUser = {
        name: userName,
        email: userEmail,
        password: userPassword,
        contacts: [],
        tasks: [],
    }
    //Abfrage, ob User bereits angelegt -> habe ich bisher nicht hinbekommen. Es wurde immer Alert geschmissen:

    /* if(userData['email'] == !userEmail) { */
    userData.push(newUser);
    await setItem('userData', JSON.stringify(userData));
    /* } else {
        alert('There is already a user with this email address.')
    } */
}

async function getUserData() {
    try {
        userData = JSON.parse(await getItem('userData'));
        } catch(e) {
            console.warn('Could not load User')
        };
        getUserContacts();
}

async function getUserContacts() {
    try {
        userContacts = JSON.parse(await getItem('contacts'));
        } catch(e) {
            console.warn('Could not load contacts')
        };
}

//löscht die gesamten Userdata!!!
async function deleteAllUserData() {
    userData = [];
    await setItem('userData', JSON.stringify(userData));
}

//4.1 CONTACTS am User speichern!

//funktioniert noch nicht richtig!

async function createContact() {
    let inputName = document.getElementById('addcontact-input-name').value;
    let inputEmail = document.getElementById('addcontact-input-email').value;
    let inputPhone = document.getElementById('addcontact-input-phone').value;

    //Badgecolor random zuweisen
    let min = 0;
    let max = profileBadgeColors.length;
    let indexBadge = Math.round(Math.random() * (max - min)) + min;
    let badge = profileBadgeColors[indexBadge];

    let firstletter = inputName.charAt(0);
    
    let string = inputName;

    let names = string.split(' ');
    let firstletters = names[0].substring(0,1).toUpperCase();
        if (names.length > 1) {
            firstletters += names[1].substring(0, 1).toUpperCase();
        };

    let newContact = {
        badgecolor: badge,
        initials: firstletters,
        register: firstletter,
        name: inputName,
        email: inputEmail,
        phone: inputPhone
    };

    userData[userIndex]['contacts'].push(newContact);

    await setItem('contacts', JSON.stringify(userData[userIndex]['contacts']));

    inputName.innerHTML = ``;
    inputEmail.innerHTML = ``;
    inputPhone.innerHTML = ``;
    await initContacts();
    closeAddNewContact();
}

//4.2 TASKS am User speichern!