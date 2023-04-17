let taskinput = document.getElementById("add-task");
let addbtn = document.getElementById("addbtn");
let tasklist = document.getElementById("tasklist");

let existingtask = JSON.parse(localStorage.getItem("usertasks")) ?? [];
existingtask.forEach(task => rendertask(task))


// add task function
function addtask() {
    let newtask = { todos: taskinput.value };
    existingtask.push(newtask);
    localStorage.setItem("usertasks", JSON.stringify(existingtask))
    Notify.success(`${taskinput.value} Task Added`)
    rendertask(newtask)
    taskinput.value = ""
}


// render task in local storage function
function rendertask(task) {
    let li = document.createElement('li')
    li.innerHTML = `
<span id="taskspan" onclick="popup()">${task.todos}
    <span id="todosdescrip">Project Description</span>
</span>
<button id="startbtn"><i class="fa fa-play"></i></button>
<button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>
`
    li.querySelector('#deletebtn').addEventListener('click', () => {
        let index = existingtask.findIndex(t => t.todos == task.todos)
        existingtask.splice(index, 1)
        localStorage.setItem("usertasks", JSON.stringify(existingtask));
        Notify.error(`${task.todos} Task Removed`)
        li.remove()
        
    })
    tasklist.append(li)
}

// if taskinput is empty or space, task should not be added
addbtn.addEventListener("click", e =>{
    if(taskinput.value.trim() != ""){
        addtask();
        EnterKeyTask()
    }
    else{
        Notify.error(`Type Any Task Name`)
    }
})

// function for add task when enter press key is pressed
taskinput.addEventListener('keypress',e =>{
    
        if (e.key === 'Enter') {
            if(taskinput.value != ""){
                addtask()
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