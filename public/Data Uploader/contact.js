//var database=firebase.database();
//var storage=firebase.storage();
//var query=database.ref('query');
var provider=new firebase.auth.GoogleAuthProvider();
var auth=firebase.auth();
var currentUserObject=null;
function loginLogout()
{
    if(!currentUserObject)
    {
        return auth.signInWithPopup(provider);
    }
    else
    {
        auth.signOut().then(function(){
            currentUserObject=null;
        }).catch(function(error){
              Materialize.toast("Logout Failed! Try Again!");
        });
    }
}

auth.onAuthStateChanged(function(user)
{
//    console.log(user);
    if(user)
    {
        $('.logged-off-query-text').css('display', 'none');
        currentUserObject=user;
        $('.login-logout-btn').text('Logout');
        $('.login-logout-btn-side').text('');
        $('.login-logout-btn-side').append('<i class="material-icons orange-text text-lighten-2">input</i>Logout');
    }
    else
    {
        $('.logged-off-query-text').css('display', 'block');
        currentUserObject=null;
        currentUserObject=user;
        $('.login-logout-btn').text('Login');
        $('.login-logout-btn-side').text('');
        $('.login-logout-btn-side').append('<i class="material-icons orange-text text-lighten-2">input</i>Login');
    }
});


function insert_query(query_object)
{
    var random_query_item_id=query.push().key;
    var queryitem=query.child(random_query_item_id);
    queryitem.set(query_object).then(function(){
        
        Materialize.toast('We\'ll get back to you soon.', 4000);

        $('#query_submit_btn').removeClass('disabled');
        $('#query_submit_btn').css('transition', '0.3s ease');
        $('#query_submit_btn').css('background', 'green');
        setTimeout(function(){
            $('#query_submit_btn').css('background','teal');
        }, 1000);
        var name=$('#name').val("");
        var email=$('#email').val("");
        var query=$('#query').val("");
        
    }).catch(function(err){
        Materialize.toast('Something went wrong!!', 4000);
        $('#query_submit_btn').css('background','red');
        setTimeout(function(){
            $('#query_submit_btn').css('background','teal');
        }, 1000);
    });
}


function askQuery()
{
    var name=$('#name').val();
    var email=currentUserObject.email;
    var query=$('#query').val();
    
    if(name==null || email==null || query==null || name=='' || email=='' || query=='')
    {   
//        console.log('error');
        $('#query_submit_btn').css('transition', '0.3s ease');
        $('#query_submit_btn').css('background','red');
        setTimeout(function(){
            $('#query_submit_btn').css('background','teal');
        }, 300);
    }   
    else
    {
        
         $('#query_submit_btn').css('transition', '0.3s ease');
         $('#query_submit_btn').addClass('disabled');
//         $('#query_submit_btn').css('display', 'none');
//         $('#query_information').css('display', 'inline-block');
//         $('#query_information').css('color', '#1DE9C3');
//         $('#query_information').text('Wait...');
        
        var query_object={
         name: name,
         email: email,
         query: query
        };
//        console.log(query_object);
        insert_query(query_object);
    }
}
function validateUserAndAsk()
{
    if(currentUserObject==null)
    {
        loginLogout().then(function(response){
            askQuery();
        }).catch(function(error){
            Materialize.toast("Failed to send query!");
        });
    }
  else{
      console.log("logged in");
      askQuery();
  }

}