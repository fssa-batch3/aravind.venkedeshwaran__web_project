// -----------------------------------------------Required Variables----------------------------------------------
const addbtn = document.getElementById("addtaskplus");
const tasknameinput = document.getElementById("tasknameinput")
const tasklist = document.getElementById("tasklist");
const dueDate = document.getElementById("duedate");
const startingTime = document.getElementById("startingtime");
const endingTime = document.getElementById("endingtime");
const priorityTask = document.getElementById("priority");
const notes = document.getElementById("notes");
const saveTask = document.getElementById("savetask");
const addTaskPlus = document.getElementById("addtaskplus");
const taskdetailsdiv = document.querySelector(".taskdetailsdiv");
let dateheader = document.getElementById("date");
let TimeNow = document.getElementById("timenow");
let curweather = document.getElementById("curweather")
const username = document.getElementById("username");
const quotenow = document.getElementById("quotenow")
dateheader.innerText = `${Date().slice(0,10)},`



let existingtask = JSON.parse(localStorage.getItem("usertasks")) ?? [];
existingtask.forEach((task) => rendertask(task));
// add task function
function addtask() {
  const newtask = {
    taskId: Math.floor(Math.random() * Date.now()),
    taskname: tasknameinput.value,
    createddate: Date().slice(4, 16),
    createdtime: Date().slice(16, 25),
    duedate: dueDate.value,
    startingtime : startingTime.value,
    endingtime: endingTime.value,
    priority: priorityTask.value,
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
                    <div class="taskli">
                      <label>
                        <input type="checkbox"/>
                        <span class="checkbox"></span>
                      </label>
                      <img src="../assets/Images/clock img.png" alt="">
                      <p id="nametask">${task.taskname}</p>
                      <p id="priority">${task.priority}</p>
                      <p id="starttime">${task.startingtime} - </p> 
                      <p id="endtime">${task.endingtime}</p>
                    </div>
                    
                  `
  tasklist.append(li);
}


addTaskPlus.addEventListener('click', ()=>{
  taskdetailsdiv.style.display = "block"
})

saveTask.addEventListener('click', ()=>{
  addtask()
})



const currentDate = new Date();
const options = { hour: 'numeric', minute: 'numeric', hour12: true };

const currentTime = currentDate.toLocaleString('en-US', options);
TimeNow.innerText= currentTime


// function getWeatherCondition() {
//   const conditions = ['rainy', 'sunny', 'cloudy', 'stormy'];
//   const randomIndex = Math.floor(Math.random() * conditions.length);
//   return conditions[randomIndex];
// }

// const currentWeather = getWeatherCondition();
// curweather.innerText = currentWeather

const userdate = JSON.parse(localStorage.getItem("userdata"))
let activeuseremail = JSON.parse(localStorage.getItem("userlogin"))
for(let i = 0; i < userdate.length; i++){
  if(activeuseremail == userdate[i]["email"]){
    username.innerText = `${userdate[i]["name"]}`
  }
}



/* -------------------------------------------------CALENDAR SCRIPT----------------------------------------------- */
const daysTag = document.querySelector(".days"),
curntdate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    curntdate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});



// --------------------------------index of li-------------------------------------------------------
  document.querySelectorAll(".days li").forEach((item, index)=>{
    item.onclick = ()=>{
      console.log(index);
    }
})

function getRandomMotivationalQuote() {
  const quotes = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

const randomQuote = getRandomMotivationalQuote();
quotenow.innerText = randomQuote


// emoji
document.addEventListener('DOMContentLoaded', function() {
  const emojiMenuToggle = document.querySelector('.emoji-menu-toggle');
  const emojiMenuContent = document.querySelector('.emoji-menu-content');

  emojiMenuToggle.addEventListener('click', function() {
    emojiMenuContent.style.display = emojiMenuContent.style.display === 'block' ? 'none' : 'block';
  });

  emojiMenuContent.addEventListener('click', function(event) {
    const clickedButton = event.target;
    if (clickedButton.tagName === 'BUTTON') {
      const selectedEmoji = clickedButton.textContent;
      emojiMenuToggle.innerHTML = selectedEmoji;
      // Perform any desired action with the selected emoji
      // For example, you can insert it into an input field or display it somewhere on the page
    }
  });
});