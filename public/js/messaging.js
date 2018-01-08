const messaging=firebase.messaging();
var token_ref=firebase.database().ref("user-registration-tokens");
function addDeviceToGroup(token)
{
//    console.log(token);
    token_ref.child(token).set("ok");
}
function askPermission()
{
    messaging.requestPermission()
    .then(function() {
//      console.log('Notification permission granted.');
      return messaging.getToken();
    }).then(function(token){
        addDeviceToGroup(token);
    })
    .catch(function(err) {
      //console.log('Unable to get permission to notify.', err);
    });
}
messaging.onMessage(function(payload){
    //console.log("onMessage", payload);
});
