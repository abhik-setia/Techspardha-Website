var image_path=null;
var text=null;
var heading=null;   
var priority=5;
var random_about_us_item_id=aboutusid.push().key;


var aboutusitem=aboutusitem.child(random_about_us_item_id);
aboutusitem.set({
    imageurl : "Image Url",
    heading  : "What we do?",
    text :  "Lorem Dorem"
});

var aboutusid_container=aboutusid.child(priority);
aboutusid_container.set(random_about_us_item_id);