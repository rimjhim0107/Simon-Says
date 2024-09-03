let started = false;
let level = 0;

let userseq = [];
let gameseq = [];

let buttons = ["red","blue","green","yellow"];

$(document).keypress(function(){
    if(started==false){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){  //this step is done by game and at a time game just gives one button
    level++;
    userseq = [];
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = buttons[randomNumber];
    gameseq.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(color){
    let audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userseq.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAns(userseq.length-1);


});

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(()=>{
        $("#"+color).removeClass("pressed");
    },100);
}

function checkAns(currLevel){
    if(gameseq[currLevel]==userseq[currLevel]){
        if(userseq.length==gameseq.length){
           setTimeout(function(){
            nextSequence()
           },1000);
        } 
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gameseq = [];
    started = false;
}
