var isPlaying = false;
var score;
var trialsLeft;
var action;
var level = 1;
var homies = ['diep1', 'diep2', 'khang', 'minh', 'nghia', 'nhan1', 'nhan2', 'tony1', 'tony2', 'ty', 'vincent1', 'vu1', 'vu2', 'vuty'];
// Click on start reset button

function removeActive() {
    $(".level").removeClass("active");
}
$("#easy").click(function(){
  level = 1;
  removeActive();
  $(this).addClass("active");
});
$("#medium").click(function(){
  level = 5;
  removeActive();
  $(this).addClass("active");
});
$("#hard").click(function(){
  level = 10;
  removeActive();
  $(this).addClass("active");
});

$("#startreset").click(function(){
  if(isPlaying == true){
    // reload page
    location.reload();
  } else {
    // we are not playing (isPlaying false)
    stopAudio();
    isPlaying = true; // game initiated
    score = 0; // set score to value
    $("#scorevalue").html(score);

    // show trials Left
    $("#trialsLeft").show();
    trialsLeft = 3;
    addHearts();

    // hide gameover box
    $("#gameOver").hide();

    // change button text to reset game
    $("#startreset").html("RESET GAME");

    // start sending fruits
    startAction();
  }
});

$("#fruit1").mouseover(function(){
  score++;
  $("#scorevalue").html(score); // update score
  $("#slicesound")[0].play(); // play sound

  // stop fruit
  clearInterval(action);
  // hide fruit via animation
  $("#fruit1").hide("explode"); // sclicing fruit
  // $("#fruit1").hide("explode", 500); // sclicing fruit

  // send new fruit
  setTimeout(startAction, 500);


});

function addHearts(){
  $("#trialsLeft").empty();
  for (var i = 0; i < trialsLeft; i++) {
    $("#trialsLeft").append('<img src="homies/heart.png" class="life" alt="heart">');
  }
}

//start sending Fruits
function startAction(){
  $("#fruit1").show();
  $(".intro").hide();
  chooseFruit(); // choose a randome fruit
  $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});

  // generate a random step
  step = level + Math.round(5*Math.random());

  // Move fruit down by one step every 10ms
  action = setInterval(function(){
    $("#fruit1").css('top', $("#fruit1").position().top + step); // move fruit by one step

    // check if the fruit is too low
    if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
      // check if we have trials left
      if (trialsLeft > 1) {
        $("#fruit1").show();
        chooseFruit(); // choose a randome fruit
        $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});

        // generate a random step
        step = 1 + Math.round(5*Math.random());
        // reduce trials by one
        trialsLeft--;

        // populate box with heart
        addHearts();

      } else {
        // game over
        isPlaying = false; // no longer playing
        $("#startreset").html("START GAME"); // change button to start game
        $("#gameOver").show();
        $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
        $("#trialsLeft").hide();
        stopAction();
        $("#hahaha")[0].play(); // play sound
      }
    }

  }, 10); // function works in every 10ms
}

$("#gameOver").click(function(){
  location.reload();
});

function stopAudio(){
  $("audio").each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
  }); 
}

function chooseFruit(){
  $("#fruit1").attr('src', 'homies/pics/' + homies[Math.round(13*Math.random())] + '.png');
}

//stop dropping fruits
function stopAction(){
  clearInterval(action);
  $("#fruit1").hide();
  
}
