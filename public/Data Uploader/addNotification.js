var auth=firebase.auth();
var database=firebase.database();
var validUser=0;
auth.onAuthStateChanged(function(user){
    if(user==null)
    {
        validUser=0;
        window.location.href="./validate_user.html?back=add_notification";
    }
    else if(user.email!="ts18@techspardha.org")
    {
        Materialize.toast("Logged in as other user, logging off!");
        window.location.href="./validate_user.html?back=add_notification";
        auth.signOut();
    }
    else
    {
        validUser=1;
    }
});

function onClickAddNotification()
{
    $('#add-notification-btn').addClass('disabled');
    var author=$('#author_name').val();
    var description=$('#notification_description').val();
    var title=$('#notification_title').val();
    var url_txt=$('#url_txt').val();
    var url=$('#url').val();
    if((url==null && url_txt!=null )|| (url!=null && url_txt==null) || author==null || title==null)
    {
        Materialize.toast("Invalid Inputs", 2000);
        $('#add-notification-btn').removeClass('disabled');
    }
    else {
        var notification_object={
            title: title,
            description: description,
            author: author,
            url_txt: url_txt,
            //or any other attribute that may be required can be set dynamically
        };
        addNotification(notification_object, url);
    }
}
function addNotification(notification_object, url)
{
    if(validUser)
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
            Materialize.toast("Notification posted successfully", 2000);    
            $('#add-notification-btn').removeClass('disabled');
            var author=$('#author_name').val('');
            var description=$('#notification_description').val('');
            var title=$('#notification_title').val('');
            var url_txt=$('#url_txt').val('');
            var url=$('#url').val('');
        }).catch(function(err){
            console.log("Error occured", err);
            Materialize.toast("Error occured", 2000);
            $('#add-notification-btn').removeClass('disabled');
        });
    }
}
//addNotification(notification_object, null);   