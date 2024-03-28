/**
 * Speichert die Daten für "Remember Me" im lokalen Speicher.
 * Saves the data for "Remember Me" in local storage.
 */
function save() {
  if (typeof rememberMeActiv !== "undefined") {
    let rememberMeActivS = JSON.stringify(rememberMeActiv); // Converts rememberMeActiv to JSON string
    let rememberMeEmailS = JSON.stringify(rememberMeEmail); // Converts rememberMeEmail to JSON string
    let rememberMepwS = JSON.stringify(rememberMepw); // Converts rememberMepw to JSON string

    // Stores the JSON strings in local storage
    localStorage.setItem("rememberMeActiv", rememberMeActivS);
    localStorage.setItem("rememberMeEmail", rememberMeEmailS);
    localStorage.setItem("rememberMePw", rememberMepwS);
  }
}

/**
 * Lädt die Daten für "Remember Me" aus dem lokalen Speicher.
 * Loads the data for "Remember Me" from local storage.
 */
function load() {
  let rememberMeActivS = localStorage.getItem("rememberMeActiv"); // Retrieves JSON string for rememberMeActiv from local storage
  let rememberMeEmailS = localStorage.getItem("rememberMeEmail"); // Retrieves JSON string for rememberMeEmail from local storage
  let rememberMepwS = localStorage.getItem("rememberMePw"); // Retrieves JSON string for rememberMepw from local storage

  // Überprüft, ob die gespeicherten Daten vorhanden sind, und konvertiert sie zurück in Objekte
  if (rememberMeActivS !== null && rememberMeEmailS !== null && rememberMepwS !== null) {
    rememberMeActiv = JSON.parse(rememberMeActivS); // Parses JSON string for rememberMeActiv
    rememberMeEmail = JSON.parse(rememberMeEmailS); // Parses JSON string for rememberMeEmail
    rememberMepw = JSON.parse(rememberMepwS); // Parses JSON string for rememberMepw
  }
}
