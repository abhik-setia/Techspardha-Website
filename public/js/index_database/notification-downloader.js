var database=firebase.database();
var notification_map=new Object();
database.ref().child("notifications").on('value', function(snapshot){
    snapshot.forEach(function(id_notification_pair){
        console.log("load");
            notification_map[id_notification_pair.key]=id_notification_pair.val(); 
    });
    addNotificationsToUI();
});

function addNotificationsToUI()
{
    $("#slider_content").text("");
    var res="";
    $.each(notification_map,function(index,item){ 
    
        data='<li><h6 class="teal-text">'+item.title+'</h6><p style="font-size: 0.9em;">'+item.description+'</p>';
        if(item.url){
            data+='<a href="'+item.url+'" style="font-size: 0.9em;">'+item.url_txt+'</a></li><br>';
        }else{
            data+='</li> <br>';
        }
        res=data+res;
    });
    $("#slider_content").append(res);
    $('#trigger').addClass('pulse');
    setTimeout(function(){
        $('#trigger').removeClass('pulse');
    }, 2000);
}
