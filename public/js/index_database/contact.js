var auth=firebase.auth();
var validUser=0;
auth.onAuthStateChanged(function(user){
    if(user==null)
    {
        validUser=0;
        window.location.href="./validate_user.html?back=query";
    }
    else if(user.email!="ts18@techspardha.org")
    {
        Materialize.toast("Logged in as other user, logging off!");
        window.location.href="./validate_user.html?back=query";
        auth.signOut();
    }
    else
    {
        
        validUser=1;
        getQueries();
    }
});

function adminLogout()
{
    auth.signOut();
}
function getQueries()
{
    if(validUser==1)
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
}


function delete_query(query_id)
{
    if(validUser==1)
    {
        $('#'+query_id).css('display', 'none');
        query.child(query_id).remove();
    }
}


