const form = document.querySelector('#task-form'); //select form
const taskList = document.querySelector('.collection'); // select ul
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//function to load alleventlisteners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from LocalStorage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create textnode and append to li
    li.appendChild(document.createTextNode(task));


    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link); 
    
    // append li to ul 
    taskList.appendChild(li);

    });

}


//add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } else {

    

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));


    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link); 
    
    // append li to ul 
    taskList.appendChild(li);

    // store in localstorage
    storeTaskInLocalStorage(taskInput.value);

    }

     // clear input
    taskInput.value = '';

    e.preventDefault(); 

}

//function to store task to local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from Local Sotrage function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1); //number determines how many items you are deleting
             
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
    // taskList.innerHTML = '';

    //faster way
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear tasks from LS
    clearTasksFromLocalStorage();
}


//function for clearing tasks from LocalStorage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}



// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)  { 
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}
