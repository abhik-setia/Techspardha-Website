// must keep event name unique for each category

function getRandomKey()
{
    var random=random_ref.push().key;
    return random;
}
var category_name="Programming";
var category_image_path="path";
var category_image_ref=database.ref("category-images");
var category_id=getRandomKey();
event_categories_ref.child(category_name).set(category_id);
category_image_ref.child(category_name).set("images/category-images/"+category_name).then(function(){
    console.log("Success");
}).catch(function(err){
    console.log(err);
});
