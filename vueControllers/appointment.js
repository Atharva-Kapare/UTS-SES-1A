

db.collection("user").where("type", "==", "doctor")
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        appointment.doctors.push(doc.data());
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});



function signOut(){
    firebase.auth().signOut();
    console.log("here");
};

var appointment = new Vue({
    el: '#appointment',
    data: {
        doctors: [],
        selectedDoctor: "",
        dateField: "",
        timeField: ""
    },
    methods: {
        makeAppointment(){
            var doctor = this.selectedDoctor;
            console.log(doctor);
            db.collection("appointments").add({
                dateAppointment : this.dateField,
                timeAppointment : this.timeField,
                doctorSelected: this.selectedDoctor,
                patient: firebase.auth().currentUser.uid
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);

                db.collection("user").doc(doctor).update({
                    appointments: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                });

                db.collection("user").doc(firebase.auth().currentUser.uid).update({
                    appointments: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                });
                // db.collection("users").doc(doctor).update({
                //     appointments: firebase.firestore.FieldValue.arrayUnion("test")
                // })
                // regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
            });
        }
    }
});

const submitBtn = document.querySelector("#submit");
let dAppoint = document.querySelector("#dAppoint");
let tAppoint = document.querySelector("#tAppoint");

submitBtn.addEventListener('click', function() {

    let dAppointInput = dAppoint.value;
    let tAppointInput = tAppoint.value;
    db.collection("appointments").doc().set({
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