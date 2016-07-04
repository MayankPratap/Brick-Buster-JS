var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");

var x=canvas.width/2;
var y=canvas.height-80;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;  // Whether right control button is pressed
var leftPressed=false;  // Whether left control button is pressed
var ballRadius=10;
var brickRowCount=7;
var brickColumnCount=5;

var count=brickRowCount*brickColumnCount;
var rem=count;

var score = 0;
var lives = 3;  // How many lives player has to complete the game

var brickWidth=80;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=40;
var speedup1=0;
var speedup2=0;
var speedup3=0;
var speedup4=0;
var speedup5=0;
var speedup6=0;
var speedup7=0;

var bricks=[];
for(c=0;c<brickColumnCount;++c){

  bricks[c]=[];

  for(r=0;r<brickRowCount;++r){

    bricks[c][r]={x:0,y:0,status:1};

  }


}

var dx=3.5;
var dy=-3.5;

function drawBall(){

  ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.fillStyle="#0033FF";
  ctx.fillStroke="#0033FF";
  ctx.stroke="10";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){

  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle="#0095DD";
  ctx.fill();
  ctx.closePath();

}

function drawBricks(){

  for(c=0;c<brickColumnCount;++c){
    for(r=0;r<brickRowCount;++r){
       if(bricks[c][r].status==1){

         var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
         var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
         bricks[c][r].x=brickX;
         bricks[c][r].y=brickY;
         ctx.beginPath();
         ctx.rect(brickX,brickY,brickWidth,brickHeight);
         ctx.fillStyle="#0095DD";
         ctx.fill();
         ctx.closePath();

      }
    }
  }

}
function collisionDetection(){

  for(c=0;c<brickColumnCount;++c){

    for(r=0;r<brickRowCount;++r){

       var b=bricks[c][r];

       if(b.status==1){

          if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
             var snd=new Audio("./music/paddleBall.wav");
             snd.play();
             dy=-dy;
             b.status=0;
             score++;
             count--;
             /*** Change color of ball when it hits a brick ****/
             ctx.beginPath();
             ctx.arc(x,y,ballRadius,0,Math.PI*2);
             ctx.fillStyle="#FFD700";
             ctx.fillStroke="#FFD700";
             ctx.stroke="10";
             ctx.fill();
             ctx.closePath();
             /**************************************************/
             /*** If count of total bricks decreases to 30
                  Increase the speed of ball ***/
                  if(count<=(rem-rem/7) && speedup1==0){
                     if(dy<0)
                       dy-=0.5;
                     else
                       dy+=0.5;
                     if(dx<0)
                      dx-=0.5;
                     else
                       dx+=0.5;
                     paddleWidth+=2;
                     speedup1=1;
                  }
             /*** If count of total bricks decreases to 20
                  Increase the speed of ball and increase paddleWidth***/
                  if(count<=(rem-2*rem/7) && speedup2==0){
                     if(dy<0)
                       dy-=1;
                     else
                       dy+=1;
                     if(dx<0)
                       dx-=1;
                     else
                       dx+=1;


                     paddleWidth+=3;
                     speedup2=1;
                  }
             /*** If count of total bricks decreases to 10
                  Increase the speed of ball ******/
                  if(count<=(rem-3*rem/7) && speedup3==0){
                     if(dy<0)
                       dy-=1;
                     else
                       dy+=1;
                     if(dx<0)
                       dx-=1;
                     else
                       dx+=1;

                     paddleWidth+=4;
                     speedup3=1;
                  }

                  if(count<=(rem-4*rem/7) && speedup4==0){

                    if(dy<0)
                      dy-=1;
                    else
                      dy+=1;
                    if(dx<0)
                      dx-=1;
                    else
                      dx+=1;
                     paddleWidth+=5;
                     speedup4=1;

                  }

                  if(count<=(rem-5*rem/7) && speedup5==0){

                     if(dy<0)
                       dy-=1;
                     else
                      dy+=1;
                     if(dx<0)
                       dx-=1;
                     else
                      dx+=1;
                     paddleWidth+=6;
                     speedup5=1;

                  }

                  if(count<=(rem-6*rem/7) && speedup6==0){

                    if(dy<0)
                      dy-=1;
                    else
                      dy+=1;
                    if(dx<0)
                      dx-=1;
                    else
                      dx+=1;
                     paddleWidth+=7;
                     speedup6=1;

                  }



                  if(count<=0){

                     alert("You are awesome!!");
                     document.location.reload();
                  }
          }

      }

    }

  }

}

function drawScore(){

   ctx.font="16px Arial";
   ctx.fillStyle="#0095DD";
   ctx.fillText("Score: "+score,8,20);
//   console.log(parseInt(brickRowCount)*parseInt(brickColumnCount)-parseInt(count));

}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();

    collisionDetection();


    if(y+dy<ballRadius)
      dy=-dy;
    else if(y+dy>canvas.height-ballRadius){

       if(x>=paddleX && x<=paddleX+paddleWidth){

          var snd=new Audio("./music/paddleBall.wav");
          snd.play();
          dy=-dy;

       }
       else{
          lives--;
          if(!lives) {
            alert("GAME OVER!!");
            document.location.reload();
          }
          else{
            x=canvas.width/2;
            y = canvas.height-30;
            paddleWidth=80;
            rem=count;
            paddleX=(canvas.width-paddleWidth)/2;
           }
      }


    }
    else
      y+=dy;

    if(x+dx<ballRadius || x+dx>canvas.width-ballRadius)
       dx=-dx;
    else
       x+=dx;

    if(rightPressed && paddleX<canvas.width-paddleWidth)
       paddleX+=7;
    else if(leftPressed && paddleX>0)
       paddleX-=7;

    requestAnimationFrame(draw);

}

function keyDownHandler(e){

  if(e.keyCode==39)
    rightPressed=true;
  else if(e.keyCode==37)
    leftPressed=true;


}

function keyUpHandler(e){

   if(e.keyCode==39)
    rightPressed=false;
   if(e.keyCode==37)
     leftPressed=false;

}

function mouseMoveHandler(e){

  var relativeX=e.clientX-canvas.offsetLeft;

  if(relativeX>0 && relativeX<canvas.width){

     if((relativeX-paddleWidth/2>=0) && (relativeX-paddleWidth/2<=(canvas.width-paddleWidth)))
        paddleX=relativeX-paddleWidth/2;

  }


}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);


draw();
