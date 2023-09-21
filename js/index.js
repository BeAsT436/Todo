// selectors
const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");

// event handlers

function handleSubmitForm(e) {
  e.preventDefault();
  if (input.value !== "") {
    addNewTodo(input.value.trim());
    input.value = ""
  }
}

function handleDeleteButtonClick(e) {
  const todoItem = e.target.closest(".todo-list-item");
  if (todoItem) {
    todoItem.remove();
    const todo = todoItem.querySelector(".todo-item");
    removeTodoFromLocalStorage(todo.textContent);
  }
}

function handleCheckButtonClick(e) {
  const todoItem = e.target.closest(".todo-list-item");
  if (todoItem) {
    const todoText = todoItem.querySelector(".todo-item")
    todoItem.classList.toggle("completed")
    const isCompleted = todoItem.classList.contains("completed")
    updateTodoStatus(todoText.textContent, isCompleted)
    console.log(todoItem);
  }
}

// helpers

function saveToLocalStorage() {
  const todos = [];
  const todoItems = document.querySelectorAll(".todo-list-item");

  todoItems.forEach((todoItem) => {
    const todoText = todoItem.querySelector(".todo-item");
    const isCompleted = todoItem.classList.contains("completed");
    const todo = {
      text: todoText.textContent,
      completed: isCompleted,
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromLocalStorage(text) {
  const todos = JSON.parse(localStorage.getItem("todos") || []);
  const updatedTodos = todos.filter((todo) => {
    todo.text !== text;
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function addNewTodo(todo) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="todo-item"> ${todo}</span>
    <button name="checkButton"><i class="fa-solid fa-check"></i></button>
    <button name="deleteButton"><i class="fa-solid fa-trash"></i></button>`;
  li.classList.add("todo-list-item");
  list.appendChild(li);
  saveToLocalStorage();
}

function updateTodoStatus(todoText, isCompleted) {
  const todos = JSON.parse(localStorage.getItem("todos") || [])
  const updatedTodos = todos.map((todo)=>{
    if(todo.text === todoText){
      todo.completed = isCompleted
    }
    return todo
  })
  localStorage.setItem("todos", JSON.stringify(updatedTodos))
}

// DOMContentLoaded eventListener

document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos") || []);

  todos.forEach((todo) => {
    addNewTodo(todo.text);
    if (todo.completed) {
      const todoItems  = document.querySelectorAll(".todo-item")
      todoItems.forEach((todoItem)=>{
        todoItem.closest(".todo-list-item").classList.add("completed")
      })
    }
  });
});

// event Listeners
form.addEventListener("submit", handleSubmitForm);
list.addEventListener("click", function (event) {
  const checkButton = event.target.closest("button[name='checkButton']");
  const deleteButton = event.target.closest("button[name='deleteButton']");
  if (checkButton) {
    handleCheckButtonClick(event);
  } else if (deleteButton) {
    handleDeleteButtonClick(event);
  }
});
list.addEventListener("click", (e)=>{
  const todoItem = e.target.closest(".todo-list-item")
  if (todoItem) {
    const todoText = todoItem.querySelector(".todo-item")
    todoText.classList.toggle("expanded")
  }

})