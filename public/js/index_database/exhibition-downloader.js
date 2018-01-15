var exhibition_feed=new Map();

$(function() {
  $('#overlay').removeClass('blur-in');
});

function blurin(index)
{
//    console.log("Click", index);
    $('.pop-up').css('visibility','visible');
    $('#close_popup').css('visibility','visible');
    $('.pop-up').fadeIn(300);
    $('#overlay').addClass('blur-in');
    $('#overlay').removeClass('blur-out');
    $('#close_popup').fadeIn(100);
    $('#exhibition_popup_description').html(exhibition_feed[index].text);
    $('.exhibition_popup_name').html(exhibition_feed[index].heading);
    $('#exhibition_popup_image').attr('src',exhibition_feed[index].imageurl+'.jpg');
    $('#trigger').css('display', 'none');
}
function close_popup()
{
    $('.pop-up').fadeOut(300);
    $('#overlay').removeClass('blur-in');
    $('#overlay').addClass('blur-out');
    $('#close_popup').fadeOut(100);
    $('#trigger').css('display', 'block');
}
function getExhibitonFeeds()
{
    exhibitionid.once('value', function(snapshot){
        
        var exhibition_feed_pair=snapshot.val();
        var items=exhibition_feed_pair.length -1; //1 Indexed
        snapshot.forEach(function(priority_id_pair)
        {
                exhibitionitem.child(priority_id_pair.val()).once('value', function(feed){
//                console.log("Feed", feed.val(), priority_id_pair.key);
                exhibition_feed[priority_id_pair.key]=feed.val();
                exhibiton_inflator(priority_id_pair.key);    
            });
        });
    });
}

function exhibiton_inflator(i){ 
    var exhibition_holder=$('#exhibition_placeholder');
//    console.log("Feedsss ", i, " ", exhibition_feed[i]);
    var data='<img src="'+exhibition_feed[i].imageurl+'.jpg" alt="" width="100%" height="auto" class="gallery-img" onclick="blurin('+i+');"/>';
    exhibition_holder.append(data);
}
getExhibitonFeeds();
