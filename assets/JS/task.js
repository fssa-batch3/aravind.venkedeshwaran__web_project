let taskinput = document.getElementById("add-task");
let addbtn = document.getElementById("addbtn");
let tasklist = document.getElementById("tasklist");
let suggestiontask = document.querySelector("#suggestionlist")




// Display today date, day and month
let day = document.querySelector(".day")
let date = document.querySelector(".date");
let month = document.querySelector(".month");
let currentDate = Date();
day.innerText = currentDate.slice(0,4);
date.innerText = currentDate.slice(8,10);
month.innerText = currentDate.slice(4,7);

// Digital Clock
let digitaltime = document.getElementById("digitaltime")
let display;
window.onload = displayClock();
function displayClock(){
    cur_time = Date()
    currentHrs = Number(cur_time.slice(16,18))
    setTimeout(displayClock, 1000); 
    return currentHrs;
}
digitaltime.style.display = "none";




// add and save task in local storage
let existingtask = JSON.parse(localStorage.getItem("usertasks")) ?? [];
existingtask.forEach(task => rendertask(task))

// add task function
function addtask() {
    let newtask = { 
        taskId: Math.floor(Math.random() * Date.now()),
        todos: taskinput.value,
        date: Date().slice(4,16),
        time: Date().slice(16, 25),
        status: "not completed"
    };
    existingtask.push(newtask);
    localStorage.setItem("usertasks", JSON.stringify(existingtask));
    Notify.success(`${taskinput.value} Task Added`);
    rendertask(newtask)
    rendersuggestion(newtask)
    taskinput.value = ""
}


// render task in local storage function
function rendertask(task) {
    let li = document.createElement('li')
    let indexStatus = existingtask.findIndex(t => t.todos == task.todos)
    if(existingtask[indexStatus]["status"] == "completed"){
    li.innerHTML = `<span id="taskspan" onclick="popup()"><s>${task.todos}</s>
                    <span id="todosdescrip">Project Description</span>
                    </span>
                    <button id="checkmark" >&#10004;</button>
                    <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>
                    `
    }
    else{
        li.innerHTML = `<span id="taskspan" onclick="popup()">${task.todos}
                    <span id="todosdescrip">Project Description</span>
                    </span>
                    <button id="checkmark" >&#10004;</button>
                    <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>
                    `
    }
    li.querySelector('#checkmark').addEventListener('click', () => {
        let indexDone = existingtask.findIndex(t => t.todos == task.todos)
        li.innerHTML = `<span id="taskspan" onclick="popup()"><s>${task.todos}</s>
                        <span id="todosdescrip">Project Description</span>
                        </span>
                        <button id="checkmark" >&#10004;</button>
                        <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>`
        existingtask[indexDone]["status"] = "completed"
        localStorage.setItem("usertasks", JSON.stringify(existingtask));
        Notify.success(`${task.todos} Task Completed`)
        
    });
    li.querySelector('#deletebtn').addEventListener('click', () => {
        let indexDel = existingtask.findIndex(t => t.todos == task.todos)
        existingtask.splice(indexDel, 1)
        localStorage.setItem("usertasks", JSON.stringify(existingtask));
        Notify.error(`${task.todos} Task Removed`)
        li.remove()
        
    });
    tasklist.append(li)
    
}





// Task Suggestion
let existingsuggestion = JSON.parse(localStorage.getItem("usertasks")) ?? [];
existingtask.forEach(task => rendersuggestion(task))

function rendersuggestion(suggestion) {
    
    let weekday = "Yesterday";
    let li = document.createElement('li')
    li.innerHTML = `<span id="suggestionspan"><i class="fa fa-plus"></i> ${suggestion.todos}</span> <br> <br>
                    <span id="sugduedate">From ${weekday}</span>
                    `
    // li.querySelector('#deletebtn').addEventListener('click', () => {
    //     let index = existingsuggestion.findIndex(s => s.todos == suggestion.todos)
    //     existingsuggestion.splice(index, 1)
    //     localStorage.setItem("tasksuggestion", JSON.stringify(existingsuggestion));
    //     Notify.error(`${suggestion.todos} Task Removed`)
    //     li.remove()
        
    // })
    suggestiontask.append(li)
}





// if taskinput is empty or space, task should not be added
addbtn.onclick = () => {
    if(taskinput.value.trim() != ""){
        addtask();
    }
    else{
        Notify.error(`Type Any Task Name`)
    }
}

// function for add task when enter press key is pressed
taskinput.addEventListener('keypress',e =>{
    
        if (e.key === 'Enter') {
            if(taskinput.value != ""){
                addtask();
            }
            else{
                Notify.error(`Type Any Task Name`)
            }
        }
    
}); 





// function for pop up window
let task_notes = document.querySelector(".task-notes")
function popup() {
    task_notes.style.display = "block";
}


// function for close pop up window
let close = document.getElementById("close")
close.onclick = function() {
    task_notes.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
let taskPage = document.querySelector(".task-page")
window.onclick = function (event) {
    if (event.target == taskPage) {
        task_notes.style.display = "none";
    }
}





let arrowicon = document.getElementById("arrow");
let bulbicon = document.getElementById("bulb");
let suggestions = document.querySelector(".suggestiontask")

arrowicon.style.display = "none";
bulbicon.style.display = "block";
suggestions.style.display = "none"

bulbicon.onclick = ()=>{
    arrowicon.style.display = "block";
    bulbicon.style.display = "none";
    suggestions.style.display = "block"
    
}
arrowicon.onclick = ()=>{
    arrowicon.style.display = "none";
    bulbicon.style.display = "block";
    suggestions.style.display = "none"
}