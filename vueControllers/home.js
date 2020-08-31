auth.onAuthStateChanged(user =>{
    if(user){
        console.log("Signed in as: " + user.email);
    } else{
        console.log("Not signed in");
    }
});