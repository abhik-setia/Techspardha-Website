var database=firebase.database();
var ref=database.ref('user-registration-tokens');
ref.once('value', function(snapshot){
   snapshot.forEach(function(pair){
       $('#token_placeholder').append('\"'+pair.key+'\",');
   }) 
});
function clear()
{
    ref.remove();
    
}