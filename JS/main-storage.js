//1. STORAGE - declare functions and contants!

const STORAGE_TOKEN = '9S1H4HWTZGHLKS4NMCOP04FRPPUG3BPBWN1B6HFV';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
    }).then((res) => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then((res) => res.json())
        .then((res) => res.data.value);
}

//2. ARRAYS!
let profileBadgeColors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
];

let userData = [];

let userIndex = '';

//3. USERDATA - set, get and delete userData

async function setUserData(name, email, password) {
    let newUserContacts = await getDataFromJSON('./dummyContacts.json');
    let newUserTasks = await getDataFromJSON('./dummyTasks.json');

    let newUser = {
        name: name,
        email: email,
        password: password,
        contacts: newUserContacts,
        tasks: newUserTasks,
    };

    userData.push(newUser);
    await setItem('userData', JSON.stringify(userData));
}

async function getDataFromJSON(url) {
    const response = await fetch(url);
    data = await response.json();
    return data;
}

async function chekEmailExists(name, email, password) {
    let emailExist = 'false';
    for (let i = 0; i < userData.length; i++) {
        const element = userData[i]['email'];
        if (element == email) {
            alert('There is already a user with this email address.');
            emailExist = 'true';
            break;
        }
    }
    if (emailExist == 'false') {
        setUserData(name, email, password);
        animationSuccess();
    }
}

//ädt die gesamten Userdata!!!
async function getUserData() {
    try {
        userData = JSON.parse(await getItem('userData'));
        loadSession();
    } catch (e) {
        console.warn('Could not load User');
    }
}

//löscht die gesamten Userdata!!!
async function deleteAllUserData() {
    userData = [];
    await setItem('userData', JSON.stringify(userData));
}

async function deleteUserByIndex(deleteIndex) {
    userData.splice(deleteIndex, 1);
    await setItem('userData', JSON.stringify(userData));
}

function saveSession() {
    let userIndexSession = JSON.stringify(userIndex);

    sessionStorage.setItem('userIndex', userIndexSession);
}

function loadSession() {
    let userIndexSession = sessionStorage.getItem('userIndex');

    if (userIndexSession) {
        userIndex = JSON.parse(userIndexSession);
    }
}
