(function($){
    $(function(){
  
      $('.button-collapse').sideNav();
      
    }); // end of document ready
  })(jQuery); // end of jQuery name space

  $('.carousel.carousel-slider').carousel({fullWidth: true,indicators:true,noWrap:false});
  
  $(document).ready(function(){
    setTimeout(changeSlide,5000);
    $(".dropdown-button").dropdown();
    $('.scrollspy').scrollSpy();
   });

  function changeSlide(){
    $('.carousel.carousel-slider').carousel('next');  
    setTimeout(changeSlide,4000);
  }

  $(document).ready(function(){
    $('.events_tab').tabs({'swipeable':true});
  });
var options = [
    {selector: '#section_aboutus', offset: 0, callback: function() {
        console.log("Scrolled");
    } },
    {selector: '#section_events', offset: 0, callback: function(){
        Materialize.toast("Add fade in animation!", 1500 );
    } },
  ];
Materialize.scrollFire(options);