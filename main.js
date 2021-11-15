//Selector
const todoInput = document.querySelector('.todo-input');
const todoButtom = document.querySelector('.todo-buttom');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButtom.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);

//Functions
function addTodo(event) {
    //щоб сторінка не перезагружалась по натисканні на кнопку
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //CreateLi
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const compeletedButton = document.createElement('button');
    compeletedButton.innerHTML = '<i class = "fas fa-check"> </i>';
    compeletedButton.classList.add('complete-btn');
    todoDiv.appendChild(compeletedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    if(todoInput.value) {
        //ADD TODO TO LOCALSTORAGE
        saveLocalTodos(todoInput.value);

        //APEND TO LIST
        todoList.appendChild(todoDiv);
        //Clear Todo input Value
        todoInput.value = '';
    }

   
}

function deleteCheck(e) {
    const item = e.target;
    //Delete TODO
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        //Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    //Check MARK 
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        checkLocalTodos(todo);
    }
}

function filterToDo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                console.log((todo.classList.contains('completed')))
                if((todo.classList.contains('completed'))) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if((!todo.classList.contains('completed'))) {
                    todo.style.display = 'flex';
                }  else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

//Save data in localStorage
function saveLocalTodos(todo) {
    //CHECK перевіряємо чи є щось у нас в списку
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let completed = false;
    todos.push({todo, completed});
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach( todo => {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        if(todo.completed == true) {
            todoDiv.classList.add('completed');
        }
        //CreateLi
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo.todo;
        newTodo.classList.add('todo-item');

        todoDiv.appendChild(newTodo);

        //CHECK MARK BUTTON
        const compeletedButton = document.createElement('button');
        compeletedButton.innerHTML = '<i class = "fas fa-check"> </i>';
        compeletedButton.classList.add('complete-btn');
        todoDiv.appendChild(compeletedButton);
        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);


        //APEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //CHECK перевіряємо чи є щось у нас в списку
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerHTML;
    const result = todos.filter(todos => todos.todo !== todoIndex);
    localStorage.setItem('todos', JSON.stringify(result));
}

function checkLocalTodos(todo) {
    //CHECK перевіряємо чи є щось у нас в списку
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerHTML;
    const value = todos.findIndex(el => el.todo === todoIndex);
    if(!todos[value].completed) {
        todos[value].completed = true;
    } else {
        todos[value].completed = false;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}



