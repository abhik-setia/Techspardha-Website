//var database=firebase.database();
//var storage=firebase.storage();
//var aboutusid=database.ref('aboutus_ids');
//var aboutusitem=database.ref('aboutus_item');
//Above references are defined in js/index_database/references/aboutus_ref.js

function populate_aboutus_placeholder(count, feeds)
{
    
}
function getFeeds()
{
    var aboutus_feed=[];
    aboutusid.once('value', function(snapshot){
        var about_us_feed_pair=snapshot.val();
        var items=about_us_feed_pair.length -1; //1 Indexed
        snapshot.forEach(function(priority_id_pair)
        {
                aboutusitem.child(priority_id_pair.val()).once('value', function(feed){
                aboutus_feed[priority_id_pair.key]=feed.val();
            });
        });
//        console.log("Feeds: ",aboutus_feed);
        populate_aboutus_placeholder(items, aboutus_feed);
    });
//    return aboutus_feed;
}

