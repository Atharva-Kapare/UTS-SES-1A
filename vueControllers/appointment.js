

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
        timeField: "",
        sample: 'Book Appointment',
        appointments: []
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
                //this.sample = 'Appointment Booked!';

                db.collection("user").doc(doctor).update({
                    appointments: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                });

                db.collection("user").doc(firebase.auth().currentUser.uid).update({
                    appointments: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                });

                if(!alert('Appointment Booked!')){window.location.reload();}

                // db.collection("users").doc(doctor).update({
                //     appointments: firebase.firestore.FieldValue.arrayUnion("test")
                // })
                // regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
            });
        }
    }
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
                
        db.collection("user").doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());

                // for(data in doc.data().appointments){
                //     appointment.appointments.push(data);
                // }
                var temp = doc.data().appointments;
                console.log(temp);
                
                temp.forEach(display);

                // for(i = 0; i < temp.length; i++){
                    // var document = temp[i];
                    // var date = "";
                    // var time = "";
                    // var doctor = "";
                    // var patient = "";
                    // var app = new Appointment(date, time, doctor, patient)


                    // db.collection("appointments").doc(document).get().then(function(doc) {
                    //     //console.log(doc.data());
                    //     console.log(document);
                    //     app.setDate(doc.data().dateAppointment);
                    //     //date = doc.data().dateAppointment;
                    //     time = doc.data().timeAppointment;
                        
                    //     db.collection("user").doc(doc.data().doctorSelected).get().then(function(doc) {
                    //         //console.log(doc.data().first);
                    //         doctor = "Dr. " + doc.data().first + " " + doc.data().last;
                    //     });

                    //     db.collection("user").doc(doc.data().patient).get().then(function(doc) {
                    //         //console.log(doc.data().first);
                    //         patient = doc.data().first + " " + doc.data().last;

                    //         // console.log(date);
                    //         // console.log(time);
                    //         // console.log(doctor);
                    //         // console.log(patient);
                    //         appointment.appointments.push(app);
                    //         console.log(app)
                    //     });

                    // })

                    
                // }
                
                //console.log(temp);
                
                //appointment.appointments = doc.data().appointments;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        // setUpUI(user);
    } else{
        console.log("Not signed in");
        nav.log = false;
        // setUpUI(user);
    }
});

function display(document){
    var date = "";
    var time = "";
    var doctor = "";
    var patient = "";
    var app = new Appointment(date, time, doctor, patient)


    db.collection("appointments").doc(document).get().then(function(doc) {
        //console.log(doc.data());
        console.log(document);
        app.setDate(doc.data().dateAppointment);
        app.setTime(doc.data().timeAppointment);
        //date = doc.data().dateAppointment;
        //time = doc.data().timeAppointment;
        
        db.collection("user").doc(doc.data().doctorSelected).get().then(function(doc) {
            //console.log(doc.data().first);
            doctor = "Dr. " + doc.data().first + " " + doc.data().last;
            app.setDoctor(doctor);
        });

        db.collection("user").doc(doc.data().patient).get().then(function(doc) {
            //console.log(doc.data().first);
            patient = doc.data().first + " " + doc.data().last;
            app.setPatient(patient);

            // console.log(date);
            // console.log(time);
            // console.log(doctor);
            // console.log(patient);
            appointment.appointments.push(app);
            console.log(app)
        });

    })
}

class Appointment{
    constructor(date, time, doctor, patient){
        this.date = date;
        this.time = time;
        this.doctor = doctor;
        this.patient = patient;
    }

    setDate(date){
        this.date = date;
    }
    setTime(time){
        this.time = time;
    }
    setDoctor(doctor){
        this.doctor = doctor;
    }
    setPatient(patient){
        this.patient = patient;
    }
}