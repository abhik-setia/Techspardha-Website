//Defined in js/index_database/references/event_ref.js

//var database=firebase.database();
//var storage=firebase.storage();
//var event_categories_ref=database.ref('event-categories');
//var reg_details=database.ref('registeration-details');
//var random_ref=database.ref('random_keys');
//var event_reg_details=reg_details.child('event-registration');
function getCategories()
{
    var categories=[];
    event_categories_ref.once('value', function(snapshot){
        var index=0;
        snapshot.forEach(function(category_id_pair){
            categories[index++]=category_id_pair.key;
        });
        console.log("Catgeories: ",categories);
    });

    return categories;
}
function getCategoryIdMap()
{
    var map=new Object();
    event_categories_ref.once('value', function(snapshot){
        var index=0;
        snapshot.forEach(function(category_id_pair){
            map[category_id_pair.key]=category_id_pair.val();
        });
    });

    return map;

}
function getCategoryId(categoryName)
{
    var map=new Object();
    event_categories_ref.once('value', function(snapshot){
        var index=0;
        snapshot.forEach(function(category_id_pair){
            map[category_id_pair.key]=category_id_pair.val();
        });
    });

    return map[categoryName];
}
