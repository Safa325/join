let contacts = [
    {
        'badgecolor': "#FF7A00",
        'initials': "",
        'name': "Pia",
        'surname': "Nist",
        'email': "PiaNist@mitherz.com"    
    },
    {
        'badgecolor': "#FF5EB3",
        'initials': "",
        'name': "Rainer",
        'surname': "Sonnenschein",
        'email': "gutes@wetter.de"    
    },
    {
        'badgecolor': "#6E52FF",
        'initials': "",
        'name': "Klara",
        'surname': "Himmel",
        'email': "bitte@sommer.com"    
    },
    {
        'badgecolor': "#6E52FF",
        'initials': "",
        'name': "Karl",
        'surname': "Ender",
        'email': "Karl@ender.com"    
    },
];

let letters = [];

function addContact() {
    let addContact = document.getElementById('add-contact-container');

    addContact.innerHTML = /*HTML*/`
    
    `;

}


//noch nicht fertig - Findungsphase Konzept



function initContacts(filter) {
    let list = document.getElementById('contacts-list');
    list.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        let surname = contacts[i]['surname'];
        let email = contacts[i]['email'];
        contacts[i]['initials'] = name.charAt(0)+surname.charAt(0);
        let initials = contacts[i]['initials'];
        let badge = contacts[i]['badgecolor'];
        let firstLetter = initials.charAt(0);

        if (!filter || filter == firstLetter) {
            list.innerHTML += generateContact(name, surname, email, initials, badge);
        };

        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        };
        renderLetters();
    };

    
}

function renderLetters() {
    let letterbox = document.getElementById('letterbox');
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += `<div>${letter}</div>`;
    }
}

function generateContact(name, surname, email, initials, badge) {
    return `<div id="letterbox"></div>
    <div class="person-container">
        <div class="initials-circle" style="background-color: ${badge};">${initials}</div>
        <div class="d-column-flex-start">
            <div class="person-name">
                <div>${name}</div>&nbsp
                <div>${surname}</div>
            </div>
            <div class="person-email">${email}</div>
        </div>
    </div>
    `;
}