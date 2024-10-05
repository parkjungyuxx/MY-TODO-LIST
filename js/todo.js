const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const deleteAllTheList = document.getElementById("deleteAllTheList");

let toDos = [];
const TODOS_KEY = "todos";

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const leftContainer = document.createElement("div");
  leftContainer.style.display = "flex"; 
  leftContainer.style.alignItems = "center"; 
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", toggleComplete);
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  leftContainer.appendChild(checkbox);
  leftContainer.appendChild(span);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteButton.addEventListener("click", deleteToDo);
  li.appendChild(leftContainer);
  li.appendChild(deleteButton);
  toDoList.appendChild(li);
}

function toggleComplete(event) {
  const li = event.target.closest("li");
  li.classList.toggle("completed");
}

function deleteToDo(event) {
  const li = event.target.closest("li");
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function saveToDos(event) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function deleteAllToDo(event) {
  const liElements = document.querySelectorAll("li");
  liElements.forEach((li) => li.remove());
  toDos = [];
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
deleteAllTheList.addEventListener("click", deleteAllToDo);
