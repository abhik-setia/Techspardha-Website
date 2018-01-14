var auth=firebase.auth();
var valid_email="ts18@techspardha.org";
auth.onAuthStateChanged(function(user){
    if(user!=null && user.email==valid_email)
    {
        //Details is default page
        window.location.href="./details.html";
    }
});
function validate_admin()
{
    $('#admin-login-btn').addClass('disabled');
    var email=$('#_email').val();
    var password=$('#password').val();
    if(email==valid_email)
    {
        auth.signInWithEmailAndPassword(email, password).then(function(){
            console.log("Ok");
            if(getParameterByName("back", window.location.href)=="detail")
            {
                window.location.href="./details.html";
            }
            else if(getParameterByName("back", window.location.href)=="query")
            {
                window.location.href="./queries.html";
            }
            else if(getParameterByName("back", window.location.href)=="add_notification")
            {
                window.location.href="./notificationAdder.html";
            }
                
            $('#admin-login-btn').removeClass('disabled');
        }).catch(function(error){

            $('#_email').val('');
            $('#password').val('');
            $('#admin-login-btn').removeClass('disabled');
            Materialize.toast("Failed to login!", 4000); 
        });
    }
    else
    {
        $('#admin-login-btn').removeClass('disabled');
        Materialize.toast("Failed to login", 2000);
        $('#_email').val('');
        $('#password').val('');
    }
}