function initSummary() {
  greetingUser();
}

function greetingUser() {
  let userName = userData[userIndex]["name"];
  let greeting = document.getElementById("greeting");
  greeting.innerHTML = "";
  if (userIndex == 0) {
    greeting.innerHTML += greetingHtml1();
  } else {
    greeting.innerHTML += greetingHtml2(userName);
  }
}

function greetingHtml1() {
  return /*html*/ `<p>Good morning</p>`;
}

function greetingHtml2(name) {
  return /*html*/ `<p>Good morning,</p>
  <h2>${name}</h2>`;
}
