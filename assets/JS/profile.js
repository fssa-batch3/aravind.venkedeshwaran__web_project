// let users = JSON.parse(localStorage.getItem('userdata'));
// let userlogin = JSON.parse(localStorage.getItem('userlogin'));

// for (let i = 0; i <  users.length; i++) {
//     if(userlogin == users[i].email  ||userlogin == users[i].name ){
//     document.getElementById("name").value = users[i]["name"];
//     document.getElementById("email").value = users[i]["email"];
//     }
// }
//  enable and disable input for edit and update operation
// function enablename() {
// document.getElementById("name").disabled = false;
// }
// function enablepassword() {
//     document.getElementById("password").disabled = false;
// }


// // Edit User Profile
// function editprofile() {
//     for(let i = 0 ; i < users.length; i++){
//     if(document.getElementById("email").value == users[i]["email"]){
//         users[i].name = document.getElementById("name").value;
//         users[i].password = document.getElementById("password").value;
//         }
//     }

//     if(document.getElementById("name").value != "" && document.getElementById("password").value != ""){
//     localStorage.setItem('userdata',JSON.stringify(users))
//     Notify.success("Successfully your profile updated")
//     // alert("Successfully your profile updated")
//     }
//     else{
//         // alert("Username or password field could not be empty")
//         Notify.error("Username or password field could not be empty")
//     }
// }


// // Delete User Profile
// function deleteprofile() {
//     confirm("Are you sure want to delete your account?")

//     for (let i = 0; i <  users.length; i++) {

//     if(document.getElementById("email").value == users[i]["email"]){
//         users.splice(i,1)//(2,1)
//         localStorage.setItem("userdata", JSON.stringify(users));
//         window.location.href = 'signup.html';
//         Notify.error("Profile Deleted")
//     }

//     }
// }


//  Google Sign In 
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#profilePic").attr('src',profile.getImageUrl());
}

//  Google Sign Out
function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert('User signed out.');
    });
}