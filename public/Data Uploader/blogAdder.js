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

var blogObject={
    title: "Unapproved",
    notification_text: "Notification text",
    blog_text: "Sample Description",
    author: "Sample author",
    approved: "false"
    //or any other attribute that may be required can be set dynamically
};

function addBlog(blog_object)
{
//    if(validUser)
    {
        var date_object=new Date();
        blog_object.date=date_object.getDay()+"/"+date_object.getMonth();
        blog_object.time=date_object.getHours()+":"+date_object.getMinutes();
        database.ref("blogs").push(blog_object).then(function(snapshot){
            var blogKey=snapshot.key;
            console.log("inserted: ", blogKey);
            var notification_object={};
            notification_object.title=blog_object.title;
            notification_object.author=blog_object.author;
            notification_object.description=blog_object.notification_text;
            addNotification(notification_object, blogKey);
        }).catch(function(err){
            console.log("Error occured", err);
        });
    }
}
addBlog(blogObject, null);