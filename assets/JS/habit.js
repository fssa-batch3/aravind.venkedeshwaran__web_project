// sidepanel lock
let sidepanel = document.querySelector('.sidepanel');
let toggle = document.querySelector('.toggle');
toggle.onclick = function(){
    sidepanel.classList.toggle('active')
}

// new habit slide function
let newhabitbtn = document.querySelector(".addnew")
let newhabitcls = document.querySelector(".addnewhabit")
newhabitbtn.onclick = function () {
    newhabitcls.style.display = "block";
}

// close new habit function
let close = document.getElementById("close")
close.onclick = function() {
    newhabitcls.style.display = "none";
    viewndel.style.display = "none";
}

// store habit in local storage
let habitinput = document.getElementById("habitname");
let addhabitbtn = document.getElementById("addhabit");
let habitlist = document.getElementById("habitlist");

let existinghabit = JSON.parse(localStorage.getItem("userhabit")) ?? [];
existinghabit.forEach(habit => renderhabit(habit))

function addhabit() {
    let newhabit = { habits: habitinput.value};
    existinghabit.push(newhabit);
    localStorage.setItem("userhabit", JSON.stringify(existinghabit))
    renderhabit(newhabit)
    Notify.success(`${habitinput.value} Habit Added`);
}

function renderhabit(habit) {
    let li = document.createElement('li')
    li.innerHTML = `
    <div class="viewndel">
    <button id="deletebtn">Delete Habit</button>
    </div>
    <span id="habitspan" onclick="popup()">${habit.habits}</span>
    <input type="checkbox" id = "checkmon" > <span class="checkbox"> </span> 
    <input type="checkbox" id = "checktue" > <span class="checkbox"> </span>
    <input type="checkbox" id = "checkwed" > <span class="checkbox"> </span>
    <input type="checkbox" id = "checkthu" > <span class="checkbox"> </span>
    <input type="checkbox" id = "checkfri" > <span class="checkbox"> </span>
    <input type="checkbox" id = "checksat" > <span class="checkbox"> </span>
    <input type="checkbox" id = "checksun" > <span class="checkbox"> </span>
    
    `
    li.querySelector('#deletebtn').addEventListener('click', () => {
        let index = existinghabit.findIndex(h => h.habits == habit.habits);
        console.log(index);
        existinghabit.splice(index, 1)
        localStorage.setItem("userhabit", JSON.stringify(existinghabit));
        Notify.error(`${habit.habits} Habit Removed`)
        li.remove()
        
    })
    habitlist.append(li)
}

//habit name onclick side panel shows 
let habitspan = document.querySelector("#habitspan")
let viewndel = document.querySelector(".viewndel")
function popup() {
    newhabitcls.style.display = "block";
    viewndel.style.display = "block";
}


let signedupusers = JSON.parse(localStorage.getItem("userdata"));
let loggedinuser = JSON.parse(localStorage.getItem("userlogin"));

for(let i = 0; i < signedupusers.length; i++){
    if(loggedinuser == signedupusers[i]["email"]){
        document.getElementById("username").innerText = signedupusers[i]["name"]
    }
}