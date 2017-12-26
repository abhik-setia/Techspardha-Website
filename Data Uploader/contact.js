//var database=firebase.database();
//var storage=firebase.storage();
//var query=database.ref('query');
function insert_query(query_object)
{

    var random_query_item_id=query.push().key;
    var queryitem=query.child(random_query_item_id);
    queryitem.set(query_object);
}

var query_object={
 name: "Alpha",
 email: "amkam",
 query: "zklxm"
};
insert_query(query_object);
