// Create main container element
const sidebarDiv = document.createElement('div');
sidebarDiv.classList.add('sidebar');

// Create sidebar navigation element
const nav = document.createElement('nav');
nav.classList.add('sidebar');

// Create header element
const header = document.createElement('header');

const link = document.createElement('a');
link.id = "indexlink"
link.setAttribute('href', '../index.html');
// Create image-text container element
const imageTextDiv = document.createElement('div');
imageTextDiv.classList.add('image-text');

// Create image element
const imageSpan = document.createElement('span');
imageSpan.classList.add('image');
const image = document.createElement('img');
image.setAttribute('src', '../assets/Images/FreshTimeLogo.png');
image.setAttribute('alt', '');
imageSpan.appendChild(image);

// Create logo-text container element
const logoTextDiv = document.createElement('div');
logoTextDiv.classList.add('text', 'logo-text');

// Create name and profession spans
const nameSpan = document.createElement('span');
nameSpan.classList.add('name');
nameSpan.textContent = 'FreshTime';

const professionSpan = document.createElement('span');
professionSpan.classList.add('profession');
professionSpan.textContent = 'Be Productive';

logoTextDiv.appendChild(nameSpan);
logoTextDiv.appendChild(professionSpan);

link.appendChild(imageSpan);
link.appendChild(logoTextDiv);

// Create toggle icon element
// const toggleIcon = document.createElement('i');
// toggleIcon.classList.add('bx', 'bx-chevron-right', 'toggle');

link.appendChild(imageTextDiv);
header.appendChild(link)
// header.appendChild(toggleIcon);

// Create menu-bar element
const menuBarDiv = document.createElement('div');
menuBarDiv.classList.add('menu-bar');

// Create menu element
const menuDiv = document.createElement('div');
menuDiv.classList.add('menu');

// Create search-box list item
const searchBoxLi = document.createElement('li');
searchBoxLi.classList.add('search-box');

// Create search icon element
const searchIcon = document.createElement('i');
searchIcon.classList.add('bx', 'bx-search', 'icon');

// Create search input element
const searchInputsd = document.createElement('input');
searchInputsd.setAttribute('type', 'text');
searchInputsd.setAttribute('placeholder', 'Search...');

searchBoxLi.appendChild(searchIcon);
searchBoxLi.appendChild(searchInputsd);

// Create menu-links unordered list
const menuLinksUl = document.createElement('ul');
menuLinksUl.classList.add('menu-links');

// Create task nav-link
const tasklielem = document.createElement('li');
tasklielem.classList.add('nav-link');
const taskLink = document.createElement('a');
taskLink.setAttribute('href', 'task page.html');
const taskIcon = document.createElement('i');
taskIcon.classList.add('bx', 'bx-check-double', 'icon');
const taskText = document.createElement('span');
taskText.classList.add('text', 'nav-text');
taskText.textContent = 'Task';
taskLink.appendChild(taskIcon);
taskLink.appendChild(taskText);
tasklielem.appendChild(taskLink);

// Create timer nav-link
const timerLi = document.createElement('li');
timerLi.classList.add('nav-link');
const timerLink = document.createElement('a');
timerLink.setAttribute('href', 'timer.html');
const timerIcon = document.createElement('i');
timerIcon.classList.add('bx', 'bx-hourglass', 'icon');
const timerText = document.createElement('span');
timerText.classList.add('text', 'nav-text');
timerText.textContent = 'Timer';
timerLink.appendChild(timerIcon);
timerLink.appendChild(timerText);
timerLi.appendChild(timerLink);

// Create habit nav-link
const habitLielem = document.createElement('li');
habitLielem.classList.add('nav-link');
const habitLink = document.createElement('a');
habitLink.setAttribute('href', 'habit.html');
const habitIcon = document.createElement('i');
habitIcon.classList.add('bx', 'bx-leaf', 'icon');
const habitText = document.createElement('span');
habitText.classList.add('text', 'nav-text');
habitText.textContent = 'Habit';
habitLink.appendChild(habitIcon);
habitLink.appendChild(habitText);
habitLielem.appendChild(habitLink);

