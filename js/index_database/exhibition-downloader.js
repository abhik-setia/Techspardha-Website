function getExhibitonFeeds()
{
    var exhibition_feed=[];
    exhibitionid.once('value', function(snapshot){
        var exhibition_feed_pair=snapshot.val();
        var items=exhibition_feed_pair.length -1; //1 Indexed
        snapshot.forEach(function(priority_id_pair)
        {
                exhibitionitem.child(priority_id_pair.val()).once('value', function(feed){
                exhibition_feed[priority_id_pair.key]=feed.val();
            });
        });
        console.log("Exhibition Feeds: ",exhibition_feed);
    });
    return exhibition_feed;
}

getExhibitonFeeds();
