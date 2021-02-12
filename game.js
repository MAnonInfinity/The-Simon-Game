var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$("body").on("keypress", function(){
  if (started==false){
    $("#level-title").text("Level "+level);
    started=true;
    nextSequence();
  }
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randNumber=Math.floor(4*Math.random());
  var randChosenColor=buttonColors[randNumber];
  gamePattern.push(randChosenColor);
  console.log("Game Pattern : "+gamePattern);
  $("#"+randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randChosenColor);
}

$(".btn").on("click", function(){
  if (started==true){
    var userChosenColor=$(this).attr("id");
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log("User Pattern : "+userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("true");
    if (userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    startOver();
  }
}

function startOver(){
  $("#level-title").text("Game Over! Press A Key to Replay");
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();
  started=false;
  level=0;
  userClickedPattern=[];
  gamePattern=[];
}

function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color){
  $("#"+color).addClass("pressed");
  setTimeout(function() {
       $("#"+color).removeClass("pressed");
   }, 100);
}
