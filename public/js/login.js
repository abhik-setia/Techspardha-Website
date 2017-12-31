var provider=new firebase.auth.GoogleAuthProvider();

function getUserStatus()
{
    var user = firebase.auth().currentUser;
//    console.log("Current state: ",user);
}
function login()
{
    firebase.auth().signInWithPopup(provider).then(function(result){
        var token=result.credential.accessToken;
        var thisUser=result.user;
//        console.log(thisUser);
    }).catch(function(error){
        var errorCode=error.code;
        var errorMessage=error.message;
        var email=error.email;
        var credential=error.credential;
        consloe.log("error message", errorMessage);
    });
}
    
function logout()
{
    firebase.auth().signOut().then(function() {
//        console.log("Logout Successful");
    }).catch(function(error) {
//        console.log("Logout failed");   
    });
}

firebase.auth().onAuthStateChanged(function(user){
    //gives current user
    getUserStatus();
    
    if(user)
    {
        $('#login-btn').css('display','none');
        $('#logout-btn').css('display','block');
    }
    else{
            $('#login-btn').css('display','block');
            $('#logout-btn').css('display','none');
    }
});