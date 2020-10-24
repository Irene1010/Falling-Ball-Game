var both=0;
var interval;
var counter=0;
var currentblocks=[];

function moveLeft(){
  var ball=document.getElementById("ball");
  let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
  if(ballLeft>0){
    ball.style.left=(ballLeft-2)+"px";
  }
}

function moveRight(){
  var ball=document.getElementById("ball");
  let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
  if(ballLeft<380){
    ball.style.left=(ballLeft+2)+"px";
  }
}

document.addEventListener("keydown", event=>{
  if(both==0){
    both++;
    if(event.keyCode==37){
      interval = setInterval(moveLeft, 1);
    }else if (event.keyCode==39) {
      interval = setInterval(moveRight, 1);
    }
  }
})

document.addEventListener("keyup", event=>{
  clearInterval(interval);
  both=0;
})

var blocks = setInterval(function(){
  var game = document.getElementById("game");
  var ball=document.getElementById("ball");
  var lastBlock = document.getElementById("block"+(counter-1));
  var lastHole = document.getElementById("hole"+(counter-1));
  if(counter>0){
    var lastBlockTop = parseInt(window.getComputedStyle(lastBlock).getPropertyValue("top"));
    var lastHoleTop = parseInt(window.getComputedStyle(lastHole).getPropertyValue("top"));
  }
  if(lastBlockTop<600 || counter==0){
    var block = document.createElement("div");
    var hole = document.createElement("div");
    block.setAttribute("class", "block");
    hole.setAttribute("class", "hole");
    block.setAttribute("id", "block"+counter);
    hole.setAttribute("id", "hole"+counter);
    block.style.top=lastBlockTop+100+"px";
    hole.style.top=lastHoleTop+100+"px";
    var random=Math.floor(Math.random()*360);
    hole.style.left=random+"px";
    game.appendChild(block);
    game.appendChild(hole);
    currentblocks.push(counter);
    counter++;
  }

  var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
  var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
  var drop = 0;
  if(ballTop<=0){
    alert("GAME OVER. SCORE: "+(counter-13));
    clearInterval(blocks);
    location.reload();
  }

  for(var i=0; i<currentblocks.length; i++){
    let current = currentblocks[i];
    let iblock = document.getElementById("block"+current);
    let ihole = document.getElementById("hole"+current);
    let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
    let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

    iblock.style.top = iblockTop-0.5+"px";
    ihole.style.top = iblockTop-0.5+"px";

    if(iblockTop<-20){
      currentblocks.shift();
      iblock.remove();
      ihole.remove();
    }

    if(iblockTop-40<ballTop && iblockTop>ballTop){
      drop++;
      if(iholeLeft<=ballLeft && iholeLeft+40>=ballLeft){
        drop=0;
      }
    }
  }
  if(drop==0){
    if(ballTop<680){
      ball.style.top = ballTop + 2 + "px";
    }
  }else{
    ball.style.top = ballTop - 0.5 + "px";
  }
}, 1);
