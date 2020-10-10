let button = document.getElementsByClassName("msger-send-btn")[0];

button.addEventListener("click", function() {

    let message = document.getElementById("message").value;

    if(message == ""){
        alert("Please enter the fields");
    }
    else{
         
        var data ={
            message: message,
           

        }
        var database = firebase.database();

        var ref = database.ref("records");
        ref.push(data);

    }


})