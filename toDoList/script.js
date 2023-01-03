const textField = document.querySelector("input");
const addButton = document.getElementById("btn");
const container = document.querySelector(".container");

window.addEventListener("DOMContentLoaded", () => {
  retrieveTasks();
});

function tasksToContainer() {
  if (!textField.value || Number(textField.value)) {
    textField.focus();
    textField.value = "";
    alert("The field must be a text");
    return;
  }
  let division = `
                <div>
                  <p onclick="lineThrough(this)">${textField.value}</p>
                  <i onclick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
                </div>`;

  container.innerHTML += division;

  saveTasks();

  textField.value = "";
  textField.focus();
}

function saveTasks() {
  let title = textField.value;
  let taskObj = {
    id: Date.now(),
    title
  };
  if (localStorage.getItem("tasks") === null) {
    let tasksList = [];
    tasksList.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  } else {
    let tasksList = JSON.parse(localStorage.getItem("tasks"));
    tasksList.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }
}

function retrieveTasks() {
  let tasksList = JSON.parse(localStorage.getItem("tasks"));

  for (let i = 0; i < tasksList.length; i++) {
    let title = tasksList[i].title;

    let division = `
                <div>
                  <p onclick="lineThrough(this)">${title}</p>
                  <i onclick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
                </div>`;

    container.innerHTML += division;
  }
}

function lineThrough(para) {
  para.parentElement.classList.toggle("checked");
}

function deleteTask(button) {
  let deletedDiv = button.parentElement;
  deletedDiv.classList.add("deleted");

  deletedDiv.addEventListener("transitionend", function () {
    deletedDiv.remove();
  });

  // let targeted = button.parentElement.children[0].innerHTML; The same as the next line
  let targeted = button.previousElementSibling.innerHTML;
  let tasksList;
  if (localStorage.getItem("tasks") === null) {
    tasksList = [];
  } else {
    tasksList = JSON.parse(localStorage.getItem("tasks"));
  }
  tasksList.splice(targeted, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksList));
}
