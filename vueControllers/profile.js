function signOut(){
    auth.signOut();
};

UID = "";

function forgotPass(){
    console.log("forgot");
    var email = prompt("Please enter your email", "A password reset link will be sent to this email");
    auth.sendPasswordResetEmail(email).catch(e => {alert(e.message)});
}

auth.onAuthStateChanged(user =>{
    if(user){
        UID = user.uid;
        console.log("Signed in as: " + user.email);

        var LoggedInUser = db.collection("user").doc(user.uid).get().then(function(doc) {

            if(doc.exists){
                console.log("Document data:", doc.data());
                var data = doc.data();
                profile.firstField = data.first;
                profile.lastField = data.last;
                profile.emailField = data.email;
                profile.addressField = data.address;
                profile.phoneField = data.phone;
                profile.client = data.type;
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    });
        // setUpUI(user);
    } else{
        console.log("Not signed in");
        // setUpUI(user);
    }
});

var profile = new Vue({
    el: '#profile',
    data: {
        firstField: "",
        lastField: "",
        emailField: "",
        addressField: "",
        phoneField: "",
        client: ""
    },
    methods: {
        updateDetails(){
            db.collection("user").doc(UID).set({
                first: this.firstField,
                last: this.lastField,
                email: this.emailField,
                address: this.addressField,
                phone: this.phoneField,
                type: this.client
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
        }
    }
});