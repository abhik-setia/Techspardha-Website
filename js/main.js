(function($){
    $(function(){
  
      $('.button-collapse').sideNav({
        closeOnClick:true
      });
      
    }); // end of document ready
  })(jQuery); // end of jQuery name space

  $('.carousel.carousel-slider').carousel({fullWidth: false,indicators:true,noWrap:false});
  $('.button-collapse').sideNav({
      closeOnClick: true
  });
  $('.collapse').sideNav({closeOnClick: true});
  
  $(document).ready(function(){
    setTimeout(changeSlide,5000);
    $(".dropdown-button").dropdown();
    $('.scrollspy').scrollSpy();
    $('ul.tabs').tabs({'swipeable':true});
    $('.scrollspy').scrollSpy({'scrollOffset':62});
    $('.events_tab').tabs({'swipeable':true});
          $('.modal').modal();
    $('.guest_lecture_image').hover(function(){
        $(this).css("box-shadow","0px 0px 10px 10px rgba(29, 253, 195, 0.8)");
    },function(){
         $(this).css("box-shadow","0px 0px 5px 5px rgba(29, 253, 195, 0.54)");
    });
    
    
   });

  function changeSlide(){
    $('.carousel.carousel-slider').carousel('next');  
    setTimeout(changeSlide,4000);
  }


var options = [
    {selector: '#section_aboutus', offset: 0, callback: function() {
        console.log("Scrolled");
    } },
    {selector: '#section_events', offset: 0, callback: function(){
        Materialize.toast("Add fade in animation!", 1500 );
    } },
  ];
Materialize.scrollFire(options);

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar_top_fixed");
var navbar_mob = document.getElementById("navbar_top_fixed_mobile");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;
var sticky_mob = navbar_mob.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }

  if (window.pageYOffset >= sticky_mob) {
    navbar_mob.classList.add("sticky")
  } else {
    navbar_mob.classList.remove("sticky");
  }

} 