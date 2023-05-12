/*-----------------------------------------------date slider-----------------------------------------------*/
const daystimelineDiv = document.querySelector(".daystimeline");
const year = 2023;
const month = 4; // May
const day = 1; // Starting day of the month
const getDate = new Date(year, month, day);
let maytodec = []

while (getDate.getFullYear() === year) {
  if (getDate.getDay() <= 6) {
    maytodec.push(getDate.toDateString());
  }
  getDate.setDate(getDate.getDate() + 1);
}

for (let i = 6; i <= 91; i++) {
  const datedayDiv = document.createElement("div");
  datedayDiv.className = "dateday";

  const dayOfWeek = document.createElement("p");
  dayOfWeek.id = "dayOfWeek";
  dayOfWeek.innerText = maytodec[i].slice(0, 4);

  const dateOfMonth = document.createElement("p");
  dateOfMonth.id = "dateOfMonth";
  dateOfMonth.innerText = maytodec[i].slice(8, 10);

  const MonthOf2023 = document.createElement("p");
  MonthOf2023.id = "MonthOf2023";
  MonthOf2023.innerText = maytodec[i].slice(3, 7)

  datedayDiv.appendChild(dayOfWeek);
  datedayDiv.appendChild(dateOfMonth);
  datedayDiv.appendChild(MonthOf2023);
  daystimelineDiv.appendChild(datedayDiv);

}


// drag dates
daystimelineDiv.addEventListener("wheel", e => {
  e.preventDefault();
  daystimelineDiv.scrollLeft += e.deltaY;
});

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationId = 0;

daystimelineDiv.addEventListener("mousedown", e => {
  isDragging = true;
  startPosition = e.clientX;
  daystimelineDiv.style.cursor = "grabbing";
  currentTranslate = getTranslateX();
  previousTranslate = currentTranslate;

  cancelAnimationFrame(animationId);
});

daystimelineDiv.addEventListener("mousemove", e => {
  if (isDragging) {
    const currentPosition = e.clientX;
    const distance = currentPosition - startPosition;
    daystimelineDiv.scrollLeft = previousTranslate - distance;
  }
});

daystimelineDiv.addEventListener("mouseup", () => {
  isDragging = false;
  daystimelineDiv.style.cursor = "grab";
  previousTranslate = getTranslateX();
});

daystimelineDiv.addEventListener("mouseleave", () => {
  isDragging = false;
  daystimelineDiv.style.cursor = "grab";
  previousTranslate = getTranslateX();
});

function getTranslateX() {
  const style = window.getComputedStyle(daystimelineDiv);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return matrix.m41;
}


// showing today's date first
// let today = Date().slice(0,15);
// for(let i = 6; i <= 91; i++){
//   if(today == maytodec[i]){
//     alert("todays date found")
//     maytodec[i].style.transform = "translateX(40px)";
//   }
// }


/*-----------------------------------------------Add Habit Function-----------------------------------------------*/
let habitPage = document.querySelector(".habit");
let addHabitInput = document.getElementById("addhabit");
let habitpopup = document.querySelector(".addhabitpopup");
let habitList = document.querySelector(".habitlist");
let habitName = document.getElementById("habitname");
let saveHabit = document.getElementById("savehabit");
let habitDetail = document.querySelector(".habitdetails");
let habiticon = document.querySelector(".habiticon");

// habiticon.addEventListener("change",()=>{
//   let emojiDiv = document.querySelector(".emojioneemoji");
// })



let habitstarter = document.querySelector(".habitstarter");
addHabitInput.addEventListener("change", () => {
  habitstarter.style.display = "block";
  habitPage.style.filter = "blur(3px)";
  habitName.value = addHabitInput.value
});

let habitstarterCancel = document.getElementById("startercancel");
habitstarterCancel.onclick = function () {
  habitstarter.style.display = "none";
  habitPage.style.filter = "none"
}

let habitstarterNext = document.getElementById("starternext");
habitstarterNext.onclick = function () {
  habitstarter.style.display = "none";
  habitpopup.style.display = "block";
  habitPage.style.filter = "blur(3px)"
}

let cancelHabit = document.getElementById("cancel");

cancelHabit.onclick = function () {
  habitpopup.style.display = "none";
  habitPage.style.filter = "none"
}

let cancelnotes = document.getElementById("cancelnotes");
let notespopup = document.querySelector(".notes");

cancelnotes.onclick = function () {
  notespopup.style.display = "none";
  habitPage.style.filter = "none"
}




let existinghabit = JSON.parse(localStorage.getItem("userhabits")) ?? [];
existinghabit.forEach(habit => renderhabit(habit))

saveHabit.addEventListener('click',
  function addhabit() {
    let newhabit = {
      habitId: Math.floor(Math.random() * Date.now()),
      habitName: habitName.value,
      createddate: Date().slice(4, 16),
      createdtime: Date().slice(16, 25),
      habitType: "To Do",
      habitRepeat: "everyday",
      habitRemainder: "",
      habitActive: [],
      currentStreak: "",
      streakHistory: [],
      status: ""
    }
    existinghabit.push(newhabit);
    localStorage.setItem("userhabits", JSON.stringify(existinghabit))
    renderhabit(newhabit);
    addHabitInput.value = ""
    habitpopup.style.display = "none";
    habitPage.style.filter = "none"
    Notify.success(`${habitName.value} Habit Added`);
  });

