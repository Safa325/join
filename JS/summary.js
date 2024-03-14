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

const toDoCard = document.getElementById("toDoCard");

toDoCard.addEventListener("mouseover", function () {
  const pencil = document.getElementById("pencil");
  pencil.src = "./img/icons/pencil-white-r.svg";
});

toDoCard.addEventListener("mouseout", function () {
  const pencil = document.getElementById("pencil");
  pencil.src = "./img/icons/pencil-dark.svg";
});

const doneCard = document.getElementById("doneCard");

doneCard.addEventListener("mouseover", function () {
  const done = document.getElementById("done");
  done.src = "./img/icons/done-white.svg";
});

doneCard.addEventListener("mouseout", function () {
  const done = document.getElementById("done");
  done.src = "./img/icons/done-dark.svg";
});
