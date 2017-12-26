$(function() {
  $('#overlay').removeClass('blur-in');
 });

function blurin()
{
    $('.pop-up').css('visibility','visible');
    $('#close_popup').css('visibility','visible');
    $('.pop-up').fadeIn(300);
    $('#overlay').addClass('blur-in');
    $('#overlay').removeClass('blur-out');
    $('#close_popup').fadeIn(100);
}
function close_popup()
{
    $('.pop-up').fadeOut(300);
    $('#overlay').removeClass('blur-in');
    $('#overlay').addClass('blur-out');
    $('#close_popup').fadeOut(100);
}