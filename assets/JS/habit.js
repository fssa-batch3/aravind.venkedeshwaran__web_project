let addHabitBtn = document.getElementById("addhabitbtn");
let habitpopup = document.querySelector(".addhabitpopup");
let habitList = document.getElementById("habitlist");
let saveHabit = document.getElementById("savehabit");
let habitName = document.getElementById("habitname");
let habitDetail = document.querySelector(".habitdetails");
let habitPage = document.querySelector(".habit");
// saving data in local storage
let existinghabit = JSON.parse(localStorage.getItem("userhabits")) ?? [];
existinghabit.forEach(habit => renderhabit(habit))


function addhabit(){
    let newhabit = {
        habitId: Math.floor(Math.random() * Date.now()),
        habitName: habitName.value,
        createddate: Date().slice(4,16),
        createdtime: Date().slice(16, 25),
        habitType : "To Do",
        habitRepeat : "everyday",
        habitRemainder : "",
        habitStreak : "",
        status : ""
    }
    existinghabit.push(newhabit);
    localStorage.setItem("userhabits", JSON.stringify(existinghabit))
    Notify.success(`${habitName.value} Habit Added`);
    renderhabit(newhabit);
    habitName.value = ""
}

// render habit in habit page

function renderhabit(habit) {
    let li = document.createElement('li');
    let indexStatus = existinghabit.findIndex(h => h.habitName == habit.habitName)
    if(existinghabit[indexStatus]["status"] == "completed"){
        li.innerHTML = `<span id="habitspan" onclick="revealhabitdetails()">
        <span id="habitHeading"><p id="habitcolor"></p>  <p><s>${habit.habitName}</s></p></span>
                        <span id="habitdescrip">0/1</span>
                        </span>
                        <button id="checkmark" >
                        <div class="checkbox-wrapper-5">
                          <div class="check">
                            <input id="check-5" type="checkbox">
                            <label for="check-5"></label>
                          </div>
                        </div>

                        </button>
                        <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>`
    }
    else{
        li.innerHTML = `<span id="habitspan" onclick="revealhabitdetails()">
                        <span id="habitHeading"><p id="habitcolor"></p> <p>${habit.habitName}</p></span>
                        <span id="habitdescrip">0/1</span>
                        </span>
                     
                    <button id="checkmark" >
                      <div class="checkbox-wrapper-5">
                        <div class="check">
                          <input id="check-5" type="checkbox">
                          <label for="check-5"></label>
                        </div>
                    </div>
                  </button>
                  <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>`
    }
    li.querySelector('#checkmark').addEventListener('click', () => {
        let indexDone = existinghabit.findIndex(h => h.habitName == habit.habitName)
        li.innerHTML = `<span id="habitspan" onclick="revealhabitdetails()">
                        <span id="habitHeading"><p id="habitcolor"></p>  <p><s>${habit.habitName}</s></p></span>
                        <span id="habitdescrip">0/1</span>
                        </span>
                        <button id="checkmark" >
                          <div class="checkbox-wrapper-5">
                            <div class="check">
                              <input id="check-5" type="checkbox">
                              <label for="check-5"></label>
                            </div>
                          </div>
                        </button>
                        <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>`
        existinghabit[indexDone]["status"] = "completed"
        localStorage.setItem("userhabits", JSON.stringify(existinghabit))
        Notify.success(`${habit.habitName} Habit Completed`) 
    });                
    li.querySelector('#deletebtn').addEventListener('click', () => {
        let indexDel = existinghabit.findIndex(h => h.habitName == habit.habitName)
        existinghabit.splice(indexDel, 1)
        localStorage.setItem("userhabits", JSON.stringify(existinghabit))
        Notify.error(`${habit.habitName} Habit Removed`)
        li.remove()
        
    });
    habitList.append(li)
}



// if habitname is empty or space, habit should not be added
saveHabit.onclick = () => {
    if(habitName.value.trim() != ""){
        addhabit();
    }
    else{
        Notify.error(`Type Any Habit Name`)
    }
}

// function for add Habit when enter press key is pressed
habitName.addEventListener('keypress',e =>{
    
        if (e.key === 'Enter') {
            if(habitName.value != ""){
                addhabit();
            }
            else{
                Notify.error(`Type Any Habit Name`)
            }
        }
    
}); 


function popup() {
    habitpopup.style.display = "block";
    habitPage.style.filter = "blur(3px)"
}

// reveal habit details
function revealhabitdetails() {
    habitDetail.style.display = "block"

}

// function for close pop up window
let close = document.getElementById("close")
close.onclick = function() {
    habitpopup.style.display = "none";
    habitPage.style.filter = "none"
}


let closehabitdetails = document.getElementById('closehabitdetails');
closehabitdetails.onclick = function () {
    habitDetail.style.display = "none"
    
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == habitPage) {
        habitpopup.style.display = "none";
        habitDetail.style.display = "none"
    }
}