$( "document" ).ready(function() {
    $("#title").animate({
        opacity:"1"
    }, 1000);
    $( "#line" ).animate({
        left: "53%",
        opacity:"1"
    }, 700, "easeOutCubic", function() {
    $("#line").animate({
        left:"46%"
    }, 300, "easeOutBack")
    // Animation complete.
    });
});

$(function(){
      $(".todo-input").typed({
        strings: ["Build feature", "Add animation", "Finish Studying"],
        typeSpeed: 20,
        loop:true
      });
  });

$('.todo-input').on('click', function(e){
        //pauseTimer();
        $(".todo-input").data('typed').pauseTyping();
        $( ".todo-input").val('');

    });