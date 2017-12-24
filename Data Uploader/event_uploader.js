// must keep event name unique for each category

//
//var database=firebase.database();
//var storage=firebase.storage();
//var event_categories_ref=database.ref('event-categories');
//var reg_details=database.ref('registeration-details');
//var random_ref=database.ref('random_keys');

var event_reg_details=reg_details.child('event-registration');

//var random_about_us_item_id=random_ref.push().key;
function getRandomKey()
{
    var random=random_ref.push().key;
    return random;
}

var registration_details_key=getRandomKey();
var event_name="Hackathion";
var image_path="images/aboutus/banner_3.jpg";
var short_description="Short Desiption";
var long_description="Long Description"
var date="18/01/2018";//Format as dd/mm/yyyy
var time="14:00";//Format hh/mm
var venue="ccn";
var type="team";//Only two possible team/individual
var priority=1;
var event_object={
    registration_details_key: registration_details_key,
    event_name : event_name,
    image_path : image_path,
    short_description: short_description,
    long_description: long_description,
    date: date,
    time: time,
    venue: venue,
    priority: priority
};
//
////console.log(event_object);
//
var category_name="Category 1";
//var category_key=getRandomKey();
//console.log(category_key);
event_categories_ref.child(category_name).once('value', function(snapshot){
    category_items_id=snapshot.val(); 
    var category_details_ref=database.ref(category_items_id+'/'+event_name);
    var event_key=getRandomKey();
    category_details_ref.set(event_key);
    var event_ref=database.ref(event_key);
    event_ref.set(event_object);

});



