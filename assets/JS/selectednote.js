const url = window.location.search;
    
const urlParams = new URLSearchParams(url)

let heading = urlParams.get('heading');
let date = urlParams.get('createdOn');
let notes = urlParams.get('notes');

console.log(heading,date,notes)

const usernotesform = document.createElement("form");
usernotesform.id = "usernotesform";
document.querySelector(".journal").append(usernotesform)

const headlineH1 = document.createElement("input");
headlineH1.id = "headline";
headlineH1.value = heading || notesheading;
usernotesform.appendChild(headlineH1);

const labellastmodifiedLabel = document.createElement("label");
labellastmodifiedLabel.id = "labellastmodified";
labellastmodifiedLabel.innerText = "Last Modified";
usernotesform.appendChild(labellastmodifiedLabel);

const lastmodifiedH3 = document.createElement("h3");
lastmodifiedH3.id = "lastmodified";
lastmodifiedH3.innerText = date;
usernotesform.appendChild(lastmodifiedH3);

const hr = document.createElement("hr");
usernotesform.appendChild(hr);

const notesinputTextarea = document.createElement("textarea");
notesinputTextarea.name = "usernotes";
notesinputTextarea.id = "notesinput";
notesinputTextarea.cols = "95";
notesinputTextarea.rows = "25";
notesinputTextarea.value = notes;
usernotesform.appendChild(notesinputTextarea);

// save notes
let notesheading = document.getElementById("headline").value;
let notescreated = document.getElementById("lastmodified");
let notes_se = document.getElementById("notesinput");

// let editnotes = JSON.parse(localStorage.getItem("usernotes"));

// function editfunc() {
//     for(let i = 0; i < editnotes.length; i++){
//         editnotes[i][heading] = notesheading.value
//         editnotes[i][notes] = notes_se .value
//     }
//     editnotes.push(newnotes);
//     localStorage.setItem("usernotes", JSON.stringify(editnotes))
// }

// let savenotes = document.getElementById("savenotes");
//     savenotes.addEventListener('click', e => {
//         e.preventDefault();
//         editfunc();
//         // alert("Your Notes are Saved")
//         // Notify.success("Your Notes are Saved");
//         window.location.href = "notesall.html";
// });