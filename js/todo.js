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
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  button.addEventListener("click", deleteToDo);
  toDoList.appendChild(li);
  li.appendChild(span);
  li.appendChild(button);
  span.innerText = newTodo.text;
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
  const liElements = document.querySelectorAll("li"); // 모든 li 요소 선택
  liElements.forEach((li) => li.remove()); // 각 li 요소를 하나씩 삭제
  toDos = []; // 배열도 초기화
  saveToDos(); // localStorage도 초기화
}

toDoForm.addEventListener("submit", handleToDoSubmit);
deleteAllTheList.addEventListener("click", deleteAllToDo);
