/*
    User object{
        userid, name, contact, etc
    }
*/
var database=firebase.database();
var registration_ref=database.ref('registraiton-details');
var random_ref=database.ref('random');

function getRandomKey()
{
    return random_ref.push().key;
}

function individualRegistration(registration_details_key, userObject)
{
    var event_reg_details_ref=registration_ref.child(registration_details_key);
    var event_user_ref=event_reg_details_ref.child(userObject.email);
    return event_user_ref.once('value', function(snapshot){
        if(snapshot.val()!=null)
        {
            var error={
                status: false,
                message: "User Already Registered"
            };
            console.log("Return", error);
            return error;
        }
        else
        {   
            var random=getRandomKey();
            registration_ref.child(registration_details_key+'/'+userObject.email).set(random);
            
            var event_user_ref=registration_ref.child(random);
            event_user_ref.set(userObject);
            var error={
                status: true,
                message: "Registered Successfully"
            };
            console.log("Return",error);
            return error;
        }   
    });
}

var userObject={
    email:  "bot?",
    name: "bit",
    phone: 7850123455,
    x: "anything else"
};
individualRegistration("-L16_7db_o9y9Do8sUUD", userObject).then(function(result){
    console.log(result);  
});
function teamRegistration(registration_details_key, teamObject)
{
    //Not implemented if same users registers in two diffrent teams of same event
    //teamObject.teamName is primary Key
    var event_reg_details_ref=registration_ref.child(registration_details_key);
    var event_user_ref=event_reg_details_ref.child(teamObject.teamName);
    return event_user_ref.once('value', function(snapshot){
        if(snapshot.val()!=null)
        {
            var error={
                status: false,
                message: "Team Already Registered"
            };
            console.log("Return", error);
            return error;
        }
        else
        {   
            var random=getRandomKey();
            registration_ref.child(registration_details_key+'/'+teamObject.teamName).set(random);
            
            var event_user_ref=registration_ref.child(random);
            event_user_ref.set(teamObject);
            var error={
                status: true,
                message: "Registered Successfully"
            };
            console.log("Return",error);
            return error;
        }   
    });
}