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