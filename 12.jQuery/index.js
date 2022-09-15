//  document.querySelector("button").style.color = "red"; //JavaScript
//$("h1").css("color", "yellow");    //jQuery

//  if JS and jQuery is placed in head section
// $(document).ready(function(){
//     $("h1").css("color", "red");
//   });

$("h1").addClass("big-title margin-50");
// $("h1").removeClass("big-title");

// $("h1").text("bye");
// $("button").text("Don't click me");
// $("button").html("<em>CLICK ME PLZ</em>"); //jQuery alternative of innerHTML

// $("h1").attr("href","https://www.bing.com/?FORM=Z9FD1");

// $("h1").click(function(){
//     $("h1").css("color", "purple");
// });

// Event Listener using javascript

// for(let i = 0; i<document.querySelectorAll("button").length;i++){
//     document.querySelectorAll("button")[i].addEventListener("click",function(){
//         document.querySelector("h1").style.color = "red";
//     });
// }

// Event listener using jQuery

// $("button").click(function(){
//     $("h1").css("color", "purple");
// });

// $("body").keypress(function(event){
//     console.log(event.key);
// });

// $("body").keypress(function(event){
//     $("h1").text(event.key);
// });

// $("h1").on("click", function(){
//     $("h1").css("color", "purple");
// });

// $("h1").before("<button>New</button>");


// $("button").remove();

$("body").on("keypress", function(){
    $("h1").slideUp().slideDown().animate({opacity:0.5});
});

