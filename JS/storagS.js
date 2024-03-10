let userData = [];

function save() {
  let userDatas = JSON.stringify(userData);

  localStorage.setItem("userData", userDatas);
}

function load() {
  let userDatas = localStorage.getItem("userData");

  if (userDatas) {
    userData = JSON.parse(userDatas);
  }
}
