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
    var email=$('#_email').val();
    var password=$('#password').val();
    if(email==valid_email)
    {
        console.log("Valid");
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
        }).catch(function(error){
            Materialize.toast(error.errorMessage, 4000); 
        });
    }
    else
    {
        Materialize.toast("Failed to login", 2000);
        $('#_email').val('');
        $('#password').val('');
    }
}