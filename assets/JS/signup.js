const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const btn = document.getElementById("btn");

function register() {
  loginForm.style.left = "-400px";
  registerForm.style.left = "50px";
  btn.style.left = "110px";
}

function login() {
  loginForm.style.left = "50px";
  registerForm.style.left = "450px";
  btn.style.left = "0";
}

const registerform = document.getElementById("register");

registerform.addEventListener("submit", (e) => {
  e.preventDefault();

  signup();
});

function signup() {
  // geting and storing html data in a variable name
  const username = document.getElementById("name").value;
  let useremail = document.getElementById("email").value;
  useremail = useremail.toLowerCase();
  const userpassword = document.getElementById("password").value;

  // creating an object to collect info and store in json file
  const user_details = {
    name: username,
    email: useremail,
    password: userpassword,
  };

  // receing already stored data or creating new array
  const userarray = JSON.parse(localStorage.getItem("userdata")) ?? [];

  // checking the user exists or not
  let j = 0;

  for (let i = 0; i < userarray.length; i++) {
    if (userarray[i].email === useremail) {
      j = 1;
      break;
    }
  }

  if (j == 1) {
    // alert("Email Id Already Exist");
    Notify.error("Email Id Already Exist");
  }

  // if new user pushing into local storage
  else {
    userarray.push(user_details);
    localStorage.setItem("userdata", JSON.stringify(userarray));
    // alert("Successfully Signed Up");
    Notify.success("Successfully Signed Up");
    login();
  }
}

const loginform = document.getElementById("login");

loginform.addEventListener("submit", (e) => {
  e.preventDefault();

  logincret();
});

function logincret() {
  const users = JSON.parse(localStorage.getItem("userdata"));

  const name = document.getElementById("emaillogin").value;
  const email = document.getElementById("emaillogin").value;
  const password = document.getElementById("passwordlogin").value;

  let j = 0;
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email == email ||
      (users[i].name == name && users[i].password == password)
    ) {
      j = 1;
      localStorage.setItem("userlogin", JSON.stringify(email));
      break;
    }
  }

  if (j == 1) {
    // alert("Logged In")
    Notify.success("Logged In");
    window.location.href = "/Pages/profile.html";
  } else {
    // alert("Invalid Credentials")
    Notify.error("Invalid Credentials");
  }
}
