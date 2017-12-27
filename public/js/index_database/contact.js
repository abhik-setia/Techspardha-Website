function getQueries()
{
    var queries=new Object();
    query.on('value', function(snapshot){
        snapshot.forEach(function(id_query_pair)
        {
            queries[id_query_pair.key]=id_query_pair.val();     
        });
        console.log("Queries : ",queries);
    });
//    return queries;
}

getQueries();

function delete_query(query_id)
{
    query.child(query_id).remove();
}

