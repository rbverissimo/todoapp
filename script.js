const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllbtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  //after releasing the key
  let userData = inputBox.value; //the inputBox const points to the input area in the DOM;
  if (userData.trim() != 0) {
    addBtn.classList.add("active"); //the classList.add gives the class active to the inputField button;
  } else addBtn.classList.remove("active"); //and then removes it;
};

showTasks(); //calls the function which will call anything written in the localStorage;

//if the user click on the add button
addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming in js object
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transform the object back to string
  showTasks(); //calling
  addBtn.classList.remove("active");
};

function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    //the function will be called first and will create the array
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //thus, the array at first has 0 length;
  if (listArr.length > 0) {
    deleteAllbtn.classList.add("active");
  } else {
    deleteAllbtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag +=
      "<li>" +
      element +
      '<span onclick="deleteTask()"; style="display:inline-flex; align-items:center;justify-content:center;height:100%">'
       +'<i class="material-symbols-outlined">delete</i></span></li>';
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = ""; //once a task is shown the input box is cleared;
}

//deleting which task individually;
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage); //transforming to js object
  listArr.splice(index, 1); //takes the index and how many after the index will be deleted;
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //back to string
  showTasks();
}

//delete all function
deleteAllbtn.onclick = () => {
  listArr = []; //empty an array;
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};
