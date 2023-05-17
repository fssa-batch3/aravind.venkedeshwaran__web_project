// /* -----------------------------------------------date slider----------------------------------------------- */
// const daystimelineDiv = document.querySelector(".daystimeline");
// const year = 2023;
// const month = 4; // May
// const day = 1; // Starting day of the month
// const getDate = new Date(year, month, day);
// const maytodec = [];

// while (getDate.getFullYear() === year) {
//   if (getDate.getDay() <= 6) {
//     maytodec.push(getDate.toDateString());
//   }
//   getDate.setDate(getDate.getDate() + 1);
// }

// for (let i = 6; i <= 91; i++) {
//   const datedayDiv = document.createElement("div");
//   datedayDiv.className = "dateday";

//   const dayOfWeek = document.createElement("p");
//   dayOfWeek.id = "dayOfWeek";
//   dayOfWeek.innerText = maytodec[i].slice(0, 4);

//   const dateOfMonth = document.createElement("p");
//   dateOfMonth.id = "dateOfMonth";
//   dateOfMonth.innerText = maytodec[i].slice(8, 10);

//   const MonthOf2023 = document.createElement("p");
//   MonthOf2023.id = "MonthOf2023";
//   MonthOf2023.innerText = maytodec[i].slice(3, 7);

//   datedayDiv.appendChild(dayOfWeek);
//   datedayDiv.appendChild(dateOfMonth);
//   datedayDiv.appendChild(MonthOf2023);
//   daystimelineDiv.appendChild(datedayDiv);
// }

// // drag dates
// daystimelineDiv.addEventListener("wheel", (e) => {
//   e.preventDefault();
//   daystimelineDiv.scrollLeft += e.deltaY;
// });

// let isDragging = false;
// let startPosition = 0;
// let currentTranslate = 0;
// let previousTranslate = 0;
// const animationId = 0;

// daystimelineDiv.addEventListener("mousedown", (e) => {
//   isDragging = true;
//   startPosition = e.clientX;
//   daystimelineDiv.style.cursor = "grabbing";
//   currentTranslate = getTranslateX();
//   previousTranslate = currentTranslate;

//   cancelAnimationFrame(animationId);
// });

// daystimelineDiv.addEventListener("mousemove", (e) => {
//   if (isDragging) {
//     const currentPosition = e.clientX;
//     const distance = currentPosition - startPosition;
//     daystimelineDiv.scrollLeft = previousTranslate - distance;
//   }
// });

// daystimelineDiv.addEventListener("mouseup", () => {
//   isDragging = false;
//   daystimelineDiv.style.cursor = "grab";
//   previousTranslate = getTranslateX();
// });

// daystimelineDiv.addEventListener("mouseleave", () => {
//   isDragging = false;
//   daystimelineDiv.style.cursor = "grab";
//   previousTranslate = getTranslateX();
// });

// function getTranslateX() {
//   const style = window.getComputedStyle(daystimelineDiv);
//   const matrix = new DOMMatrixReadOnly(style.transform);
//   return matrix.m41;
// }

// showing today's date first
// let today = Date().slice(0,15);

// for(let i = 6; i <= 91; i++){
//   if(today == maytodec[i]){
//     alert(`${maytodec[i]}`)
//     let todaydate = maytodec[i]
//     todaydate.style.display = "none";
//   }
// }

/* -----------------------------------------------Add Habit Function----------------------------------------------- */
const habitPage = document.querySelector(".habit");
const addHabitInput = document.getElementById("addhabit");
const habitpopup = document.querySelector(".addhabitpopup");
const habitList = document.querySelector(".habitlist");
const habitNameInput = document.getElementById("habitname");
const saveHabit = document.getElementById("savehabit");
const habitDetail = document.querySelector(".habitdetails");
const habiticon = document.querySelector(".habiticon");

// habiticon.addEventListener("change",()=>{
//   let emojiDiv = document.querySelector(".emojioneemoji");
// })

// let habitstarter = document.querySelector(".habitstarter");
// addHabitInput.addEventListener("change", () => {
//   habitstarter.style.display = "block";
//   habitPage.style.filter = "blur(3px)";
//   habitNameInput.value = addHabitInput.value
// });

// let habitstarterCancel = document.getElementById("startercancel");
// habitstarterCancel.onclick = function () {
//   habitstarter.style.display = "none";
//   habitPage.style.filter = "none"
// }

// let habitstarterNext = document.getElementById("starternext");
addHabitInput.addEventListener("change", () => {
  // habitstarter.style.display = "none";
  habitpopup.style.display = "block";
  habitPage.style.filter = "blur(3px)";
  habitNameInput.value = addHabitInput.value;
});

