function getQueries()
{
    var queries=new Object();
    var ref=$('#query_table');
    var index=0;
    query.once('value', function(snapshot){
        snapshot.forEach(function(id_query_pair)
        {
            index++;
            var q=id_query_pair.val();
            var k=id_query_pair.key;
            queries[k]=q;
            var data='<tr id='+k+'>\
                    <td>'+index+'</td>\
                    <td>'+q.name+'</td>\
                    <td>'+q.email+'</td>\
                    <td>'+q.query+'</td>\
                    <td>\
                        <div class="btn btn-floating" onclick="delete_query(\''+k+'\');"><i class="material-icons">check</i></div>\
                    </td>\
                    </tr>';
            ref.append(data);
        });
//        console.log("Queries : ",queries);
    });
}


function delete_query(query_id)
{
    $('#'+query_id).css('display', 'none');
    query.child(query_id).remove();
}
getQueries();

