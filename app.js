const taskInput = document.getElementById("task");
const list = document.getElementById("list");
const buttonAdd = document.querySelector(".button");
const toastBody = document.querySelector(".toast-body");
let deleteButton;
let deleteParent;
let toDoS = [];
function main() {
    const toDoS = JSON.parse(localStorage.getItem("toDoS"));
    if (!toDoS) {
      localStorage.setItem("toDoS", JSON.stringify([]));
    } else {
      toDoS.forEach((toDo) => {
        createNewLi(toDo);
      });
    }
  }
  
  main();
  
  function newElement() {
    if (taskInput.value.trim() == "") {
      showToast(false);
    } else {
      let toDoText = taskInput.value;
      const toDo = toDoText;
      const toDoS = JSON.parse(localStorage.getItem("toDoS"));
      toDoS.push(toDo);
      localStorage.setItem("toDoS", JSON.stringify(toDoS));
      createNewLi(toDo);
      taskInput.value = "";
      showToast(true);
    }
  }
  function clearTodo(e) {
    const item = e.target;
  
    if (item.classList[0] === "close") {
      const todo = item.parentElement.parentElement;
      const textSplit = todo.textContent;
      deleteGetLocal(textSplit);
      todo.remove();
    }
  }
  
  function createNewLi(item) {
    const newLi = document.createElement("li");
    newLi.textContent = item;
    list.append(newLi);
    deleteParent = document.createElement("div");
    newLi.append(deleteParent);
    deleteButton = document.createElement("span");
    deleteButton.className = "close";
    deleteButton.innerText = "x";
    deleteParent.append(deleteButton);
    deleteButton.addEventListener("click", clearTodo);
  }
  
  function deleteGetLocal(params) {
    let toDoS = JSON.parse(localStorage.getItem("toDoS"));
    
  console.log(toDoS);
    let newto;
    for (var i = 0; i < toDoS.length; i++) {
      if (toDoS[i]+"x" === params) {
       newto=toDoS.splice(i, 1);
       console.log(toDoS);
       console.log(newto);
       localStorage.setItem("toDoS",JSON.stringify(toDoS))
      }
    }
  }
  
  function showToast(sonuc) {
    if (sonuc == false) {
      $(".error").toast("show");
    } else {
      $(".success").toast("show");
    }
  }
  