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
];

function initContacts() {
    let list = document.getElementById('contacts-list');

    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        let surname = contacts[i]['surname'];
        let email = contacts[i]['email'];
        //initialien werden später beim anlegen des contacts erstellt und gepushed!
        //eine Farbe für den Profile badge auch beim anlegen per random function zuweisen?!
        contacts[i]['initials'] = name.charAt(0)+surname.charAt(0);
        let initials = contacts[i]['initials'];
        let badge = contacts[i]['badgecolor'];

        list.innerHTML += /*HTML*/`
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
    console.log('contacts = ', contacts);
}