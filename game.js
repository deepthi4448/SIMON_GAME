var buttonColor = ["red", "blue", "green", "yellow"];

var gamepattern = []; //it store the pattern of the game

var userClickedPattern = []; //it store the pattern of the user

var started = false; //it is used to check whether the game has started or not

var level = 0; //it is used to store the level of the game

$(document).keypress(function() { //it is used to check whether the game has started or not
    if(!started) {
        $("#level-title").text("Level " + level); //it is used to display the level of the game
        started = true; //it is used to set the started variable to true
    }
});

$(".btn").click(function () {
    var userchosencolor = $(this).attr("id"); //it is used to get the id of the button which is clicked by the user
    userClickedPattern.push(userchosencolor); //it is used to store the id of the button which is clicked by the user

    playSound(userchosencolor); //it is used to play the sound of the button which is clicked by the user
    animatePress(userchosencolor); //it is used to animate the button which is clicked by the user
    checkAnswer(userClickedPattern.length - 1); //it is used to check the answer of the user
});

function checkAnswer(currentLevel) { //it is used to check the answer of the user
    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) { //it is used to check whether the answer of the user is correct or not
        if (userClickedPattern.length === gamepattern.length) { //it is used to check whether the user has completed the pattern or not
            setTimeout(function () { //it is used to call the nextSequence function after 1 second
                nextSequence(); //it is used to call the nextSequence function
            }, 1000);
        }
    }
    else { //it is used to check whether the answer of the user is wrong or not
        playSound("wrong"); //it is used to play the sound of the wrong answer
        $("body").addClass("game-over"); //it is used to add the class game-over to the body
        $("#level-title").text("Game Over, Press Any Key to Restart"); //it is used to display the game over message
        setTimeout(function () { //it is used to remove the class game-over from the body after 200 milliseconds
            $("body").removeClass("game-over"); //it is used to remove the class game-over from the body
        }, 200);    

        startOver(); //it is used to call the startOver function
    }
}

function nextSequence() { //it is used to generate the next sequence of the game
    userClickedPattern = []; //it is used to reset the userClickedPattern array
    level++; //it is used to increment the level of the game
    $("#level-title").text("Level " + level); //it is used to display the level of the game

    var randomNumber = Math.floor(Math.random() * 4); //it is used to generate a random number between 0 and 3
    var randomChosenColor = buttonColor[randomNumber];
    gamepattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //it is used to animate the button which is clicked by the user
    playSound(randomChosenColor); //it is used to play the sound of the button which is clicked by the user
}       

function playSound(name) { //it is used to play the sound of the button which is clicked by the user    
        $("#" + currentColor).addClass("pressed"); //it is used to add the class pressed to the button which is clicked by the user
        setTimeout(function () { //it is used to remove the class pressed from the button which is clicked by the user after 100 milliseconds
            $("#" + currentColor).removeClass("pressed"); //it is used to remove the class pressed from the button which is clicked by the user
        }, 100);
}   

function playSound(name) { //it is used to play the sound of the button which is clicked by the user
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() { //it is used to reset the game
    level = 0; //it is used to reset the level of the game
    gamepattern = [];
    started = false; //it is used to reset the started variable to false
}