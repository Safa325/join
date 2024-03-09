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
]

let contacts = [
    {
        'A': [
            {
            'badgecolor': "#FF7A00",
            'initials': "",
            'name': "Alfred Neumann",
            'email': "alfred@neumann.com",
            'phone': "0176/1234567"
            },
            {
            'badgecolor': "#FF7A00",
            'initials': "",
            'name': "Anna Fröhlich",
            'email': "fröhlich@anna.com",
            'phone': "0176/1234567"
            },

            ],
   
        'B': [], 'C': [], 'D': [], 'E': [], 'F': [], 'G': [], 'H': [], 
        'I': [], 'J': [], 
        
        'K': [
            {
                'badgecolor': "#6E52FF",
                'initials': "",
                'name': "Klara Himmel",
                'email': "bitte@sommer.com"    
            },
            {
                'badgecolor': "#6E52FF",
                'initials': "",
                'name': "Karl Ender",
                'email': "Karl@ender.com"    
            },
        ], 
        
        'L': [], 'M': [], 'N': [], 'O': [], 
        
        'P': [
            {
                'badgecolor': "#FF7A00",
                'initials': "",
                'name': "Pia Nist",
                'email': "PiaNist@mitherz.com"    
            },
        ], 

        'Q': [], 
        
        'R': [
            {
                'badgecolor': "#FF5EB3",
                'initials': "",
                'name': "Rainer Sonnenschein",
                'email': "gutes@wetter.de"    
            },
        ], 
        
        'S': [], 'T': [], 'U': [], 'V': [], 'W': [], 'X': [], 
        'Y': [], 'Z': [], 
    }
];

console.log('contacts ', contacts);

let letters = [];

function addContact() {
    let inputName = document.getElementById('addcontact-input-name').value;
    let inputEmail = document.getElementById('addcontact-input-email').value;
    let inputPhone = document.getElementById('addcontact-input-phone').value;

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
        name: inputName,
        email: inputEmail,
        phone: inputPhone
    }

    contacts['0'][firstletter].push(newContact);



    console.log('contacts ', contacts);
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