const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");
function saveToLocalStorage() {
  const todos = [];
  const todoItems = document.querySelectorAll(".todo-list-item");

  todoItems.forEach((todoItem) => {
    const todoText = todoItem.querySelector(".todo-item");
    const isCompleted = todoItem.classList.contains("completed");
    const todo = {
      text: todoText,
      completed: isCompleted
    };
    todos.push(todo)
  });
  localStorage.setItem("todos", JSON.stringify(todos))
}

function handleSubmitForm(e) {
  e.preventDefault();
  if (input.value !== "") {
    addNewTodo(input.value);
  }
}

function addNewTodo(todo) {
  const li = document.createElement("li");
  li.innerHTML = `<span> ${todo}</span>
    <button><i class="fa-solid fa-check"></i></button>
    <button><i class="fa-solid fa-trash"></i></button>`;
  li.classList.add("todo-list-item");
  list.appendChild(li);
}

function handleDeliteButtonClick(e) {
  const todoItem = e.target.closest("todo-list-item");
  if (todoItem) {
    todoItem.remove();
  }
}

form.addEventListener("submit", handleSubmitForm);
