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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var appointment = new Vue({
    el: '#register',
    data: {
        sample: 'Make Appoinment',
        nameField: "",
        dateField: "",
        illnessField: "",
        wait: "",
    },
    methods: {
        MakeAppointment(){


            //Add the client to the database as well
            db.collection(this.client).doc(cred.user.uid).set({
                name: this.nameField,
                date: this.dateField,
                illness: this.illnessField,
                
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

            auth.createAppoinment(this.nameField, this.dateField, this.illnessField).then(cred => {
            this.wait = "Please wait while we add appointment for you.";
            sleep(5000).then(() => {
            this.sample = 'Appoinment done!';
            this.wait = "";
            console.log(cred);
        
            sleep(2000).then(() => {
                window.location.href = "./MyAppoinment.html";
                });
            });
    
            }).catch(e => {alert(e.message)});
        }
    }
});





