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
    $.each(notification_map,function(index,item){ 
    
        data='<li><h6 class="teal-text">'+item.title+'</h6><p style="font-size: 0.9em;">'+item.description+'</p>';
        if(item.url){
            data+='<a href="'+item.url+'" style="font-size: 0.9em;">'+item.url_txt+'</a></li><br>d';
        }else{
            data+='</li> <br>';
        }
        $("#slider_content").append(data);
    });
}
getNotifications();