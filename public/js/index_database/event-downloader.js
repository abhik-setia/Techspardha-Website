var index=0;
function authenticateAndPopulate(event_object)
{
    var auth=firebase.auth();
    auth.onAuthStateChanged(function(user)
    {
        populate(event_object);
        if(user)
        {
            
        }
        else{
            
        }
    });
    
}
function populate(event_object)
{
        var storage=firebase.storage();
        var storage_ref=storage.ref();
        var path_ref=storage_ref.child(event_object.image_path+'.jpg');
        console.log("Path: ",path_ref);
        var default_image='https://firebasestorage.googleapis.com/v0/b/techspardha18.appspot.com/o/images%2FDefault%2FProgramming.jpg?alt=media&token=bd48c3f8-cddc-4304-93c0-6b177aac99f5';
        path_ref.getMetadata().then(function(metadata) {
            
            console.log("Meta Data", metadata.downloadURLs[0]);
            index++;
            console.log("Index", index, event_object);
            var event_placeholder=$('#event_placeholder');
            var format=".jpg";
            var data='<section><div class="section scrollspy" id="event_'+index+'"><div class="parallax-container" style="height:  60vh;"><div class="parallax"><img style="max-height: 90vh;" src='+metadata.downloadURLs[0]+'.jpg></div></div><div class="event_header row"><div class="row"><h3>'+event_object.event_name+'</h3><div class="row">\
                <div class="col s12">\
                  <ul class="tabs tabs-fixed-width">\
                    <li class="tab col s3"><a href="#description'+index+'">Description</a></li>\
                    <li class="tab col s3"><a href="#rules'+index+'">Rules</a></li>\
                    <li class="tab col s3"><a href="#coordinators'+index+'">Coordinators And Venue</a></li></ul>\</div>\
                <div id="description'+index+'" class="col s12">\
                        <div class="row" style="height: inherit;">\
                                <p class="col l12 s12" style="text-align: justify;">'+event_object.description+'\
                                </p>\
                        </div>\
                </div>\
                <div id="rules'+index+'" class="col s12">\
                    <div class="row white-text"> \
                        <div class="col s12 m12 l8">\
                            <p  style="text-align: justify;">'+event_object.rules+'</p></div>\
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
        data+='<div class="row center-align">\
        <div class="btn-large" id="'+event_object.registration_details_key+'" onclick="registerUser('+event_object.registration_details_key+');">Register</div>\
                </div>\
            </div>\
           </div>';             
            event_placeholder.append(data);
            var side_nav=$('#side-nav-event-placaeholder');
            var value='<li><a href="#event_'+index+'" class="waves-effect waves-light">'+event_object.event_name+'</a></li>';
            side_nav.append(value);
            $('#events_dropdown').append(value);
            $('.parallax').parallax();
            $('#preloader_a').css('display', 'none');
            $('#preloader_b').css('display', 'none');
            $('ul.tabs').tabs({'swipeable':true});
        }).catch(function(error) {
            index++;
            console.log("Index", index, event_object);
            var event_placeholder=$('#event_placeholder');
            var format=".jpg";
                var data='<section><div class="section scrollspy" id="event_'+index+'"><div class="parallax-container" style="height:  60vh;"><div class="parallax"><img style="max-height: 90vh;" src='+default_image+'.jpg></div></div><div class="event_header row"><div class="row"><h3>'+event_object.event_name+'</h3><div class="row">\
                    <div class="col s12">\
                      <ul class="tabs tabs-fixed-width">\
                        <li class="tab col s3"><a href="#description'+index+'">Description</a></li>\
                        <li class="tab col s3"><a href="#rules'+index+'">Rules</a></li>\
                        <li class="tab col s3"><a href="#coordinators'+index+'">Coordinators And Venue</a></li></ul>\</div>\
                    <div id="description'+index+'" class="col s12">\
                            <div class="row" style="height: inherit;">\
                                    <p class="col l12 s12" style="text-align: justify;">'+event_object.description+'\
                                    </p>\
                            </div>\
                    </div>\
                    <div id="rules'+index+'" class="col s12">\
                        <div class="row white-text"> \
                            <div class="col s12 m12 l8">\
                                <p  style="text-align: justify;">'+event_object.rules+'</p></div>\
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
    data+='<div class="row center-align">\
    <div class="btn-large" id="'+event_object.registration_details_key+'" onclick="registerUser('+event_object.registration_details_key+');">Register</div>\
                </div>\
            </div>\
           </div>';             

            event_placeholder.append(data);
            var side_nav=$('#side-nav-event-placaeholder');
            var value='<li><a href="#event_'+index+'" class="waves-effect waves-light">'+event_object.event_name+'</a></li>';
            side_nav.append(value);
            $('#events_dropdown').append(value);
            $('.parallax').parallax();
            $('#preloader_a').css('display', 'none');
            $('#preloader_b').css('display', 'none');
            $('ul.tabs').tabs({'swipeable':true});
        });
           
    
}
function getEventByNameandCategoryID(categoryKey, eventname)
{
    console.log("Obtaining", categoryKey, eventname);
//    var eventid;
        database.ref(categoryKey+'/'+eventname).once('value', function(event){
            var eventid=event.val();
            console.log(eventid);
            database.ref(eventid).once('value', function(snapshot){
                 eventObject=snapshot.val();
                 console.log(eventObject);
                 return eventObject;
            }).then(function(event_object){
                authenticateAndPopulate(event_object.val());
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
        console.log("Snapshot: ", snapshot.val());
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
console.log("Category is: ", category);
getEventsByCategory(category);