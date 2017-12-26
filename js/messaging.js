const messaging=firebase.messaging();
messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  return messaging.getToken();
}).then(function(token){
    console.log(token);
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

messaging.onMessage(function(payload){
    console.log("onMessage", payload);
});
