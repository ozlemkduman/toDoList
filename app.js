const taskInput = document.getElementById("task");
const list = document.getElementById("list");
const buttonAdd = document.querySelector(".button");
const toastBody = document.querySelector(".toast-body");

function main() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todos.forEach((toDo) => {
      createTodoEl(toDo);
    });
  }
}

main();

function newElement() {
  if (taskInput.value.trim() == "") {
    showToastMessage("Cannot add with empty string", true);
  } else {
    const todoName = taskInput.value;
    const todo = { name: todoName, done: false };
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    createTodoEl(todo);
    taskInput.value = "";
    showToastMessage("Todo item is added", false);
  }
}

function clearTodo(e) {
  const target = e.target; // span
  const liEl = target.parentElement.parentElement;
  const nameEl = liEl.getElementsByTagName("div")[0];
  const todoName = nameEl.textContent;
  if (target.classList.contains("close")) {
    deleteLocalTodoByName(todoName);
    liEl.remove();
  }
}

function checkboxDone(e) {
  const target = e.target; // span
  const todos = JSON.parse(localStorage.getItem("todos"));
  const liEl = target.parentElement.getElementsByTagName("div")[0];
  const todoName = liEl.textContent;
  console.log(todoName);
  todos.forEach((todo) => {
    console.log(liEl);
    if (todoName === todo.name) {
      todo.done = !todo.done; // is true do false, is false do true
      if (todo.done == true) {
        // and if is true then change classname
        liEl.className = "checked";
      } else {
        liEl.className = "";
      }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    //SAYFA YENİLENDİĞİNDE CHECKED CLASSI DEVREYE GİRMİYO !?
  });
}

function createTodoEl(todo) {
  /**
   *  li
   *    input type=checkbox
   *    div (todoName)
   *    div
   *      span (x)
   */

  // TODO button kullan
  const deleteButton = document.createElement("span");
  deleteButton.className = "close";
  deleteButton.innerText = "x";
  deleteButton.addEventListener("click", clearTodo);

  const deleteParent = document.createElement("div");

  const nameEl = document.createElement("div");
  nameEl.textContent = todo.name;

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.checked = todo.done;
  const liEl = document.createElement("li");

  checkboxEl.addEventListener("click", checkboxDone);
  // TODO done

  liEl.append(checkboxEl);
  liEl.append(nameEl);
  deleteParent.append(deleteButton);
  liEl.append(deleteParent);
  list.append(liEl);
}

function deleteLocalTodoByName(todoName) {
  let todos = JSON.parse(localStorage.getItem("todos"));

  console.log(todos);
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].name === todoName) {
      todos.splice(i, 1); // changes array in place
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}

// Hakan's code

function showToastMessage(message, isError) {
  // body nin içinde alttakini oluştur

  const el = document.createElement("div");
  el.innerHTML = `
    <div class="mr-1" style="position: relative">
      <div style="position: absolute; top: 0; right: 0">
        <div
          id="liveToast"
          class="toast ${isError ? "error" : "success"} fade show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="4000"
        >
          <div>
            <button
              type="button"
              class="close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">${message}</div>
        </div>
      </div>
    </div>
    `;

  document.body.insertBefore(el, document.body.firstChild);

  setTimeout(() => {
    const liveToastEl = document.getElementById("liveToast");
    liveToastEl.classList.remove("show");
    liveToastEl.classList.add("hide");
    el.remove();
  }, 1000);
}
