var database=firebase.database();
var notification_map=new Object();
function getNotifications(){
    database.ref().child("notifications").once('value', function(snapshot){
        snapshot.forEach(function(id_notification_pair){
            console.log("load");
                notification_map[id_notification_pair.key]=id_notification_pair.val(); 
        });
        addNotificationsToUI();
    }).catch(function(err){
        console.log(err);
    });
}
function addNotificationsToUI()
{
    //USE notification map to append data to UI
    //use ./blog.html?blogId=notification_object.url to open up a blog if not null otherwise its simple notification 
}
getNotifications();