/**
 * @author : rishabh chanana
 *
 */

var toggle = 0;
function answer(card) {
    if(toggle == 0 ) {
        toggle = 1;
        switch (card) {

            case 1:
                $('#q1').animate( { opacity : '0' }, 400, function(){
                    //answer in double quotes
                    $(this).html("A Hackathon is an event that brings together computer programmers like software developers, graphic designers and user interface specialists or professionals to identify issues and create software solutions.").animate({'opacity': 1}, 400);
                });
                break;

            case 2:
                $('#q2').animate( { opacity : '0' }, 400, function(){
                    $(this).html("If you are enrolled in a high school or university, you are good to go!!").animate({'opacity': 1}, 400);
                });
                break;

            case 3:
                $('#q3').animate( { opacity : '0' }, 400, function(){
                    $(this).html("Your basic tools - Laptop and Charger. If you want to hack on Arduino, PI, Oculus Rift or any other hardware we recommend you to bring that too if you have one. You won't need food or drinks; we've got you covered there.").animate({'opacity': 1}, 400);
                });
                break;

            case 4:
                $('#q4').animate( { opacity : '0' }, 400, function(){
                    $(this).html("You can make anything you like. Most of the hacks revolve around web or phone apps, or working with hardware.").animate({'opacity': 1}, 400);
                });
                break;

            case 5:
                $('#q5').animate( { opacity : '0' }, 400, function(){
                    $(this).html("Once you apply, we will be informing you regarding the shortlisting and further details.").animate({'opacity': 1}, 400);
                });
                break;

            case 6:
                $('#q6').animate( { opacity : '0' }, 400, function(){
                    $(this).html("\"Have the passion, take the action and magic will happen !\"<br/> We don't care if you it's your first or sixteenth, show us what excites you or what drives you to start or develop  real life application.").animate({'opacity': 1}, 400);
                });
                break;

            case 7:
                $('#q7').animate( { opacity : '0' }, 400, function(){
                    $(this).html("Zero! we won't charge a penny.").animate({'opacity': 1}, 400);
                });
                break;

            case 8:
                $('#q8').animate( { opacity : '0' }, 400, function(){
                    $(this).html("Yes! you can register as a team with a max of 3 members.").animate({'opacity': 1}, 400);
                });
                break;
        }

    }

}
function question(card) {
    if(toggle == 1) {
        toggle = 0;

        switch (card) {

            case 1:
                $('#q1').animate( { opacity : '0' }, 400, function(){
                    // question in double quotes
                    $(this).html("What is a Hackathon ?").animate({'opacity': 1}, 400);
                });
                break;

            case 2:
                $('#q2').animate( { opacity : '0' }, 400, function(){
                    $(this).html("Who can apply?").animate({'opacity': 1}, 400);
                });
                break;

            case 3:
                $('#q3').animate( { opacity : '0' }, 400, function(){
                    $(this).html("What should I bring?").animate({'opacity': 1}, 400);
                });
                break;

            case 4:
                $('#q4').animate( { opacity : '0' }, 400, function(){
                    $(this).html("What do people normally make?").animate({'opacity': 1}, 400);
                });
                break;

            case 5:
                $('#q5').animate( { opacity : '0' }, 400, function(){
                    $(this).html("How and when will I hear back?").animate({'opacity': 1}, 400);
                });
                break;

            case 6:
                $('#q6').animate( { opacity : '0' }, 400, function(){
                    $(this).html("What are you looking for in an application?").animate({'opacity': 1}, 400);
                });
                break;

            case 7:
                $('#q7').animate( { opacity : '0' }, 400, function(){
                    $(this).html("How much does it cost to attend?").animate({'opacity': 1}, 400);
                });
                break;

            case 8:
                $('#q8').animate( { opacity : '0' }, 400, function(){
                    $(this).html("Can we apply as a team?").animate({'opacity': 1}, 400);
                });
                break;
        }
    }
}