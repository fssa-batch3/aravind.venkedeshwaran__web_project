// get json from localstorage
const notes = JSON.parse(localStorage.getItem("usernotes"));
for (let i = 0; i < notes.length; i++) {
  // Notes Card
  const notesLink = document.createElement("a");
  notesLink.href = `notescreate.html?notesId=${notes[i].notesId}&heading=${notes[i].heading}`;
  notesLink.id = "noteslink";
  document.querySelector(".allnotes").append(notesLink);

  const mainNotesDiv = document.createElement("div");
  mainNotesDiv.classList.add("main_notes");
  notesLink.appendChild(mainNotesDiv);
  // document.querySelector(".allnotes").append(mainNotesDiv)

  const dateDiv = document.createElement("div");
  dateDiv.classList.add("date");
  mainNotesDiv.appendChild(dateDiv);

  const datep = document.createElement("p");
  datep.innerText = notes[i].createdOn;
  dateDiv.appendChild(datep);

  // const dotp = document.createElement("P");
  // dotp.classList.add("dot");
  // dotp.innerText = "...";
  // dateDiv.appendChild(dotp);

  const headingDiv = document.createElement("div");
  headingDiv.classList.add("heading");
  headingDiv.innerText = notes[i].heading;
  mainNotesDiv.appendChild(headingDiv);

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags");
  mainNotesDiv.appendChild(tagsDiv);

  const databaseButton = document.createElement("button");
  databaseButton.innerText = "database";
  tagsDiv.appendChild(databaseButton);

  const academyButton = document.createElement("button");
  academyButton.innerText = "academy";
  tagsDiv.appendChild(academyButton);

  const notesDiv = document.createElement("div");
  notesDiv.classList.add("notes");
  mainNotesDiv.appendChild(notesDiv);


  // const filetitle = document.getElementById("filename")
  // filetitle.value = notes[i].heading;


  const notesParagraph = document.createElement("div");
  notesParagraph.id = "notesPara"
  notesParagraph.setAttribute('contenteditable', true)
  const storedString = notes[i]["notes"];
  const sanitizedString = DOMPurify.sanitize(storedString);
  notesParagraph.innerHTML = sanitizedString.slice(100);
  notesDiv.appendChild(notesParagraph);
}

