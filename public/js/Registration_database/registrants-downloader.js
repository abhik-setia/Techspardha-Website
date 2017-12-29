var database=firebase.database();

function parseRegistrant(database_ref_key, registrant)
{
    //parse json object registrant and inflate table
    //database_Ref_key is for taking any action on registrant
}

function getRegistrantbyRegKey(reg_key)
{
    var reg_ref=database.ref('registraiton-details/'+reg_key);
    reg_ref.once('value', function(snapshot){
        snapshot.forEach(function(id_key_pair){
             var user_or_team_ref=database.ref(registraiton-details+'/'+id_key_pair.key);
             user_or_team_ref.once('value', function(data){
                 parseRegistrant(id_key_pair.key, data.val());
             });
        });
    });
}
function getRegistrantByEventId(eventId)
{
    var event_ref=database.ref(eventId);
    event_ref.on('value', function(snapshot){
         var reg_detail_key=snapshot.val().registration_details_key;
         getRegistrantbyRegKey(reg_detail_key);
    });
}
