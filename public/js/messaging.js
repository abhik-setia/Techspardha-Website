const messaging=firebase.messaging();
function addDeviceToGroup(token)
{
    $.ajax({
    url: 'https://android.googleapis.com/gcm/notification',
    type: 'post',
    headers: {
        Authorization:'key=AIzaSyD1aqciM48jQXz-yv4W_0mkFCicWsJ7Gpo',
        project_id:'357922932377'
    },
    data:{
       "operation": "add",
       "notification_key": "APA91bEmZIrHf4hF99b4H14lgrfaEG-4ImiKTo-QxU1mdD_suPTkLgkFo7C1WOIX7bopvBGnlrdQbJMPqT_3B_531YVVd0q19mHEIiqeFQYQsT3ywwwt0z0",
       "registration_ids": [token]
    },
    dataType: 'json',
    success: function (data) {
        console.log(data);
        }
    });
}
function askPermission()
{
    messaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
      return messaging.getToken();
    }).then(function(token){
        addDeviceToGroup(token);
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
}
messaging.onMessage(function(payload){
    console.log("onMessage", payload);
});
