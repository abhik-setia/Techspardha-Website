$(function() {
  $('#overlay').removeClass('blur-in');
  $('.pop-up').hide();
 });

function blurin()
{
    $('.pop-up').fadeIn(300);
    $('#overlay').addClass('blur-in');
    $('#overlay').removeClass('blur-out');
}
function myfunc()
{
    console.log("Clicked");
}
$('.pop-up').click(function(event){
    e.stopPropagation();

$(window).click(function() {
                  $('.pop-up').fadeOut(300);
                  $('#overlay').removeClass('blur-in');
                  $('#overlay').addClass('blur-out');
                  e.stopPropagation();
            });
});