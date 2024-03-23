function generateContactDetailsHTML(badgecolor, initials, name, email, phone, i) {
    return /*HTML*/ `
    <div id="details-container" class="details-container d-column-flex-start">
        <div id="detail-header" class="detail-header">
            <div id="person-details-badge" class="person-details-badge" style="background-color: ${badgecolor};">${initials}</div>
            <div class="name-right">
                <h2>${name}</h2>
                <div id="function-container" class="function-container">
                    <button id="edit-btn" class="edit-delete-btn" onclick="openContactSlider(${i})">
                        <img src="./img/icons/pencil-black.svg" alt="">    
                        <span>Edit</span>
                    </button>
                    <button id="delete-btn" class="edit-delete-btn" onclick="deleteContact(${i})">
                        <img src="./img/icons/trashcan-black.svg" alt="">   
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="contact-information-header">Contact Information</div>
        <div class="contact-information-container">
            <h6>E-Mail</h6>
            <a href="mailto:${email}" id="email-selected-contact">${email}</a>    
            <h6>Phone</h6>
            <span id="phone-selected-contact">${phone}</span>
        </div>
        <div id="confirmed"></div>
    </div>
    `;
}

function generateContactSliderContentHTML() {
    return /*html*/ `
    <div class="left-container">
        <img src="./img/join_logo.svg" alt="">
        <h1 id="window-headline" class="no-margin clr-white"></h1>
        <div id="window-claim" class="add-claim"></div>
        <div class="separator-across-lightblue"></div>
    </div>
    <div class="right-container">
        <div class="cancel-x" onclick="setSlideOutEffects()"><img src="./img/icons/cancel.svg" alt=""></div>

        <div id="person-badge" class="person-badge"></div>
        <div class="control-elements-container">
            <div class="inputfields">
                <label id="contact-name-label">
                    <input class="contact-inputField" type="text" id="contact-input-name" placeholder="Name" required>
                </label>
                <label id="contact-email-label">
                    <input class="contact-inputField" type="email" id="contact-input-email" placeholder="Email" required>
                </label>
                <label id="contact-phone-label">
                    <input class="contact-inputField" type="tel" id="contact-input-phone" placeholder="Phone" required>
                </label>
            </div>
            <div id="buttons-container" class="cancel-create-buttons-container"></div>
        </div>
    </div>
    `;
}

function openNewContactSliderHTML() {
    return /*html*/ `
        <button id="cancelBtn" class="btn-white btn-pos" onclick="setSlideOutEffects()">
            Cancel<img src="./img/icons/cancel.svg"></button>
        <button id="createContactBtn" class="btn-grey img-white btn-pos" onclick="createContact()">
            Create contact<img src="./img/icons/checked.svg"></button>
    `;
}

function openContactSliderHTML(i) {
    return /*html*/ `
         <button class="btn-white btn-pos" onclick="deleteContact(${i})">
            Delete</button>
        <button id="createContactBtn" class="btn-grey img-white btn-pos" onclick="saveEditContact(${i})">
            Save<img src="./img/icons/checked.svg"></button> 
    `;
}

function generateContactHTML(i, badgecolor, initials, name, email) {
    return /*html*/ `
        <div name="test" id="person-container-${i}" class="person-container" onclick="showContactDetails(${i}); setHighlight(${i})">
        <div class="initials-circle" style="background-color: ${badgecolor};">${initials}</div>
        <div class="d-column-flex-start">
            <div class="person-name">
                <div>${name}</div>
            </div>
            <div class="person-email">${email}</div>
        </div>
    </div>
    `;
}

function renderDetailsMenuBtnHTML(i) {
    return /*html*/ `
        <button class="btn-grey btn-details-menu" onclick="openDetailsMenu(${i})"></button>
    `;
}

function confirmNewContactHTML() {
    return /*html*/ `
        <div id="confirmation-container"><span>Contact succesfully created</span></div>
    `;
}
