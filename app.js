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
function sendWithEnter(e) {
  if (e.key == "Enter") {
    newElement();
  }
}
taskInput.addEventListener("keydown", sendWithEnter);

function newElement() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const todoName = taskInput.value;
  if (taskInput.value.trim() == "") {
    showToastMessage("Cannot add with empty string", true);
  } else {
    const todo = { name: todoName, done: false };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    createTodoEl(todo);
    taskInput.value = "";
    showToastMessage("Todo item is added", false);
  }

  for (let i = 0; i < todos.length; i++) {
    if(todos[i].name==todoName){
      console.log("var");
    }else{
      console.log("yok");
    }
    
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
  todos.forEach((todo) => {
    if (todoName === todo.name) {
      todo.done = !todo.done; // is true do false, is false do true
      if (todo.done == true) {
        // and if is true then change classname
        liEl.parentElement.className = "checked";
      } else {
        liEl.parentElement.className = "";
      }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
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

  let todos = JSON.parse(localStorage.getItem("todos"));

  checkboxEl.addEventListener("click", checkboxDone);
  // TODO done

  liEl.append(checkboxEl);
  liEl.append(nameEl);
  deleteParent.append(deleteButton);
  liEl.append(deleteParent);
  list.append(liEl);

  todos.forEach((td) => {
    const liText = liEl.getElementsByTagName("div")[0].textContent;
    if (td.done == true) {
      // o td.name ile aynı texte sahip olan li'nin clasını "checked" yap
      if (td.name === liText) {
        liEl.className = "checked";
      }
    }
  });
}

function deleteLocalTodoByName(todoName) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].name === todoName) {
      todos.splice(i, 1); // changes array in place
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