const cancelHabit = document.getElementById("cancel");

cancelHabit.onclick = function () {
  habitpopup.style.display = "none";
  habitPage.style.filter = "none";
};

const cancelnotes = document.getElementById("cancelnotes");
const notespopup = document.querySelector(".notes");

cancelnotes.onclick = function () {
  notespopup.style.display = "none";
  habitPage.style.filter = "none";
};

const existinghabit = JSON.parse(localStorage.getItem("userhabits")) ?? [];
existinghabit.forEach((habit) => renderhabit(habit));



saveHabit.addEventListener("click", () => {
  const newhabit = {
    habitId: Math.floor(Math.random() * Date.now()),
    habitName: habitNameInput.value,
    createddate: Date().slice(0, 15),
    createdtime: Date().slice(16, 25),
    habitType: "To Do",
    habitRepeat: "everyday",
    habitRemainder: "",
    habitActive: [],
    currentStreak: "",
    streakHistory: [],
    status: "",
  };
  existinghabit.push(newhabit);
  localStorage.setItem("userhabits", JSON.stringify(existinghabit));
  renderhabit(newhabit);
  addHabitInput.value = "";
  habitpopup.style.display = "none";
  habitPage.style.filter = "none";
  Notify.success(`${habitName.value} Habit Added`);
});

// render habit in habit page

function renderhabit(habit) {
  const li = document.createElement("li");
  li.id = "habitLi";
  li.innerHTML = `<div id="habitcard">
                        <div id="habitnamecard">
                          
                          <div id="habicardname"> <p id="habitcolor"></p>  <p id="habitnametext">${habit.habitName}</p></div>
                          <p id="habitdescrip">✔ Great Start</p>
                        </div>

                        <div class="habitcheck">
                        <div class="check">
                          <input id="habitcheckbox" type="checkbox"/>
                          <label for="habitcheckbox"></label>
                          <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                            <path d="M2 8.36364L6.23077 12L13 2"></path>
                          </svg>
                        </div>
                        <!-- Gooey-->
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                          <defs>
                            <filter id="goo-12">
                              <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                              <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                              <feblend in="SourceGraphic" in2="goo-12"></feblend>
                            </filter>
                          </defs>
                        </svg>
                        </div>

                      </div>
                    
                      <div class="doneandnotes">
                            <p id="streak" onclick="revealstreak()"><i class='fas fa-fire-alt'></i>Streak</p>
                            <p id="notes"  onclick="revealnotes() "><i class='fas fa-book'></i> Notes</p>
                      </div>
                      
                      `;
  habitList.append(li);
}

// saveHabit.addEventListener('click', addhabit())

const habitnamecard = document.querySelectorAll("#habitnamecard");
const habittimes = document.querySelectorAll("#habittimes");

for (let i = 0; i < habitnamecard.length; i++) {
  habitnamecard[i].addEventListener("click", () => {
    habitnamecard[i].style.transform = "translateX(180px)";
  });
}

const streakbtn = document.querySelectorAll("#streak");
const habitstreakDiv = document.querySelector(".habitstreak");
function revealstreak() {
  habitstreakDiv.style.display = "block";
}

const notesbtn = document.querySelectorAll("#notes");
const notesDiv = document.querySelector(".notes");
function revealnotes() {
  notesDiv.style.display = "block";
  habitPage.style.filter = "blur(3px)";
}


/* -----------------------------------------------Habit Header----------------------------------------------- */
/* ----------------------------------------------- Search----------------------------------------------- */

let searchInput = document.getElementById("habitsearch");
let habitnametext = document.querySelectorAll("#habitnametext");
let habitLi = document.querySelectorAll(".habitlist li");


searchInput.addEventListener('keyup', ()=>{
  habitLi.forEach((item,i)=> {

    let search= searchInput.value.trim().toLowerCase();

    if(habitnametext[i].innerHTML.includes(search)){
      item.style.display = "flex"
    }
    else{
      item.style.display = "none"
    }

  })
})

/* ----------------------------------------------- Filter ----------------------------------------------- */
let habitFilter = document.getElementById("HabitFilter")
habitFilter.onchange = () => {
  if(habitFilter.value == "Alphabetic Order"){
    Array.from(habitLi).sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => habitList.appendChild(li));
  }
  else if(habitFilter.value == "My Habit Order"){
    existinghabit.forEach((habit) => renderhabit(habit));
    console.log(habitFilter.value);

  }
}



/* -------------------------------------------------STREAK SCRIPT-------------------------------------------------- */

