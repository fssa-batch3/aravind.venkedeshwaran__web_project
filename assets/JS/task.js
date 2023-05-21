const taskinput = document.getElementById("add-task");
const addbtn = document.getElementById("addbtn");
const tasklist = document.getElementById("tasklist");
const startingTime = document.getElementById("startingtime");
const endingTime = document.getElementById("endingtime");
const dueDate = document.getElementById("duedate");
const PriorityTask = document.getElementById("Priority");
const timeNeeded = document.getElementById("timeneeded");
let taskLi = document.querySelectorAll("li")




// Display today date, day and month
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const month = document.querySelector(".month");
const currentDate = Date();
day.innerText = currentDate.slice(0, 4);
date.innerText = currentDate.slice(8, 10);
month.innerText = currentDate.slice(4, 7);



// add and save task in local storage
const existingtask = JSON.parse(localStorage.getItem("usertasks")) ?? [];
existingtask.forEach((task) => rendertask(task));
// add task function
function addtask() {
  const newtask = {
    taskId: Math.floor(Math.random() * Date.now()),
    taskname: taskinput.value,
    createddate: Date().slice(4, 16),
    createdtime: Date().slice(16, 25),
    duedate: dueDate.value,
    timeneeded: timeNeeded.value,
    startingtime : startingTime.value,
    endingtime: endingTime.value,
    priority: PriorityTask.value,
    status: "not completed"
  };
  existingtask.push(newtask);
  localStorage.setItem("usertasks", JSON.stringify(existingtask));
  Notify.success(`${taskinput.value} Task Added`);
  rendertask(newtask);
  taskinput.value = "";
}


function rendertask(task) {
  const li = document.createElement("li");

  li.innerHTML = `
                    <div class="taskname">
                      <input id="02-11" type="checkbox" name="r" value="2">
                      <label for="02-11">${task.taskname}</</label>
                    </div>
                    <p id="habitpriority">${task.priority}</p>
                    <p id="timeleft">${task.timeneeded}</p>
                    <p id="Due">${task.duedate}</p>
                    <p id="play" class="start"><i class="fa fa-play-circle-o"></i></p>
                  
                  `
  tasklist.append(li);
}


const saveTask = document.getElementById("savetask");
saveTask.onclick = () => {
    addtask();
    taskDetails.style.display = "block";
};

// function for pop up window
const taskDetails = document.querySelector(".taskDetails");
function revealtaskdetails() {
  taskDetails.style.display = "block";
}

// if taskinput is empty or space, task should not be added
addbtn.onclick = () => {
  if (taskinput.value.trim() != "") {
    // tasknamedetails.value = taskinput.value;
    revealtaskdetails();
  } 
  else {
    Notify.error(`Type Any Task Name`);
  }
};

// function for add task when enter press key is pressed
taskinput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (taskinput.value != "") {
      // tasknamedetails.value = taskinput.value;
      revealtaskdetails();
    } 
    else {
      Notify.error(`Type Any Task Name`);
    }
  }
});



// function for close pop up window
const close = document.getElementById("cancel");
close.onclick = function () {
  taskDetails.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
const taskPage = document.querySelector(".task-page");
window.onclick = function (event) {
  if (event.target == taskPage) {
    taskDetails.style.display = "none";
  }
}; 
