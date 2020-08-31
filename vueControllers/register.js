var LOGGEDIN = true;

// const loggedOutLinks = document.querySelectorAll('.logged-out');
// const loggedInLinks = document.querySelectorAll('.logged-in');

// const setUpUI = (user) => {
//     if(user){
//         loggedInLinks.forEach(item => item.style.display = 'block');
//         loggedOutLinks.forEach(item => item.style.display = 'none');
//     } else{
//         loggedInLinks.forEach(item => item.style.display = 'none');
//         loggedOutLinks.forEach(item => item.style.display = 'block');
//     }
// };

var nav = new Vue({
    el: '#navID',
    data: {
        log: true
    }
});


function signOut(){
    auth.signOut();
};

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var register = new Vue({
    el: '#register',
    data: {
        sample: 'Register Account',
        firstField: "",
        lastField: "",
        emailField: "",
        passwordField: "",
        passwordFieldConfirm: "",
        addressField: "",
        phoneField: null,
        wait: "",
        client: ""
    },
    methods: {
        registerUser(){

            if(this.passwordField === this.passwordFieldConfirm){
                
                this.phoneField = parseInt(this.phoneField);
                if(!Number.isNaN(this.phoneField)){
                    console.log(this.client);

                    if(this.client){
                        auth.createUserWithEmailAndPassword(this.emailField, this.passwordField).then(cred => {
                        this.wait = "Please wait while we register your account and sign you in.";
        
                        //Add the client to the database as well
                        db.collection(this.client).doc(cred.user.uid).set({
                            first: this.firstField,
                            last: this.lastField,
                            email: this.emailField,
                            assress: this.addressField,
                            phone: this.phoneField
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
        
                        sleep(5000).then(() => {
                            this.sample = 'Account Registered!';
                            this.wait = "";
                            console.log(cred);
        
                            sleep(2000).then(() => {
                                window.location.href = "./index.html";
                            });
                        });
    
                        }).catch(e => {alert(e.message)});
                    }else{
                        alert("Please select whether you are a Patient or Doctor.");
                    }

                    
                }else{
                    alert("Invalid phone number entered.");
                }
                
            }else{
                alert("The two password fields do not match.");
            }
        },
        
    }
});





