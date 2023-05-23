// -----------------------------------------------Required Variables----------------------------------------------
const taskinput = document.getElementById("add-task");
const addbtn = document.getElementById("addbtn");
const tasklist = document.getElementById("tasklist");
const detailsCard = document.querySelector(".detailsCard");
const startingTime = document.getElementById("startingtime");
const endingTime = document.getElementById("endingtime");
const dueDate = document.getElementById("duedate");
const PriorityTask = document.getElementById("Priority");
const timeNeeded = document.getElementById("timeneeded");
const notes = document.getElementById("notes");
const saveTask = document.getElementById("savetask");





// -----------------------------------------------Display Date----------------------------------------------
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const month = document.querySelector(".month");
const currentDate = Date();
day.innerText = currentDate.slice(0, 4);
date.innerText = currentDate.slice(8, 10);
month.innerText = currentDate.slice(4, 7);



// -----------------------------------------------Store Task----------------------------------------------
let existingtask = JSON.parse(localStorage.getItem("usertasks")) ?? [];
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



// -----------------------------------------------Render Task----------------------------------------------
function rendertask(task) {
  const li = document.createElement("li");

  li.innerHTML = `
                    <div class="taskname">
                      <label>
                        <input type="checkbox"/>
                        <span class="checkbox"></span>
                      </label>
                      <p id="nametask">${task.taskname}</p>
                    </div>
                    <p id="habitpriority">${task.priority}</p>
                    <p id="timeleft">${task.timeneeded}</p>
                    <p id="Due">${task.duedate}</p>
                    <p id="play" class="start"><i class="fa fa-play-circle-o"></i></p>
                    <button id="authorize_button" onclick="handleAuthClick()">Create Event</button>
                  `
  tasklist.append(li);
}


// -----------------------------------------------Add Task----------------------------------------------

saveTask.onclick = () => {
    addtask();
    detailsCard.style.display = "block";
};

// -----------------------------------------------Details Card----------------------------------------------
function revealdetailsCard() {
  detailsCard.style.display = "block";
}

// if taskinput is empty or space, task should not be added
addbtn.onclick = () => {
  if (taskinput.value.trim() != "") {
    // tasknamedetails.value = taskinput.value;
    revealdetailsCard();
  } 
  else {
    Notify.error(`Type Any Task Name`);
  }
};

// -----------------------------------------------Enter Add Task----------------------------------------------
taskinput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (taskinput.value != "") {
      // tasknamedetails.value = taskinput.value;
      revealdetailsCard();
    } 
    else {
      Notify.error(`Type Any Task Name`);
    }
  }
});



// -----------------------------------------------Close Window----------------------------------------------
const close = document.getElementById("cancel");
close.onclick = function () {
  detailsCard.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
const taskPage = document.querySelector(".task-page");
window.onclick = function (event) {
  if (event.target == taskPage) {
    detailsCard.style.display = "none";
  }
}; 



// -----------------------------------------------Task Details Div----------------------------------------------
const taskdetailsdiv = document.querySelector(".taskdetailsdiv");
const tasknamedetails = document.querySelector("#tasknamedetails")
const startingTimetd = document.getElementById("startingtimetd");
const endingTimetd = document.getElementById("endingtimetd");
const dueDatetd = document.getElementById("duedatetd");
const PriorityTasktd = document.getElementById("Prioritytd");
const timeNeededtd = document.getElementById("timeneededtd");
const notestd = document.getElementById("notestd");
const savedetailsdiv = document.getElementById("savedetailsdiv");
let taskLi = document.querySelectorAll("li");
const nametask = document.querySelectorAll("#nametask")

nametask.forEach((item, index)=>{
  item.addEventListener('click',()=>{
    setindex(index);
    taskdetailsdiv.style.display = "block";
    tasknamedetails.value = existingtask[index]["taskname"]
    timeNeededtd.value = existingtask[index]["timeneeded"]
    dueDatetd.value = existingtask[index]["duedate"]
    startingTimetd.value = existingtask[index]["startingtime"]
    endingTimetd.value = existingtask[index]['endingtime']
    PriorityTasktd.value = existingtask[index]['priority']
    // notestd.value = existingtask[index]["notes"]
    savedetailsdiv.setAttribute("onclick", `savedetails(${index})`);
    taskPage.style.filter = "blur(3px)";
  })
})

function savedetails(index){
   existingtask[index]["taskname"] =  tasknamedetails.value
   existingtask[index]["timeneeded"] =  timeNeededtd.value
   existingtask[index]["duedate"] =  dueDatetd.value
   existingtask[index]["startingtime"] =  startingTimetd.value
   existingtask[index]['endingtime'] =  endingTimetd.value
   existingtask[index]['priority'] =  PriorityTasktd.value
   existingtask[index]["notes"]  = notestd.value
   localStorage.setItem("usertasks", JSON.stringify(existingtask));
   Notify.success("Task Details Edited");
   taskdetailsdiv.style.display = "none";
   taskPage.style.filter = "none"
   location.reload();
}

const canceldetailsdiv = document.querySelector("#canceldetailsdiv")
canceldetailsdiv.onclick = ()=>{
  taskdetailsdiv.style.display = "none";
  taskPage.style.filter = "none"
} 