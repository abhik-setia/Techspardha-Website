/**
 *  @author : abhishek goswami (hiro)
 *  @github : abhishekg785
 *
 *  main.js
 */

(function($, d, w) {
    var WindowInnerHeight,
        WindowInnerWidth,
        demoCanvas = $("#demo-canvas"),
        aboutUsLaptopWrap = $('.wrap'),
        aboutUsAppDevelopSectionWrapper = $('#app-develop-section .wrapper'),
        currentSelectedLink = $('#home_link'),
        menuColors = {
            'selectedItem' : 'rgb(255, 87, 34)',
            'deSelectedItem' : 'white'
        },
        currentSelectedSectionIndex = 0,
        currentSelectedSection = '#home-section';

    var _MainFunctions = {

        init : function() {
            _MainFunctions.scrollBodyTop(0);
            _MainFunctions.SelectMenuItem(currentSelectedLink);
        },

        /**
         * function resizes the background of the home page
         *  according to the window height and width
         */
        ResizeHomeBackgroundCanvas : function() {
            WindowInnerHeight = w.innerHeight;
            WindowInnerWidth = w.innerWidth;
            demoCanvas.css({
                'width' : WindowInnerWidth
            });
        },

        ResizeAboutUsSection : function() {
            if(w.innerWidth >= 960) {
                aboutUsLaptopWrap.css('transform', 'scale(1)');
            }
            if(w.innerWidth < 960 && w.innerWidth > 823) {
                aboutUsLaptopWrap.css('transform', 'scale(0.8)');
            }
        },

        ResizeAboutAppSection : function() {
            if(w.innerWidth >= 1330) {
                aboutUsAppDevelopSectionWrapper.css('transform', 'scale(0.6)');
            }
            else if(w.innerWidth < 1330 && w.innerWidth >= 1320) {
                aboutUsAppDevelopSectionWrapper.css('transform', 'scale(0.5)');
            }
            else if(w.innerWidth < 1320 && w.innerWidth > 1134 ) {
                aboutUsAppDevelopSectionWrapper.css('transform', 'scale(0.4)');
            }
        },

        SelectMenuItem : function(element) {
            $(element).css({
                'color' : menuColors.selectedItem
            });
        },

        DeSelectMenuItem : function(element) {
            $(element).css({
                'color' : menuColors.deSelectedItem
            });
        },

        scrollBodyTop : function(val) {
            $('html, body').animate({
                scrollTop : val
            }, 500);
        }
    }

    $(w).on('resize', function(d) {
        _MainFunctions.ResizeHomeBackgroundCanvas();
        _MainFunctions.ResizeAboutUsSection();
        _MainFunctions.ResizeAboutAppSection();
        $(w).scroll();  // to fix the problem occurs in the link selection due to scrolling
    });

    // for slow scrolling and selected menu item
    $(d).ready(function() {
        _MainFunctions.init();
        $('.nav-list a').click(function() {
            var clickedLinkSection = $(this).attr('href');
            if(!(currentSelectedSection == clickedLinkSection)) {
                _MainFunctions.DeSelectMenuItem(currentSelectedLink);
                _MainFunctions.SelectMenuItem($(this));
                _MainFunctions.scrollBodyTop($( $(this).attr('href') ).offset().top);
                currentSelectedSection = clickedLinkSection;
                currentSelectedLink = $(this);
            }
            return false;
        });

        // take user to the apply form
        $('#apply-button').on('click', function() {
            w.open('apply.html', '_blank');
        });

        // controlling the links according to the view the user is on
        $(w).scroll(function() {
            var index = $(w).scrollTop() / $(w).height(),
                errorFactor = 0.1,
                linkIndex = Math.floor(index + errorFactor);
            if(linkIndex == 2) {
                return;
            }
            else if(linkIndex > 2){
                linkIndex -= 1;
            }
            if(!(linkIndex == currentSelectedSectionIndex)) {
                var currentLink = $('.nav-list nav').children()[currentSelectedSectionIndex],
                    nextSectionLink = $('.nav-list nav').children()[linkIndex];
                $(currentLink).addClass('deactive-link');
                $(currentLink).removeClass('active-link');
                $(nextSectionLink).addClass('active-link');
                $(nextSectionLink).removeClass('deactive-link');
                currentSelectedSectionIndex = linkIndex;
                currentSelectedSection = $(nextSectionLink).attr('href');
                currentSelectedLink = nextSectionLink;
            }
        });
    });

})(jQuery, document, window);