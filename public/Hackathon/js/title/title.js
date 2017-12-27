(function($, w, d) {
    $(d).ready(function() {
        $('.titleWrapper').addClass('ready');
        $('.titleWrapper h1').each(function() {
            var fullString;
            var characters = $(this).text().split("");
            $this = $(this);
            $this.empty();
            $.each(characters, function(i, el) {
                if(el == "") {
                    el = "&nbsp;"
                }
                $this.append("<span>" + el + "</span>");
            });
        });
    });
})(jQuery, window, document);