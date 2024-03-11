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


//3. USERDATA anlegen (set) und/oder abrufen (get)! ...und die UserData löschen!

async function setUserData() {
    let userName = 'guest';             //hier den sign up input Name einfügen
    let userEmail = 'guest@guest.com';  //hier den sign up input E-Mail einfügen
    let userPassword = 'guest';         //hier den sign up input Passwort oder bestätigtes Passwort einfügen


    let newUser =
        {
        name: userName,
        email: userEmail,
        password: userPassword,
        contacts: [],
        tasks: [],
    }
    ;
    //Abfrage, ob User bereits angelegt -> habe ich bisher nicht hinbekommen. Es wurde immer Alert geschmissen:

    userData.push(newUser);
    await setItem('userData', JSON.stringify(userData));

    /* if(userData[userIndex]['email'] == !userEmail) {
    userData.push(newUser);
    await setItem('userData', JSON.stringify(userData));
    } else {
        alert('There is already a user with this email address.')
    }; */
}

async function getUserData() {
    try {
        userData = JSON.parse(await getItem('userData'));
        } catch(e) {
            console.warn('Could not load User')
        };
}

//löscht die gesamten Userdata!!!
async function deleteAllUserData() {
    userData = [];
    await setItem('userData', JSON.stringify(userData));
}