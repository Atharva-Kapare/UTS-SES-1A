function forgotPass(){
    console.log("forgot");
    var email = prompt("Please enter your email", "A password reset link will be sent to this email");
    auth.sendPasswordResetEmail(email).catch(e => {alert(e.message)});
}

auth.onAuthStateChanged(user =>{
    if(user){
        console.log("Signed in as: " + user.email);
    } else{
        console.log("Not signed in");
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

var login = new Vue({
    el: '#login',
    data: {
        sample: 'Login',
        emailField: "",
        passwordField: "",
        wait: ""
    },
    methods: {
        registerUser(){
            var email = this.emailField;
            this.emailField = null;

            var password = this.passwordField;
            this.passwordField = null;

            auth.signInWithEmailAndPassword(email, password).then(user => {
                this.sample = 'Logged In!';
                console.log("Signed in as: " + user.email);
                this.wait = "Please wait while we redirect you to the home page!";
                sleep(5000).then(() => {
                    window.location.href = "./index.html"
                });
            }).catch(e => {alert(e.message)});

        }
    }
});

