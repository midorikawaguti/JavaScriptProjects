"use strict"
function addTask() {
    let task = document.getElementById("todoinput").value;
    let newTask = document.getElementById("todolist");
    
    document.getElementById("todoinput").value = "";

    let taskLi = document.createElement("li");
    taskLi.innerHTML = task;

    newTask.appendChild(taskLi);
    taskLi.classList.add("task");

    let removeDiv = document.createElement("div");
    removeDiv.innerHTML = "Remove";
    
    taskLi.appendChild(removeDiv);
    removeDiv.classList.add("remove-task");
 

    removeDiv.addEventListener("click", function() {
        deleteTask(taskLi)});
    
    taskLi.addEventListener("click", function() {
        completeTask(taskLi)});
        
}


function deleteTask(removeTask) {
    removeTask.remove();
}


function completeTask(complete) {
    if (complete.classList.contains("task-complete")){
        complete.classList.remove("task-complete");
    }
    else{
        complete.classList.add("task-complete");
    }
}

/* Event Listeners*/

document.
    getElementById("todoinput").
    addEventListener("keypress", function(event) {
        if (event.key === "Enter"){
             addTask();
         }
});



