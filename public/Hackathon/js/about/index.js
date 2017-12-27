/**
 *  @author : abhishek goswami ( hiro )
 *  abhishekg785@gmail.com
 *
 *  about/index.js : created the mobile, tablet, laptop transition
 */

(function($, w, d) {

    var classes = ["mobile", "tablet", "laptop"];
    var i = 0;

    $('#morph').addClass(classes[i]);
    i++;

    function morph() {
        $('#morph').removeClass();
        $('#morph').addClass(classes[i]);
        if (i > classes.length - 2){
            i = 0;
        } else {
            i++;
        };
    };

    setInterval(morph, 2000);

})(jQuery, window, document);