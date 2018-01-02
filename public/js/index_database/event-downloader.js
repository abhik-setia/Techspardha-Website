var index=0;
var userRegisterStateChange=0;
var provider=new firebase.auth.GoogleAuthProvider();
//var currentUser=null;
var auth=firebase.auth();
var currentUserObject=null;
var useremail;
var event_placeholder=$('#event_placeholder');
var side_nav=$('#side-nav-event-placaeholder');
var nav_bar=$('#events_dropdown');
            
function loginLogout()
{
    if(!currentUserObject)
    {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        auth.signInWithPopup(provider).then(function(result){
            $('.login-logout-btn').text('Logout');
            $('.login-logout-btn-side').text('');
            $('.login-logout-btn-side').append('<i class="material-icons deep-orange-text text-accent-2">input</i>Logout');
            currentUserObject=result.user;
            event_placeholder.text('');
            side_nav.text('');
            nav_bar.text('');
        });
    }
    else
        {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            auth.signOut().then(function(){
                useremail=null;
                currentUserObject=null;
                event_placeholder.text('');
                side_nav.text('');
                nav_bar.text('');
                $('.btn-large').removeClass('disabled');
                $('.btn-large').text('Register');
            }).catch(function(error){
                  Materialize.toast("Logout Failed! Try Again!");
//                  console.log(error);
            });
        }
}

auth.onAuthStateChanged(function(user)
{
//    console.log(user);
    if(user)
    {
        Materialize.toast("Logged in as: "+user.email, 2000);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        //Email is used as primary key! Firebase doesn't accept keys with '.' symbol, so need to cleaned
        currentUserObject=user;
        useremail=currentUserObject.email.replace(/\./g, "");
        currentUserObject.email=currentUserObject.email.replace(/\./g, "");
//        console.log(currentUserObject);
        $('.login-logout-btn').text('Logout');
        $('.login-logout-btn-side').text('');
        $('.login-logout-btn-side').append('<i class="material-icons deep-orange-text text-accent-2">input</i>Logout');
    }
    else
    {
        useremail=null;
        currentUserObject=null;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        currentUserObject=user;
        $('.login-logout-btn').text('Login');
        $('.login-logout-btn-side').text('');
        $('.login-logout-btn-side').append('<i class="material-icons deep-orange-text text-accent-2">input</i>Login');
    }
    event_placeholder.text('');
    side_nav.text('');
    nav_bar.text('');

    $('#preloader_a').css('display', 'block');
    $('#preloader_b').css('display', 'block');
    getEventsByCategory(category);    
//    console.log("Category is: ", category);
});

function checkRegistrationStatus(registration_details_key)
{
    if(currentUserObject==null)
    {
//        console.log("Null User");
        $('#register-btn-'+registration_details_key).css('display', 'inline-block');
    }
    else
    {
        
//        console.log("User email",useremail);
        database.ref('registraiton-details/'+registration_details_key).child(useremail).once('value', function(snapshot){
           if(snapshot==null || snapshot.val()==null)
           {
                $('#register-btn-'+registration_details_key).text('Register');
           }
            else
            {
                $('#register-btn-'+registration_details_key).text('Registered');
                $('#register-btn-'+registration_details_key).addClass('disabled');
            }
            $('#register-btn-'+registration_details_key).css('display', 'inline-block');
        });  
    }
}

