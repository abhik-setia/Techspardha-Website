var database=firebase.database();
var notification_map=new Object();

function getBlog(){
    database.ref("blogs").child(blogId).once('value', function(snapshot){
        addNotificationsToUI(snapshot.val());
    }).catch(function(err){
        console.log(err);
    });
}
function addBlogToUI(blog_object)
{
    
}
getBlog();