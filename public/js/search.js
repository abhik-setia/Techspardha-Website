var database=firebase.database();
function search_convertToId(name)
{
    name=name.replace(/\s/g,'');
//    console.log(name);
    return name;
}
var object={};

function makeSearchMap()
{
    var available_categories=new Object();
    available_categories[0]="Astronomy";
    available_categories[1]="Design";
    available_categories[2]="Managerial";
    available_categories[3]="Online Events";
    available_categories[4]="Papyrus Vitae";
    available_categories[5]="Programming";
    available_categories[6]="Quizzes";
    available_categories[7]="Robotics";
    for(var i in available_categories)
    {
//        console.log(available_categories[i]);
        inflateMap(available_categories[i]);
    }
}
function inflateMap(categoryname)
{
    database.ref("event-categories/"+categoryname).once('value', function(snapshot){
        database.ref(snapshot.val()).once('value', function(event){
            event.forEach(function(name_id_pair){
                var ename=name_id_pair.key;
                ename=ename.toUpperCase();
//                console.log(ename);
                var id=search_convertToId(ename);
                object[ename]="./events.html?category="+categoryname+"#"+id;
                $('input.autocomplete').autocomplete({
                    data: object,
                    onAutocomplete: function(val) { 
                      window.location.href=object[val];
                    },
                    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                  });
                });
            }); 
        }); 
}
makeSearchMap();