function registerUser(registration_details_key)
{
    $('#register-btn-'+registration_details_key).text('Please Wait...');
    $('#register-btn-'+registration_details_key).addClass('disabled');
    if(currentUserObject==null)
    {
        userRegisterStateChange=1;
        auth.signInWithPopup(provider).then(function(result){
            $('.login-logout-btn').text('Logout');
            $('.login-logout-btn-side').text('');
            $('.login-logout-btn-side').append('<i class="material-icons deep-orange-text text-accent-2">input</i>Logout');
            currentUserObject=result.user;
            useremail=currentUserObject.email.replace(/\./g, "");
            var userob={
                name: currentUserObject.displayName,
                email: useremail,
                verified: currentUserObject.emailVerified,
                original_mail: result.user.email
            };
//            console.log("Userob: ",userob);
                registerUserForEvent(registration_details_key, userob);
        }).catch(function(error){
//            console.log(error);
            $('#register-btn-'+registration_details_key).removeClass('disabled');
            $('#register-btn-'+registration_details_key).text('Register');
            Materialize.toast("Registration Failed! Please put in query if problem persists!", 4000);
        });
    }
    else
    {
            var userob={
                name: currentUserObject.displayName,
                email: useremail,
                verified: currentUserObject.emailVerified,
                original_mail: currentUserObject.email
            };
            registerUserForEvent(registration_details_key, userob);
            //Defined in dataUploader/registration.js
    }
}
function populate(event_object)
{
        var storage=firebase.storage();
        var storage_ref=storage.ref();
        event_object.event_name=event_object.event_name.toUpperCase();
        event_object.image_path=event_object.image_path.toLowerCase();
        var path_ref=storage_ref.child(event_object.image_path+'.jpg');
        //console.log("Path: ",path_ref);
        var default_image='https://firebasestorage.googleapis.com/v0/b/techspardha18.appspot.com/o/images%2FDefault%2FDefault%20poster.jpg?alt=media&token=fcdf1e26-6e2d-4127-be73-6e908e7ae5d6';
        if(event_object.hasImage!=null)
        {
            path_ref.getMetadata().then(function(metadata) {
            
            //console.log("Meta Data", metadata.downloadURLs[0]);
            index++;
            //console.log("Index", index, event_object);
            
            var format=".jpg";
//            console.log(event_object.rules);
            
            var data='<section><div class="section scrollspy" id="event_'+index+'"><div class="parallax-container" style="height:  60vh;"><div class="parallax"><img style="max-height: 90vh;" src='+metadata.downloadURLs[0]+'.jpg></div></div><div class="event_header row"><div class="row"><h3>'+event_object.event_name+'</h3><div class="row">\
                <div class="col s12">\
                  <ul class="tabs tabs-fixed-width">\
                    <li class="tab col s3"><a href="#description'+index+'">About</a></li>\
                    <li class="tab col s3"><a href="#rules'+index+'">Rules</a></li>\
                    <li class="tab col s3"><a href="#coordinators'+index+'">Details</a></li></ul>\</div>\
                <div id="description'+index+'" class="col s12">\
                        <div class="row" style="height: inherit;">\
                                <p class="col l12 s12 white-text description_text" style="text-align: justify;">'+event_object.description+'\
                                </p>\
                        </div>\
                </div>\
                <div id="rules'+index+'" class="col s12">\
                    <div class="row white-text"> \
                        <div class="col s12 m12 l12">\
                            <p  style="text-align: justify;" class="rules_text">'+event_object.rules+'</p></div>\
                        </div>\
                 </div>\
                <div id="coordinators'+index+'" class="col s12">\
                    <div class="row white-text">\
                            <div class="col s12 m5 l5 center"><h4>Co-ordinators</h4><p class="flow-text">'+event_object.coordinator+'</p></div>\
                        <div class="col s1 hide-on-small-only center" style="height: 35vh;">\
                        </div>\
                        <div class="col s1 hide-on-small-only center" style="height: 35vh;">\
                            <div style="width: 2px; background: #1DE9C3; height: inherit; margin-top: 2vh;"></div>\
                        </div>\
                            <div class="col s12 m5 l5 center"><h4>Schedule</h4><span class="flow-text"><table><tbody><tr><td width="50%" class="center-align">Date: </td><td width="50%" class="center-align">'+event_object.date+'</td></tr><tr><td class="center-align">Time: </td><td class="center-align">'+event_object.time+'</td></tr><tr><td class="center-align">Venue: </td><td class="center-align">'+event_object.venue+'</td></tr></tbody></table></span></div>\
                    </div>\
                </div>\
                </div>';
        if(event_object.download_path!=null)
        {
            data+='<div class="row center-align">\
            <a class="btn-large" href="'+event_object.download_path+'">Download files</a>\
            </div>';
        }
            
        checkRegistrationStatus(event_object.registration_details_key);
        data+='<div class="row center-align">\
        <div class="btn-large" id="register-btn-'+event_object.registration_details_key+'" onclick="registerUser(\''+event_object.registration_details_key+'\');">Register</div>\
                </div>\
            </div>\
           </div>';
            event_placeholder.append(data);
            var value='<li><a href="#event_'+index+'" class="waves-effect waves-light">'+event_object.event_name+'</a></li>';
            side_nav.append(value);
            $('#events_dropdown').append(value);
            $('.parallax').parallax();
            $('#preloader_a').css('display', 'none');
            $('#preloader_b').css('display', 'none');
            $('ul.tabs').tabs({'swipeable':false});
        });   
    }
    else
    {
            index++;
            //console.log("Index", index, event_object);
            //console.log(event_object.rules);

            var format=".jpg";
                var data='<section><div class="section scrollspy" id="event_'+index+'"><div class="parallax-container" style="height:  60vh;"><div class="parallax"><img style="max-height: 90vh;" src='+default_image+'.jpg></div></div><div class="event_header row"><div class="row"><h3>'+event_object.event_name+'</h3><div class="row">\
                    <div class="col s12">\
                      <ul class="tabs tabs-fixed-width">\
                        <li class="tab col s3"><a href="#description'+index+'">About</a></li>\
                        <li class="tab col s3"><a href="#rules'+index+'">Rules</a></li>\
                        <li class="tab col s3"><a href="#coordinators'+index+'">Details</a></li></ul>\</div>\
                    <div id="description'+index+'" class="col s12">\
                            <div class="row" style="height: inherit;">\
                                    <p class="col l12 s12 white-text description_text" style="text-align: justify;">'+event_object.description+'\
                                    </p>\
                            </div>\
                    </div>\
                    <div id="rules'+index+'" class="col s12">\
                        <div class="row white-text"> \
                            <div class="col s12 m12 l12">\
                                <p  style="text-align: justify;" class="rules_text">'+
                                event_object.rules
                                +'</p></div>\
                            </div>\
                     </div>\
                    <div id="coordinators'+index+'" class="col s12">\
                        <div class="row white-text">\
                                <div class="col s12 m5 l5 center"><h4>Co-ordinators</h4><p class="flow-text">'+event_object.coordinator+'</p></div>\
                            <div class="col s1 hide-on-small-only center" style="height: 35vh;">\
                            </div>\
                            <div class="col s1 hide-on-small-only center" style="height: 35vh;">\
                                <div style="width: 2px; background: #1DE9C3; height: inherit; margin-top: 2vh;"></div>\
                            </div>\
                                <div class="col s12 m5 l5 center"><h4>Schedule</h4><span class="flow-text"><table><tbody><tr><td width="50%" class="center-align">Date: </td><td width="50%" class="center-align">'+event_object.date+'</td></tr><tr><td class="center-align">Time: </td><td class="center-align">'+event_object.time+'</td></tr><tr><td class="center-align">Venue: </td><td class="center-align">'+event_object.venue+'</td></tr></tbody></table></span></div>\
                        </div>\
                    </div>\
                    </div>';
    if(event_object.download_path!=null)
    {
        data+='<div class="row center-align">\
        <a class="btn-large" href="'+event_object.download_path+'">Download files</a>\
        </div>';
    }
    checkRegistrationStatus(event_object.registration_details_key);
    data+='<div class="row center-align">\
    <div class="btn-large" id="register-btn-'+event_object.registration_details_key+'" onclick="registerUser(\''+event_object.registration_details_key+'\');">Register</div>\
                </div>\
            </div>\
           </div>';             

            event_placeholder.append(data);
//            $('#register-btn-'+event_object.registration_details_key).css('display', 'none');
            var value='<li><a href="#event_'+index+'" class="waves-effect waves-light">'+event_object.event_name+'</a></li>';
            side_nav.append(value);
            $('#events_dropdown').append(value);
            $('.parallax').parallax();
            $('#preloader_a').css('display', 'none');
            $('#preloader_b').css('display', 'none');
            $('ul.tabs').tabs({'swipeable':false});
    }
}
function getEventByNameandCategoryID(categoryKey, eventname)
{
//    console.log("Obtaining", categoryKey, eventname);
//    var eventid;
        database.ref(categoryKey+'/'+eventname).once('value', function(event){
            var eventid=event.val();
            //console.log(eventid);
            database.ref(eventid).once('value', function(snapshot){
                 eventObject=snapshot.val();
                 //console.log(eventObject);
                 return eventObject;
            }).then(function(event_object){
                populate(event_object.val());
            });
        }); 
}


