function save() {
  if (typeof rememberMeActiv !== "undefined") {
    let rememberMeActivS = JSON.stringify(rememberMeActiv);
    let rememberMeEmailS = JSON.stringify(rememberMeEmail);
    let rememberMepwS = JSON.stringify(rememberMepw);

    localStorage.setItem("rememberMeActiv", rememberMeActivS);
    localStorage.setItem("rememberMeEmail", rememberMeEmailS);
    localStorage.setItem("rememberMePw", rememberMepwS);
  }
}

function load() {
  let rememberMeActivS = localStorage.getItem("rememberMeActiv");
  let rememberMeEmailS = localStorage.getItem("rememberMeEmail");
  let rememberMepwS = localStorage.getItem("rememberMePw");

  if (rememberMeActivS && rememberMeEmailS && rememberMepwS) {
    rememberMeActiv = JSON.parse(rememberMeActivS);
    rememberMeEmail = JSON.parse(rememberMeEmailS);
    rememberMepw = JSON.parse(rememberMepwS);
  }
}
