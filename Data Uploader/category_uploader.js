// must keep event name unique for each category

function getRandomKey()
{
    var random=random_ref.push().key;
    return random;
}
var category_name="Category 1";
var category_id=event_categories_ref.child(category_name).set(getRandomKey());
