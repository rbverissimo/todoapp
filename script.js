const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllbtn = document.querySelector(".footer button");

document.getElementById('ano-ft').innerText = new Date().getFullYear();

document.getElementById('todoLogo').onclick = () => {
  window.location.reload();
}

document.getElementById('langWrapperEl').onclick = () => {
  const langSelector = document.getElementById('langSelector');
  langSelector.style.display = 'block';
}

inputBox.onkeyup = () => {

  let userData = inputBox.value; 
  if (userData.trim() != 0) {
    addBtn.classList.add("active");
  } else addBtn.classList.remove("active"); 
};

showTasks(); 

addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); 
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr)); 
  showTasks(); 
  addBtn.classList.remove("active");
};

function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length;
  if (listArr.length > 0) {
    deleteAllbtn.classList.add("active");
  } else {
    deleteAllbtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag +=
      "<li>" +
      `<span class="task-span" onclick="selecionarTask('${element}')">` + element + '</span>'
      + `<span class="delete-span" onclick="deleteTask('${index}')"; style="display:inline-flex; align-items:center;justify-content:center;height:100%">`
       +'<i class="material-symbols-outlined">delete</i></span>'
       +'</li>';
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = ""; 
}

function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage); 
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

function selecionarTask(element){
  console.log(element);
}

deleteAllbtn.onclick = () => {
  listArr = []; 
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};

document.getElementById('langEnSelect').onclick = renderEnglish;

function renderEnglish(){
  document.getElementById('selectedLang').textContent = 'English';

  const langSelector = document.getElementById('langSelector');
  langSelector.children.item(0).textContent = 'Portuguese';
  langSelector.children.item(1).textContent = 'English';

  const inputField = document.getElementsByClassName('inputField').item(0).children.item(0);
  inputField.placeholder = 'Add new task';

  const header = document.getElementsByClassName('wrapper').item(0).children.item(0);
  header.textContent = 'ToDo';

  const wrapperFooter = document.querySelector('.footer');

  wrapperFooter.innerHTML = 
    `<span>You got <span class="pendingNumb"></span> pending tasks</span>` 
    +`<button>Clear all</button>`;

  showTasks();
}
