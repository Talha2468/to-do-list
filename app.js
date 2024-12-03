let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, i) => {
    const { name, done } = todoObject;

    const editButtonHTML = done ? '' : `
      <button class="edit-todo-button edit-todo-button${i} js-edit${i}" onClick='editItem(event,${i})'>Edit</button>
    `;

    const html = `
      <div class="todo-grid js-todo-grid${i} ${done ? 'done' : ''}">
        <div class="list">${name}</div>
        <input type='text' value='${name}' class='hide'/>
        ${editButtonHTML}
        <button onclick="
          todoList.splice(${i}, 1);
          renderTodoList();
          saveToStorage();
        " class="delete-todo-button">Delete</button>
        <button class="done-todo-button" onclick='doneBtn(${i})'>Done</button>
        </div>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function editItem(e ,id){
  let inpValue;
  let editInpValue;
  if(e.target.innerText === 'Edit'){
    e.target.innerText = 'Save'
    e.target.previousElementSibling.previousElementSibling.style.display ='none'
    e.target.previousElementSibling.style.display ='initial'
    inpValue = e.target.previousElementSibling.value;
    
  } else{
    editInpValue = e.target.previousElementSibling.value;
    e.target.innerText = 'Edit'
  
    e.target.previousElementSibling.style.display ='none'
    e.target.previousElementSibling.previousElementSibling.style.display ='initial'
    e.target.previousElementSibling.previousElementSibling.innerText = editInpValue;
    todoList[id].name = editInpValue; 
    saveToStorage();
  }
}


function doneBtn(index) {
  if(!(todoList[index].done) === true){
    document.querySelector(`.edit-todo-button${index}`).style.display ='none'
  }else{
    todoList[index].done = false
  }
  todoList[index].done = !todoList[index].done;
  renderTodoList();
  saveToStorage();
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  todoList = [...todoList, { name, done: false }];

  inputElement.value = '';

  renderTodoList();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}