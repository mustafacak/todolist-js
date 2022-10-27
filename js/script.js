let listDOM = document.querySelector("#list");
let inputDOM = document.querySelector("#task");
let toastBody = document.querySelector("#toast-body");

let todos;

//////// LOCAL STORAGE

function getTodos(){
  todos = JSON.parse(localStorage.getItem('todos'));
  if(todos == null){
    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  return todos;
}

function addTodos(text, id){ 
  todos = getTodos();
  todos.push({id:id, todo:text, isActive: true});
  localStorage.setItem('todos', JSON.stringify(todos));
}

function setTodos(todos){
  localStorage.setItem('todos', JSON.stringify(todos));
}

//////// LOCAL STORAGE



// TODO List

getTodos().forEach((element) => {
  createListItem(element.todo, element.id, element.isActive);
});


// LI DOM 
function createListItem(text, id, isActive = true){
    let liDom = document.createElement('li');
    liDom.innerText = text;
    liDom.setAttribute('data-id', id);
    
    !isActive ? liDom.classList.add('checked'): '';

    let span = document.createElement('span');
    let textNode = document.createTextNode("\u00D7");
    span.className = 'close';
    span.appendChild(textNode);

    liDom.appendChild(span);
    listDOM.appendChild(liDom);
}


// Add Item

function newElement(){

  if(!inputDOM.value.trim() == '')
  {
    let todo_id = Date.now();

    createListItem(inputDOM.value, todo_id);

    addTodos(inputDOM.value, todo_id);
    
    inputDOM.value = "";

    toastBody.innerText = "Listeye eklendi!";

    $('.toast').toast('show');

  } else{
    toastBody.innerText = "Listeye boş ekleme yapamazsınız!";
    
    $('.toast').toast('show');

  }
}

inputDOM.addEventListener('keydown', function(e){
  e.key === 'Enter' ? newElement() : '';
});


// Check-Remove Item

listDOM.addEventListener('click', function(e){
  if(e.target.className === 'close'){     // Remove Function
    removeItem(e);
  } else if(e.target.tagName === 'LI'){
    checkFunction(e);
  }
});

function checkFunction (e){
    e.target.classList.toggle('checked');
    let data_id = e.target.getAttribute('data-id');
    console.log(e.target.getAttribute('data-id'));


    todos = getTodos();


    todos.forEach(function(item, index){
      if(item.id == Number(data_id)){
        console.log("index:", index);
        let todo_status = todos[Number(index)].isActive;

        todo_status ? todo_status = false : todo_status = true;
        
        todos[Number(index)].isActive = todo_status;

        console.log(todos[Number(index)]);
      }
    });

    //console.log(todos);
    setTodos(todos);

}


function removeItem(e){
  e.target.parentElement.remove();
  let data_id = e.target.parentElement.getAttribute('data-id');


  todos = getTodos();
  todos.forEach(function(item, index){
    if(item.id === Number(data_id)){
      console.log('bu item silinecek:', item.todo);
      todos.splice(index,1);
    }
  });

  setTodos(todos);

}