const streakhabitname = document.querySelector(".habitname");
const deletehabitbtn = document.querySelector("#deletehabit");
const edithabitbtn = document.querySelector(".edithabit");
const habitpopupform = document.getElementById("habitpopupform");


// transfer the index for functions
streakbtn.forEach((item, index) => {
  // habit name
  item.addEventListener("click", () => {
    streakhabitname.innerText = existinghabit[index].habitName;
    deletehabitbtn.setAttribute("onclick", `deletehabit(${index})`);
    edithabitbtn.setAttribute("onclick", `edithabit(${index})`);
    streak(index);
    streakstatus(index);
    habitCalendar(index);
  });
});

function deletehabit(index) {
  // Notify.error("Habit Deleted");
  existinghabit.splice(index, 1);
  localStorage.setItem("userhabits", JSON.stringify(existinghabit));
  location.reload();
}


function edithabit(index) {
  // add habit popup
  habitpopup.style.display = "block";
  habitPage.style.filter = "blur(3px)";

  // fill the clicked habit's name
  habitNameInput.value = existinghabit[index].habitName;

  // change the name
  habitNameInput.addEventListener("change", (e) => {
    // e.preventDefault();
    existinghabit[index].habitName = habitNameInput.value;
    localStorage.setItem("userhabits", JSON.stringify(existinghabit));
  });
}


// saving active habit dates in local storage
const habitcheck = document.querySelectorAll("#habitcheckbox");
const gettoday = Date().slice(0, 15);
// const gettoday = "Thu May 18 2023" ;

for (let i = 0; i < habitcheck.length; i++) {
  habitcheck[i].onclick = function () {
    if (habitcheck[i].checked) {
      let dateexist = false;
      let habitactivelen = existinghabit[i]["habitActive"].length;
      if (habitactivelen > 0) {
        for (let j = 0; j < habitactivelen; j++) {
          if (gettoday === existinghabit[i]["habitActive"][j]) {
            dateexist = true;
          }
        }
        if (!dateexist) {
          existinghabit[i].habitActive.push(gettoday);
          localStorage.setItem("userhabits", JSON.stringify(existinghabit));
        }
      }
      else {
        existinghabit[i].habitActive.push(gettoday);
        localStorage.setItem("userhabits", JSON.stringify(existinghabit));
      }
    }
  };
}


// current streak
function streak(index) {
  let habitactivelen = existinghabit[index]["habitActive"].length;
  let streakcount;
  let lastIndex;

  if (habitactivelen >= 2) {
    streakcount = 1;
    for (let i = 0; i < habitactivelen; i++) {
      let firstIndex = existinghabit[index].habitActive[i];
      let secondIndex = existinghabit[index].habitActive[i + 1];
      if (secondIndex) {
        if (firstIndex.slice(4, 7) == secondIndex.slice(4, 7)) { //Month Check 
          let datedifference = Math.abs(Number(firstIndex.slice(8, 10)) - Number(secondIndex.slice(8, 10)));
          if (datedifference == 1) {
            streakcount++;
            lastIndex = i + 1;
            console.log(lastIndex)
          }
          else {
            streakcount = 0;
          }
        }
      }
    }
    if (streakcount > 1) {
      document.getElementById("streakfrom").innerText = existinghabit[index]["habitActive"][Math.abs(lastIndex - streakcount) - 1];
    }
  }
  else if (habitactivelen == 1) {
    streakcount = 1
    document.getElementById("streakfrom").innerText = gettoday
  }
  else if (habitactivelen == 0) {
    streakcount = 0
    document.getElementById("streakfrom").innerText = "Start From Today"
  }
  if(streakcount == 0){
    document.getElementById("streakfrom").innerText = "Start From Today"
  }
  // save streakcount in local Storage
  existinghabit[index]["currentStreak"] = `${streakcount} Days`
  localStorage.setItem("userhabits", JSON.stringify(existinghabit))

  // read and show
  document.getElementById("currentstreak").innerText = existinghabit[index]["currentStreak"];
}


