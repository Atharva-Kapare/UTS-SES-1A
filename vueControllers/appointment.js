function signOut(){
    firebase.auth().signOut();
    console.log("here");
};

const submitBtn = document.querySelector("#submit");
let fullName = document.querySelector("#fullName");
let email = document.querySelector("#emailAppoint");
let dob = document.querySelector("#dob");
let dAppoint = document.querySelector("#dAppoint");
let tAppoint = document.querySelector("#tAppoint");

submitBtn.addEventListener('click', function() {
    let fullNameInput = fullName.value;
    let emailInput = email.value;
    let dobInput = dob.value;
    let dAppointInput = dAppoint.value;
    let tAppointInput = tAppoint.value;
    db.doc().set({
        fullName : fullNameInput,
        email : emailInput,
        dob : dobInput,
        dAppoint : dAppointInput,
        tAppoint : tAppointInput
    }).then(function() {
        location.reload();
        document.write("Data Saved");
        header("refresh:1");
    }) ;
});

var nav = new Vue({
    el: '#navID',
    data: {
        log: true
    }
});

auth.onAuthStateChanged(user =>{
    if(user){
        console.log("Signed in as: " + user.email);
        nav.log = true;
        // setUpUI(user);
    } else{
        console.log("Not signed in");
        nav.log = false;
        // setUpUI(user);
    }
});