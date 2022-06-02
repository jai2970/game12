 var userClickedPattern=[];
var gamePattern =[];

var buttonColours =["red", "blue", "green", "yellow"];


var started = false;
var level = 0 ;




$(document).on("keydown" , function(){

if(!started){

  $("#level-title").text("Level "+ level);
  nextSequence();
  started= true;

}
});

// now if a button is clicked we store the id of that button in userChosenColour
//suppose red is stored  now we push red into the empty stack

$(".btn").on("click" , function(){


    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel){

 if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

 if(userClickedPattern.length  ===  gamePattern.length ){

   setTimeout(function(){
     nextSequence();
   },1000);
 }
}
 else
 {

      playSound("wrong");

 $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
 }

}


function startOver(){
  level =0;
  gamePattern=[];
  started = false;

}

function nextSequence() {

 userClickedPattern = [] ;
level++;
$("#level-title").text("Level " +level);




 // a random number  from 0 1 2 3
var randomNumber = Math.floor(Math.random()*4);

// arr[randomNumber] which will give us either of red blue green yellow
var randomChosenColour = buttonColours[randomNumber];

// now one of the colors is stored in gamePattern array
gamePattern.push(randomChosenColour);

// accessing a random color and then selecting a button with same id
 $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

 // now the button which we have selected should play a sound and sound name should be
playSound(randomChosenColour);

}


function  playSound(name) {
  var chosenColorSound  = new Audio("sounds/"+name+'.mp3');
  chosenColorSound.play();
}



function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");

  },100)
}
