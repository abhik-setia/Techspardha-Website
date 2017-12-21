/**
 *  @author : abhishek goswami ( hiro )
 *  @github : abhishekg785
 *
 *  typing_effect.js : creates a typewriter effect
 */

(function($, w, d){

    function CreateTypingEffect(element, toRotateTextArr, period) {
        this.element = element;
        this.toRotateTextArr = toRotateTextArr;
        this.period = parseInt(period, 10) || 2000;
        this.loopNum = 0;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }

    CreateTypingEffect.prototype.tick = function() {
        var i = this.loopNum % this.toRotateTextArr.length;
        var fullText = this.toRotateTextArr[i];

        if(this.isDeleting) {
            this.txt = fullText.substring(0, this.txt.length - 1);
        }
        else {
            this.txt = fullText.substring(0, this.txt.length + 1);
        }
        this.element.innerHTML = '<span class = "typing-text">'+ this.txt + '</span>';
        var that = this;
        var delta = 200 - Math.random() * 100;
        if(this.isDeleting) {
            delta /= 2;
        }

        if(!this.isDeleting && this.txt === fullText) {
            delta = this.period;
            this.isDeleting = true;
        }
        else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    }

    $(w).on('load', function() {
        var textRotate = $('.txt-rotate');
        for(var i = 0 ; i < textRotate.length; i++) {
            var toRotateText = textRotate[i].getAttribute('data-rotate');
            var period = textRotate[i].getAttribute('data-period');
            if(toRotateText) {
                new CreateTypingEffect(textRotate[i], JSON.parse(toRotateText), period);
            }
        }

        // css for adding the blink
        var css = document.createElement('style');
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .typing-text { border-right : 0.08em solid white } ";
        document.body.appendChild(css);
    });

})(jQuery, window, document);