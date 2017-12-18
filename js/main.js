(function($){
    $(function(){
  
      $('.button-collapse').sideNav();
      
    }); // end of document ready
  })(jQuery); // end of jQuery name space

  $('.carousel.carousel-slider').carousel({fullWidth: true,indicators:true,noWrap:false});
  
  $(document).ready(function(){
    setTimeout(changeSlide,5000);
    });

  function changeSlide(){
    $('.carousel.carousel-slider').carousel('next');  
    setTimeout(changeSlide,4000);
  }

  $(document).ready(function(){
    $('.events_tab').tabs({'swipeable':true});
  });
        