// render habit in habit page

function renderhabit(habit) {
  let li = document.createElement('li');
  li.innerHTML = `<div id="habitcard">
                        <div id="habitnamecard">
                          
                          <div id="habicardname"> <p id="habitcolor"></p>  <p>${habit.habitName}</p></div>
                          <p id="habitdescrip">✔ Great Start</p>
                        </div>

                        <div class="habitcheck">
                        <div class="cbx">
                          <input id="cbx-12" type="checkbox"/>
                          <label for="cbx-12"></label>
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
                      
                      `
  habitList.append(li)
}

// saveHabit.addEventListener('click', addhabit())

let habitnamecard = document.querySelectorAll("#habitnamecard");
let habittimes = document.querySelectorAll("#habittimes");

for (let i = 0; i < habittimes.length; i++) {
  habittimes[i].addEventListener('click', () => {
    habittimes[i].style.transform = "translateX(-200px)";
  })
}

for (let i = 0; i < habitnamecard.length; i++) {
  habitnamecard[i].addEventListener('click', () => {
    habitnamecard[i].style.transform = "translateX(180px)";

  })
}


let streakbtn = document.querySelectorAll("#streak");
let habitstreakDiv = document.querySelector(".habitstreak");
function revealstreak() {
  habitstreakDiv.style.display = 'block';
}

let notesbtn = document.querySelectorAll("#notes");
let notesDiv = document.querySelector(".notes");
function revealnotes() {
  notesDiv.style.display = "block";
  habitPage.style.filter = "blur(3px)";
}


/*-------------------------------------------------STREAK SCRIPT--------------------------------------------------*/


let habitcheck = document.querySelectorAll("#check-5");
for (let i = 0; i < habitcheck.length; i++) {
  habitcheck[i].onclick = function () {
    if (habitcheck[i].checked) {
      let gettoday = Date().slice(0, 15);
      existinghabit[i]["habitActive"].push(gettoday);
      localStorage.setItem("userhabits", JSON.stringify(existinghabit))
    }
  }
}

function streak() {
let streakcount;

for (let i = 0; i < existinghabit.length; i++) {
  for (let j = 0; j < existinghabit[i].habitActive.length; j++) {
    let firstIndex = existinghabit[i].habitActive[j];
    let secondIndex = existinghabit[i].habitActive[j + 1];
    if (secondIndex) {
      if (firstIndex.slice(4, 7) == secondIndex.slice(4, 7)) { //Month Check 
        let datedifference = Math.abs(Number(firstIndex.slice(8, 10)) - Number(secondIndex.slice(8, 10)));
        if (datedifference == 1) {
          streakcount++
        }
        else {
          streakcount = 0;
        }
      }
    }
    else {
      streakcount = 1
    }
  }
}
  existinghabit[i]["habitActive"].push(gettoday);
  localStorage.setItem("userhabits", JSON.stringify(existinghabit))

}


/*-------------------------------------------------CALENDAR SCRIPT-----------------------------------------------*/
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
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
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
  icon.addEventListener("click", () => { // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
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





/*-----------------------------------------------NOTES SCRIPT-----------------------------------------------*/
const notesarea = document.querySelector(".notes-editor");

function fontsize(e) {
  let value = e.value;
  notesarea.style.fontSize = value + "px";
  // console.log(e);
}

function bold(e) {
  if (notesarea.style.fontWeight == "bold") {
    notesarea.style.fontWeight = "normal";
    e.classList.remove("active");
  }
  else {
    notesarea.style.fontWeight = "bold";
    e.classList.add("active");
  }
}

function italic(e) {
  if (notesarea.style.fontStyle == "italic") {
    notesarea.style.fontStyle = "normal";
    e.classList.remove("active");
  }
  else {
    notesarea.style.fontStyle = "italic";
    e.classList.add("active");
  }
}

function underline(e) {
  if (notesarea.style.textDecoration == "underline") {
    notesarea.style.textDecoration = "none";
    e.classList.remove("active");
  }
  else {
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
  }
  else {
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
  let value = e.value;
  notesarea.style.color = value;
}

// window.addEventListener('load', () => {
//     notesarea.value = "";
// });

// const toolbar = document.querySelector('.notes-toolbar');
const buttons = document.querySelectorAll('.btn');
const editor = document.querySelector('.notes-editor');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-type');

    switch (type) {
      case 'heading':
        document.execCommand('formatBlock', false, '<h2>');
        break;
      case 'bold':
        document.execCommand('bold', false, null);
        break;
      case 'italic':
        document.execCommand('italic', false, null);
        break;
      case 'underline':
        document.execCommand('underline', false, null);
        break;
      case 'ordered-list':
        document.execCommand('insertOrderedList', false, null);
        break;
      case 'unordered-list':
        document.execCommand('insertUnorderedList', false, null);
        break;
      default:
        break;
    }

    button.classList.toggle('active');
    editor.focus();
  });
});

