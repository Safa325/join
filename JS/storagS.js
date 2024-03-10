let userData = [
  {
    name: "guest",
    email: "guest@guest.com",
    password: "guest",
    contacts: [],
    tasks: [],
  },
];

function save() {
  let userDatas = JSON.stringify(userData);
  let rememberMeActivS = JSON.stringify(rememberMeActiv);
  let rememberMeEmailS = JSON.stringify(rememberMeEmail);
  let rememberMepwS = JSON.stringify(rememberMepw);

  localStorage.setItem("userData", userDatas);
  localStorage.setItem("rememberMeActiv", rememberMeActivS);
  localStorage.setItem("rememberMeEmail", rememberMeEmailS);
  localStorage.setItem("rememberMePw", rememberMepwS);
}

function load() {
  let userDatas = localStorage.getItem("userData");
  let rememberMeActivS = localStorage.getItem("rememberMeActiv");
  let rememberMeEmailS = localStorage.getItem("rememberMeEmail");
  let rememberMepwS = localStorage.getItem("rememberMePw");

  if (userDatas && rememberMeActivS && rememberMeEmailS && rememberMepwS) {
    userData = JSON.parse(userDatas);
    rememberMeActiv = JSON.parse(rememberMeActivS);
    rememberMeEmail = JSON.parse(rememberMeEmailS);
    rememberMepw = JSON.parse(rememberMepwS);
  }
}
