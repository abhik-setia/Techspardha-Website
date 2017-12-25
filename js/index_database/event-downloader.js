//Defined in js/index_database/references/event_ref.js

//var database=firebase.database();
//var storage=firebase.storage();
//var event_categories_ref=database.ref('event-categories');
//var reg_details=database.ref('registeration-details');
//var random_ref=database.ref('random_keys');
//var event_reg_details=reg_details.child('event-registration');
function getEventByNameandCategory(categoryname, eventname)
{
    //Case sensitive
    var eventid;
    event_categories_ref.child(categoryname).once('value', function(snapshot){
//        console.log("Snapshot: ", snapshot.val());
        database.ref(snapshot.val()+'/'+eventname).once('value', function(event){
            eventid=event.val();
            console.log(eventid);
            database.ref(eventid).once('value', function(snapshot){
                 eventObject=snapshot.val();
                    console.log(eventObject);
                 return eventObject;
            });
        }); 
    });
//    return eventObject;
}

//returns event-name, event-key map
function getEventsByCategory(categoryname)
{
    //Case sensitive
    var eventid;
    event_categories_ref.child(categoryname).once('value', function(snapshot){
//        console.log("Snapshot: ", snapshot.val());
        database.ref(snapshot.val()).once('value', function(event){
            var map=new Object();
            event.forEach(function(name_id_pair){
                map[name_id_pair.key]=name_id_pair.val();    
            });
            console.log("Name id pair", map);
        }); 
    });
//    return eventObject;
}
getEventsByCategory("Category 1");