//var database=firebase.database();
//var storage=firebase.storage();
//var query=database.ref('query');
function insert_query(query_object)
{
    var random_query_item_id=query.push().key;
    var queryitem=query.child(random_query_item_id);
    queryitem.set(query_object).then(function(){
        
        Materialize.toast('We\'ll get back to you soon.', 4000);

        $('#query_submit_btn').removeClass('disabled');
        $('#query_submit_btn').css('transition', '0.3s ease');
        $('#query_submit_btn').css('background', 'green');
        setTimeout(function(){
            $('#query_submit_btn').css('background','teal');
        }, 1000);
        var name=$('#name').val("");
        var email=$('#email').val("");
        var query=$('#query').val("");
        
    }).catch(function(err){
        Materialize.toast('Something went wrong!!', 4000);
        $('#query_submit_btn').css('background','red');
        setTimeout(function(){
            $('#query_submit_btn').css('background','teal');
        }, 1000);
    });
}


function askQuery()
{
    var name=$('#name').val();
    var email=$('#email').val();
    var query=$('#query').val();
    
    if(name==null || email==null || query==null || name=='' || email=='' || query=='')
    {   
        console.log('error');
        $('#query_submit_btn').css('transition', '0.3s ease');
        $('#query_submit_btn').css('background','red');
        setTimeout(function(){
            $('#query_submit_btn').css('background','teal');
        }, 300);
    }   
    else
    {
        
         $('#query_submit_btn').css('transition', '0.3s ease');
         $('#query_submit_btn').addClass('disabled');
//         $('#query_submit_btn').css('display', 'none');
//         $('#query_information').css('display', 'inline-block');
//         $('#query_information').css('color', '#1DE9C3');
//         $('#query_information').text('Wait...');
        
        var query_object={
         name: name,
         email: email,
         query: query
        };
        console.log(query_object);
        insert_query(query_object);
    }
}