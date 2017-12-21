
//example api call

$(document).ready(function(){

    var items=[{
        "Name":"Satya Nadella",
        "Image_url":"images/guest lecture/lecture1.jpg",
        "Description":"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },{
        "Name":"Tanmay Bakshi",
        "Image_url":"images/guest lecture/lecture 2.jpg",
        "Description":"    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }];

    var placeholder=$("#placeholder_guest_lectures");
    var data="";
    $.each(items,function(index,item){
        
        data+='<div class="row center " id="guest_lecture_div"><div class="col l3 s12 center"><img src="'+item.Image_url+'" class="teal-shadow responsive-img circle guest_lecture_image"></div><div class="col l8 s12 offset-l1 left-align "><span class="flow-text lecture_description_text"><strong class="teal-text">'+item.Name+'</strong><br>'+item.Description+'</span></div></div><br>';
    });

    placeholder.append(data);


});