function obtainEventsFromCategory(categoryname, name_id_map)
{
    event_categories_ref.child(categoryname).once('value', function(snapshot){
        return snapshot.val();
    }).then(function(categoryKey){
        for(var i in name_id_map)
        {
            getEventByNameandCategoryID(categoryKey.val(), i);
        }
    });
    
}
//returns event-name, event-key map
function getEventsByCategory(categoryname)
{
    //Case sensitive
    var eventid;
    event_categories_ref.child(categoryname).once('value', function(snapshot){
        //console.log("Snapshot: ", snapshot.val());
        database.ref(snapshot.val()).once('value', function(event){
            var map=new Object();
            event.forEach(function(name_id_pair){
                map[name_id_pair.key]=name_id_pair.val();    
            });
            return map;
        }).then(function(name_id_map){
            obtainEventsFromCategory(categoryname,name_id_map.val());
        }); 
    });
}

function side_nav_login_logout()
{
    $('.button-collapse').sideNav('hide');
    loginLogout();
}

/*Just added for side nav and nav bar to display categories*/
function populateCategories_ev_page(categories)
{
    var categories_placeholder=$("#categories_placeholder");
    var side_nav=$('#side-nav-categories-placeholder');
    var data="";
    var val="";
    $.each(categories,function(index,item){
        val+='<li><a class="waves-effect waves-light white-text" href="events.html?category='+item+'">'+item+'</a></li>';
    });
    side_nav.append(val);
    categories_placeholder.append(val);

}
function getCategories_ev_page()
{
    var categories=[];
    event_categories_ref.once('value', function(snapshot){
        var index=0;
        snapshot.forEach(function(category_id_pair){
            categories[index++]=category_id_pair.key;
        });
//        console.log("Here", categories);
        populateCategories_ev_page(categories);
    });
}
getCategories_ev_page();
