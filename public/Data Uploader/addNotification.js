//var auth=firebase.auth();
var database=firebase.database();
var validUser=0;
//auth.onAuthStateChanged(function(user){
//    if(user==null)
//    {
//        validUser=0;
//        window.location.href="./validate_user.html?back=add_notification";
//    }
//    else if(user.email!="ts18@techspardha.org")
//    {
//        Materialize.toast("Logged in as other user, logging off!");
//        window.location.href="./validate_user.html?back=add_notification";
//        auth.signOut();
//    }
//    else
//    {
//        validUser=1;
//    }
//});

var notification_object={
    title: "Sample title",
    description: "Sample Description",
    author: "Sample author",
    //or any other attribute that may be required can be set dynamically
};

function addNotification(notification_object, url)
{
//    if(validUser)
    {
        var date_object=new Date();
        notification_object.date=date_object.getDay()+"/"+date_object.getMonth();
        notification_object.time=date_object.getHours()+":"+date_object.getMinutes();
        if(url!=null)
        {
            notification_object.url=url;
        }
        database.ref("notifications").push(notification_object).then(function(snapshot){
            var insertedNotificationKey=snapshot.key;
            console.log("inserted: ", insertedNotificationKey);
        }).catch(function(err){
            console.log("Error occured", err);
        });
    }
}
//addNotification(notification_object, null);