// Create notes nav-link
const notesLi = document.createElement('li');
notesLi.classList.add('nav-link');
const notesLink = document.createElement('a');
notesLink.setAttribute('href', 'notesall.html');
const notesIcon = document.createElement('i');
notesIcon.classList.add('bx', 'bxs-pencil', 'icon');
const notesText = document.createElement('span');
notesText.classList.add('text', 'nav-text');
notesText.textContent = 'Notes';
notesLink.appendChild(notesIcon);
notesLink.appendChild(notesText);
notesLi.appendChild(notesLink);

// Create profile nav-link
const profileLi = document.createElement('li');
profileLi.classList.add('nav-link');
const profileLink = document.createElement('a');
profileLink.setAttribute('href', 'profile.html');
const profileIcon = document.createElement('i');
profileIcon.classList.add('bx', 'bx-user', 'icon');
const profileText = document.createElement('span');
profileText.classList.add('text', 'nav-text');
profileText.textContent = 'Profile';
profileLink.appendChild(profileIcon);
profileLink.appendChild(profileText);
profileLi.appendChild(profileLink);

// Append nav-links to menu-links unordered list
menuLinksUl.appendChild(tasklielem);
menuLinksUl.appendChild(timerLi);
menuLinksUl.appendChild(habitLielem);
menuLinksUl.appendChild(notesLi);
menuLinksUl.appendChild(profileLi);

menuDiv.appendChild(searchBoxLi);
menuDiv.appendChild(menuLinksUl);

// Create bottom-content element
const bottomContentDiv = document.createElement('div');
bottomContentDiv.classList.add('bottom-content');

// Create logout list item
const logoutLi = document.createElement('li');
const logoutLink = document.createElement('a');
logoutLink.setAttribute('href', '#');
const logoutIcon = document.createElement('i');
logoutIcon.classList.add('bx', 'bx-log-out', 'icon');
const logoutText = document.createElement('span');
logoutText.classList.add('text', 'nav-text');
logoutText.textContent = 'Logout';
logoutLink.appendChild(logoutIcon);
logoutLink.appendChild(logoutText);
logoutLi.appendChild(logoutLink);

bottomContentDiv.appendChild(logoutLi);

// Append elements to their respective parent elements
header.appendChild(imageTextDiv);
// header.appendChild(toggleIcon);
menuBarDiv.appendChild(menuDiv);
menuBarDiv.appendChild(bottomContentDiv);
nav.appendChild(header);
nav.appendChild(menuBarDiv);
sidebarDiv.appendChild(nav);

// Add main container to the document body
const mainDiv = document.querySelector(".main")
mainDiv.appendChild(sidebarDiv);


const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


// toggle.addEventListener("click" , () =>{
//     sidebar.classList.toggle("close");
// })

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})


// Get the current URL
const currentURL = window.location.href;

// Get all the sidebar links
const sidebarLinks = document.querySelectorAll('.menu a');

// Iterate through each link and check if it matches the current URL
sidebarLinks.forEach(link => {
  if (link.href === currentURL) {
    link.classList.add('active');
  }
});


// Display Username
const signedupusers = JSON.parse(localStorage.getItem("userdata"));
const loggedinuser = JSON.parse(localStorage.getItem("userlogin"));

for (let i = 0; i < signedupusers.length; i++) {
  if (loggedinuser == signedupusers[i].email) {
    document.getElementById("username").innerText = signedupusers[i].name;
  }
}

// preloader
const loaderDiv = document.createElement("div");
loaderDiv.classList.add("loader-wrapper");
loaderDiv.id = "loader";
document.body.appendChild(loaderDiv);
document.querySelector(".main").append(loaderDiv);

window.addEventListener("load", () => {
  const loader = document.querySelector("#loader");
  loader.classList.add("loaderHidden");
  loader.addEventListener("transitionend", () => {
    loader.style.display = "none";
    document.querySelector("body").style.display = "block";
  });
});
