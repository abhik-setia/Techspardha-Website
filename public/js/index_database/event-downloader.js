var index=0;

function populate(event_object)
{
    index++;
    console.log("Index", index, event_object);
    var event_placeholder=$('#event_placeholder');
    var format=".jpg";
    var data='<section><div class="section scrollspy" id="event_'+index+'"><div class="parallax-container" style="height:  60vh;"><div class="parallax"><img class="responsive-img " src='+event_object.image_path+'.jpg></div></div><div class="row black white-text no-bottom-margin" style="height: 100%; min-height: 40vh; padding-left: 16px; margin-bottom: 0px;"><div class="col s8 m8 l8"><h2 class="header teal-text">'+event_object.event_name+'</h2></div><div class="row "><div class="col s12 m8 l8"><h4>Description</h4><p class="flow-text">'+event_object.description+'</p></div><div class="col l1 show-on-large-only"></div><div class="col s12 m4 l3 left-align"><h4>Co-ordinators</h4><p class="flow-text">'+event_object.coordinator+'</p></div></div></div><div class="row white-text" style="padding-left: 16px;"><div class="col s12 m12 l8"><h4>Rules</h4><p class="flow-text">'+event_object.rules+'</p></div><div class="col l1 show-on-large-only"></div><div class="col s12 m12 l3"><h4>Schedule</h4><span class="flow-text"><table style="margin-top: 3vh; margin-left: 1vh; padding: 0px;"  ><tbody><tr ><td padding=0>Date</td><td>'+event_object.date+'</td></tr><tr><td>Time</td><td>2:00 pm</td></tr><tr><td>Venue</td><td>'+event_object.venue+'</td></tr></tbody></table></span></div></div><div class="row center"><button class="validate_user btn-large" onclick="register('+event_object.registration_details_key+')">Register</button></div></div></section>';
    event_placeholder.append(data);
    var side_nav=$('#side-nav-event-placaeholder');
    var value='<li><a href="#event_'+index+'" class="waves-effect waves-light">'+event_object.event_name+'</a></li>';
    side_nav.append(value);
    $('#events_dropdown').append(value);
    $('.parallax').parallax();
    $('#preloader_a').css('display', 'none');
    $('#preloader_b').css('display', 'none');
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