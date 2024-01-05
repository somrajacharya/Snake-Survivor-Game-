let inputDir={x:0 ,y:0};
let foodsound=new Audio('food.mp3');
let gameoversound=new Audio('gameover.mp3');
let movesound=new Audio('move.mp3');
let musicsound=new Audio('Theme.mp3');
let speed=9;
let score=0;
let lastPaintTime=0;
let snakearr=[
    {x:13,y:15}
]
food={x:6,y:7};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if youcollide with your self
    for(let i=1;i<snakearr.length;i++){
        if(snake[i].x===snake[0].x  && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0  || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    
}
function gameEngine(){
    //part1::Updating the snake array

    if(isCollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0 ,y:0};
        alert("Game Over .Press any key to play again");
        snakearr=[{x:13,y:15}];
        musicsound.play();
        score=0;
        
    }
    //if you had eaten the food then regenerate the food and increment the score
    if(snakearr[0].y===food.y  &&  snakearr[0].x===food.x){
        foodsound.play();
        snakearr.unshift({x:snakearr[0].x + inputDir.x,y:snakearr[0].y + inputDir.y});
        let a= 2;
        let b= 16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
        score+=1;
        scoreBox.innerHTML="Score: "+score;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML="High Score: "+hiscoreval;

        }
    }  
    //moving the snake
    for(let i=snakearr.length-2;i>=0;i--){
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;



    //part2:: Display the snake and food
    //Display the snake
    board.innerHTML="";
    snakearr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    })
    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
musicsound.play();
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreBox.innerHTML="High Score: "+hiscore;
    hiscoreval=JSON.parse(hiscore);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//Start the game
    musicsound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inuptDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowLeft");
            inputDir.x= 1;
            inputDir.y= 0;

            break;
    }
});
