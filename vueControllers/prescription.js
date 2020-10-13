function sendEmail() {
    var patEmail = document.getElementById("patientsEmail").value;
    var prescriptionMessage = document.getElementById("message").value;
    Email.send({
	Host: "smtp.gmail.com",
	Username : "ses1agroup3@gmail.com",
	Password : "ses1agroup32020",
	To : patEmail,
	From : "ses1agroup3@gmail.com",
	Subject : "Medical Prescription for patient: " + document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
    Body : prescriptionMessage + "<br><br> Please print your prescription email <br><br> Yours sincerely, <br> Dr.H.Mehta (MBBS) <br> PH:0402837012 E:Himanshumehta996@gmail.com",
    Attachments : [
        {
            name : "Doctor's signature.jpg",
            path:"https://writechoice.files.wordpress.com/2011/08/illegible-signature.jpg"
        }]
	}).then(
		message => alert("Mail sent successfully")
    );
}