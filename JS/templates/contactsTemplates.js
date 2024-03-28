
function generateRegisterboxHTML(registerLetter) {
    document.getElementById('register-container').innerHTML += /*HTML*/ `
        <div id="registerbox-${registerLetter}" class="d-column-flex-start">
            <div class="registerbox">${registerLetter}</div>
        </div>
        `;
}

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
            <a href="mailto:${email}">${email}</a>    
            <h6>Phone</h6>
            <span>${phone}</span>
        </div>
        <div id="confirmed"></div>
    </div>
    `;
}

function generateAddContactSliderContentHTML() {
    return /*html*/ `
    <div class="slider-header-container">
        <img src="./img/join_logo.svg" alt="">
        <h1 id="window-headline" class="no-margin clr-white"></h1>
        <div id="window-claim" class="add-claim"></div>
        <div class="separator-across-lightblue"></div>
    </div>
    <div class="contact-input-container">
        <div class="cancel-x" onclick="setSlideOutEffects()"><img src="./img/icons/cancel.svg" alt=""></div>

        <div id="contact-badge" class="contact-badge"></div>
        <form id="addContact-form" onsubmit="createContact(); return false;" class="input-form-container">
            <div class="inputfields">
                <label id="input-name-label"> 
                    <input class="contact-inputField" type="text" id="contact-input-name" placeholder="Name" required>
                </label>
                <label id="input-email-label"> 
                    <input class="contact-inputField" type="email" id="contact-input-email" placeholder="Email" required>
                </label>
                <label id="input-phone-label"> 
                    <input class="contact-inputField" type="tel" id="contact-input-phone" placeholder="Phone" title="+0123456789" pattern="[+][0-9]{9}" required>
                </label>
            </div>
            <div id="buttons-container" class="cancel-create-buttons-container">
                <button id="cancelBtn" class="btn-white btn-pos" type="reset" onclick="setSlideOutEffects()">
                Cancel<img src="./img/icons/cancel.svg"></button>
                <button id="createContactBtn" type="submit" class="btn-grey img-white btn-pos">
                Create contact<img src="./img/icons/checked.svg"></button>
            </div>
        </form>
    </div>
    `;
}

function generateOpenContactSliderContentHTML(i) {
    return /*html*/ `
    <div class="slider-header-container">
        <img src="./img/join_logo.svg" alt="">
        <h1 id="window-headline" class="no-margin clr-white"></h1>
        <div id="window-claim" class="add-claim"></div>
        <div class="separator-across-lightblue"></div>
    </div>
    <div class="contact-input-container">
        <div class="cancel-x" onclick="setSlideOutEffects()"><img src="./img/icons/cancel.svg" alt=""></div>

        <div id="contact-badge" class="contact-badge"></div>
        <form id="addContact-form" onsubmit="saveEditContact(${i}); return false;" class="input-form-container">
            <div class="inputfields">
                <label id="input-name-label">
                    <input class="contact-inputField" type="text" id="contact-input-name" placeholder="Name" required>
                </label>
                <label id="input-email-label">
                    <input class="contact-inputField" type="email" id="contact-input-email" placeholder="Email" required>
                </label>
                <label id="input-phone-label">
                    <input class="contact-inputField" type="tel" id="contact-input-phone" placeholder="Phone" required>
                </label>
            </div>
            <div id="buttons-container" class="cancel-create-buttons-container">
                <button class="btn-white btn-pos" type="reset" onclick="deleteContact(${i})">
                Delete</button>
                <button id="createContactBtn" type="submit" class="btn-grey img-white btn-pos">
                Save<img src="./img/icons/checked.svg"></button> 
            </div>
        </form>
    </div>
    `;
}

function generateContactHTML(i, badgecolor, initials, name, email) {
    return /*html*/ `
        <div id="contact-container-${i}" class="contact-container" onclick="showContactDetails(${i}); setHighlight(${i})">
        <div class="initials-badge" style="background-color: ${badgecolor};">${initials}</div>
        <div class="d-column-flex-start">
            <div class="contact-name">${name}</div>
            <div class="contact-email">${email}</div>
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
