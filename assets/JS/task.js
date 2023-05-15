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
    notes: notes.value,
    status: "not completed"
  };
  existingtask.push(newtask);
  localStorage.setItem("usertasks", JSON.stringify(existingtask));
  Notify.success(`${taskinput.value} Task Added`);
  rendertask(newtask);
  taskinput.value = "";
}

// render task in local storage function
// function rendertask(task) {
//   const li = document.createElement("li");
//   const indexStatus = existingtask.findIndex(
//     (t) => t.taskname == task.taskname
//   );
//   if (existingtask[indexStatus].status == "completed") {
//     li.innerHTML = `<span id="taskspan" onclick="popup()">
//                     <span id="taskHeading"> <s>${task.taskname}</s></span>
//                     <span id="todosdescrip">Project Description</span>
//                     </span>
//                     <button id="checkmark" >&#10004;</button>
//                     <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>
//                     `;
//   } else {
//     li.innerHTML = `<span id="taskspan" onclick="popup()">
//                         <span id="taskHeading">${task.taskname}</span>
//                         <span id="todosdescrip">Project Description</span>
//                         </span>

//                     <button id="checkmark" >&#10004;</button>
//                     <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>
//                     `;
//   }
//   li.querySelector("#checkmark").addEventListener("click", () => {
//     const indexDone = existingtask.findIndex(
//       (t) => t.taskname == task.taskname
//     );
//     li.innerHTML = `<span id="taskspan" onclick="popup()">
//                         <span id="taskHeading"> <s>${task.taskname}</s></span>
//                         <span id="todosdescrip">Project Description</span>
//                         </span>
//                         <button id="checkmark" >&#10004;</button>
//                         <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>`;
//     existingtask[indexDone].status = "completed";
//     localStorage.setItem("usertasks", JSON.stringify(existingtask));
//     Notify.success(`${task.taskname} Task Completed`);
//   });
//   li.querySelector("#deletebtn").addEventListener("click", () => {
//     const indexDel = existingtask.findIndex((t) => t.taskname == task.taskname);
//     existingtask.splice(indexDel, 1);
//     localStorage.setItem("usertasks", JSON.stringify(existingtask));
//     Notify.error(`${task.taskname} Task Removed`);
//     li.remove();
//   });
//   tasklist.append(li);
// }

// Task Details

function rendertask(task) {
  const li = document.createElement("li");

  li.innerHTML = `
                    <div class="taskname">
                      <input id="02-11" type="checkbox" name="r" value="2">
                      <label for="02-11" onclick="popup()">${task.taskname}</</label>
                    </div>
                    <p id="habitpriority">${task.priority}</p>
                    <p id="timeleft">${task.timeneeded}</p>
                    <p id="Due">${task.duedate}</p>
                    <p id="play" class="start"><i class="fa fa-play-circle-o"></i></p>
                  
                  `




  // li.querySelector("#deletebtn").addEventListener("click", () => {
  //   const indexDel = existingtask.findIndex((t) => t.taskname == task.taskname);
  //   existingtask.splice(indexDel, 1);
  //   localStorage.setItem("usertasks", JSON.stringify(existingtask));
  //   Notify.error(`${task.taskname} Task Removed`);
  //   li.remove();
  // });
  tasklist.append(li);
}



const taskTitle = document.getElementById("taskName");
const taskspanlist = document.querySelectorAll("li");
taskspanlist.forEach((item, index) => {
  item.onclick = () => {
    tasknamedetails.value = existingtask[index].taskname;

    revealtaskdetails();

    // get value from dues and save in local storage
    savedues(index);

    // get value from local storage and display it in value task details
    displaydues(index);

    // subtask(index);
  };
});


function savedues(index) {
  // setting duetime in local storage
  startingTime.onchange = () => {
    existingtask[index].startingtime = startingTime.value;
    localStorage.setItem("usertasks", JSON.stringify(existingtask));
    alert("starting time Changed");
  };

  endingTime.onchange = () => {
    existingtask[index].endingtime = endingTime.value;
    localStorage.setItem("usertasks", JSON.stringify(existingtask));
    alert("ending time Changed");
  };

  // setting duedate in local storage
  dueDate.onchange = () => {
    existingtask[index].duedate = dueDate.value;
    localStorage.setItem("usertasks", JSON.stringify(existingtask));
    alert("DueDate Changed");
  };

  // setting priority in local storage
  PriorityTask.onchange = () => {
    existingtask[index].priority = PriorityTask.value;
    localStorage.setItem("usertasks", JSON.stringify(existingtask));
    alert("priority Changed");
  };
}

function displaydues(index) {
  // Display current or saved time in task details
  const currentTime = Date().slice(16, 21);

  if (existingtask[index].timeneeded) {
    timeNeeded.value = existingtask[index].timeneeded;
  } 

  if (existingtask[index].startingtime == "") {
    startingTime.value = currentTime;
  } else {
    startingTime.value = existingtask[index].startingtime;
  }

  if (existingtask[index].endingtime == "") {
    endingTime.value = currentTime;
  } else {
    endingTime.value = existingtask[index].endingtime;
  }

  // Display current date in task details
  if (existingtask[index].duedate == "") {
    dueDate.value = new Date().toJSON().slice(0, 10);
  } else {
    dueDate.value = existingtask[index].duedate;
  }

  // Display Priority
  if (existingtask[index].priority != "") {
    PriorityTask.value = existingtask[index].priority;
  }
}

// const subTaskCheck = document.getElementById("subtaskcheck");
// const subTask = document.getElementById("subtask");
// function subtask(index) {
//   subTask.onchange = () => {
//     const existingsubtask =
//       existingtask[index].subtask == "" ? [] : existingtask[index].subtask;
//     const newsubtask = {
//       task: subTask.value,
//       status: subTaskCheck.checked ? "done" : "not done",
//     };
//     existingsubtask.push(newsubtask);
//     existingtask[index].subtask = existingsubtask;
//     localStorage.setItem("usertasks", JSON.stringify(existingtask));
//     alert("subtask added");
//     rendersubtask(newsubtask);
//   };
// }

// function rendersubtask() {
//   const subtaskDiv = document.querySelector(".subtask");

//   existingtask.forEach((item) => {
//     for (let i = 0; i < item.subtask; i++) {
//       const taskli = document.createElement("li");
//       taskli.innerHTML = `<input type="checkbox" id="subtaskstatus">
//                               <label id="subtaskstatus">${item.subtask[i]}</label>`;

//       subtaskDiv.append(taskli);
//     }
//   });
// }


const saveTask = document.getElementById("savetask");
const tasknamedetails = document.getElementById("tasknamedetails");
saveTask.onclick = () => {
  if (tasknamedetails.value.trim() != "") {
    addtask();
  } 
  else {
    Notify.error(`Type Any Task Name`);
  }
};

// function for pop up window
const taskDetails = document.querySelector(".taskDetails");
function revealtaskdetails() {
  taskDetails.style.display = "block";
}

// if taskinput is empty or space, task should not be added
addbtn.onclick = () => {
  if (taskinput.value.trim() != "") {
    tasknamedetails.value = taskinput.value;
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
      tasknamedetails.value = taskinput.value;
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
