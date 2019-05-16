//define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//function to load event listeners
loadEventListeners(); // ?? 

function loadEventListeners() {
    //DOM
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task 
    taskList.addEventListener('click', removeTask);
    //clear tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//get Tasks from local storage
function getTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

    //create list item
    const li = document.createElement('li');
    //add class --> for it to have styling from materialize then it needs the class within the UL 
    li.className = 'collection-item';
    //create text node and append to li 
    li.appendChild(document.createTextNode(task));
    //add link
    const link = document.createElement('a');
    //add class name 
    link.className = 'delete-item secondary-content'; //secondary content moves things to the right in materialize
    //add icon HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //add to li
    li.appendChild(link);
    //append Li to UL 
    taskList.appendChild(li);
    });
    
}

//add task
function addTask(e){
    if(taskInput === ''){
        alert('add a task');
    }

    //create list item
    const li = document.createElement('li');

    //add class --> for it to have styling from materialize then it needs the class within the UL 
    li.className = 'collection-item';

    //create text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));

    //add link
    const link = document.createElement('a');

    //add class name 
    link.className = 'delete-item secondary-content'; //secondary content moves things to the right in materialize

    //add icon HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //add to li
    li.appendChild(link);

    //append Li to UL 
    taskList.appendChild(li);

    saveToLocalStorage (taskInput.value);

    //clear input
    taskInput.value = ''; //why? 


    e.preventDefault();
}

//store in local storage function
function saveToLocalStorage (task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
   
}


//function to remove tasks from list 
function removeTask (e){
    if (e.target.parentElement.classList.contains('delete-item') ) {
        
        if (confirm ('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        } 
    }
}

//function to remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if (taskItem.textContent === task) {
            tasks.splice(index,1);
            
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//function to clear tasks when press the button
function clearTasks(){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        
    }

    //clear from local storage
    clearTasksFromLocalStorage();
}

//function to clear tasks from local stoage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//function to filter through tasks 
function filterTasks (e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';            
        } else {
            task.style.display = 'none';
        }
        
    });
}