function streakstatus(index) {

  // total completion of habit
  document.querySelector(".totaldays").innerText = `${existinghabit[index]["habitActive"].length} Times`;

  // total times failed to do habit

  // creating an array from starting date to today

  let starttotodayarr = [];

  const createdOn = existinghabit[index]["createddate"]
  const startOn = new Date(createdOn);
  
  const today = new Date();
  
  let currentDate = startOn;
  
  while (currentDate <= today) {
  
      starttotodayarr.push(startOn.toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
  
  }
  
  console.log(starttotodayarr);

  // check each date is present in habitactive array
  let failcount;
  let successcount;
  if(existinghabit[index]["habitActive"].length > 0){
    failcount = 0;
    successcount = 0;
    let successstatus = false;
    let failstatus = 0;
    for(let date of starttotodayarr){
      for(let i = 0; i < existinghabit[index]["habitActive"].length; i++){
          if(date != existinghabit[index]["habitActive"][i]){
            failstatus = 1; 
          }
      }
      if(failstatus == 1){
        failcount++
      }
    }
  }
  else{
    failcount = starttotodayarr.length;
  }
  document.querySelector(".faildays").innerText = `${failcount} Days`
  // console.log(starttotodayarr);
  console.log("successcount",successcount);
  console.log("failcount",failcount);

}

/* -------------------------------------------------CALENDAR SCRIPT----------------------------------------------- */
function habitCalendar(index){
const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let activedays = existinghabit[index]["habitActive"];

const renderCalendar = () => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
  const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";


  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    const isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    const isActiveDay = activedays.includes(
      new Date(currYear, currMonth, i).toDateString()
    );
    const colorClass = isActiveDay ? "active-day" : "";
    liTag += `<li class="${isToday} ${colorClass}">${i}</li>`;
  }
  
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
}
renderCalendar()  


prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
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

}


/* -----------------------------------------------NOTES SCRIPT----------------------------------------------- */
const notesarea = document.querySelector(".notes-editor");

function fontsize(e) {
  const { value } = e;
  notesarea.style.fontSize = `${value}px`;
  // console.log(e);
}

function bold(e) {
  if (notesarea.style.fontWeight == "bold") {
    notesarea.style.fontWeight = "normal";
    e.classList.remove("active");
  } else {
    notesarea.style.fontWeight = "bold";
    e.classList.add("active");
  }
}

function italic(e) {
  if (notesarea.style.fontStyle == "italic") {
    notesarea.style.fontStyle = "normal";
    e.classList.remove("active");
  } else {
    notesarea.style.fontStyle = "italic";
    e.classList.add("active");
  }
}

function underline(e) {
  if (notesarea.style.textDecoration == "underline") {
    notesarea.style.textDecoration = "none";
    e.classList.remove("active");
  } else {
    notesarea.style.textDecoration = "underline";
    e.classList.add("active");
  }
}

function leftalign(e) {
  notesarea.style.textAlign = "left";
}

function centeralign(e) {
  notesarea.style.textAlign = "center";
}

function rightalign(e) {
  notesarea.style.textAlign = "right";
}

function uppercase(e) {
  if (notesarea.style.textTransform == "uppercase") {
    notesarea.style.textTransform = "none";
    e.classList.remove("active");
  } else {
    notesarea.style.textTransform = "uppercase";
    e.classList.add("active");
  }
}

function normalizenotes() {
  console.log("normalize is working");
  notesarea.style.fontWeight = "normal";
  notesarea.style.textAlign = "left";
  notesarea.style.fontStyle = "normal";
  notesarea.style.textTransform = "capitalize";
  // notesarea.value = "";
}

function fontcolor(e) {
  const { value } = e;
  notesarea.style.color = value;
}

// window.addEventListener('load', () => {
//     notesarea.value = "";
// });

// const toolbar = document.querySelector('.notes-toolbar');
const buttons = document.querySelectorAll(".btn");
const editor = document.querySelector(".notes-editor");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.getAttribute("data-type");

    switch (type) {
      case "heading":
        document.execCommand("formatBlock", false, "<h2>");
        break;
      case "bold":
        document.execCommand("bold", false, null);
        break;
      case "italic":
        document.execCommand("italic", false, null);
        break;
      case "underline":
        document.execCommand("underline", false, null);
        break;
      case "ordered-list":
        document.execCommand("insertOrderedList", false, null);
        break;
      case "unordered-list":
        document.execCommand("insertUnorderedList", false, null);
        break;
      default:
        break;
    }

    button.classList.toggle("active");
    editor.focus();
  });
});


let savenotes = document.getElementById("savenotes");
let title = document.getElementById("title");
let existingNotes = JSON.parse(localStorage.getItem('habitNotes')) ?? [];


savenotes.addEventListener('click', ()=>{
  let habitNotes = [];
  let notes = {
    notesId: Math.floor(Math.random() * Date.now()),
    notesHeading : title.value,
    notes: notesarea.innerHTML
  }
  existingNotes.push(notes);
  localStorage.setItem("habitNotes", JSON.stringify(existingNotes));

  notespopup.style.display = "none";
  habitPage.style.filter = "none";
  alert("notes saved")
})