var image_path=null;
var text=null;
var heading=null;   
var priority=1;
var random_exhibition_item_id=exhibitionid.push().key;


var exhibitionitem=exhibitionitem.child(random_exhibition_item_id);
exhibitionitem.set({
    imageurl : "Image Url",
    heading  : "What we do?",
    text :  "Lorem Dorem",
    date : "08-January-2018"
});

var exhibition_container=exhibitionid.child(priority);
exhibition_container.set(random_exhibition_item_id);