const canvas = document.querySelector("#landingPageCanvas");
const width = screen.width;
const height = screen.height;
const scale = window.devicePixelRatio; 
let lineWidth;



canvas.setAttribute("width",width);
canvas.setAttribute("height",height);
const ctx = canvas.getContext("2d");
const menuEscape = document.querySelector(".menu_escape");
const menu = document.querySelector("#menu_background");
const siteEntryButton = document.querySelector(".siteEntryButton");


siteEntryButton.addEventListener("click",()=>{

    menu.style.width ="200%";
    menu.style.height ="200%";
    console.log("click");
    
    })



menuEscape.addEventListener("click",()=>{

menu.style.width ="100px";
menu.style.height ="100px";
console.log("click");

})




let H = 0.005*width;
const Y = 0.005*height;
let ballArray = [];
let ballColor= "white";
let lineColor="";
let ballCount= 180;


let radius = 0.5*H;


    ballCount= 220;
    radius =1.25*H;
d1=15*H;
d2=5*H;
d3=2.5*H;
yOffset = 0.6;
ampRange =50;
// waveLength = ((Math.floor(100+200*Math.random()))*height/ballCount);
minAmp = 0;









// var grd = "#00579c";


var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);

grd.addColorStop(0, "#00579c");
grd.addColorStop(0.8, "#03acc1");


class Point{
    constructor(x,y){
this.x=x;
this.y=y;
// this.A =  minAmp + 130*Math.random();
// this.w= 0.0001*(1+Math.random());
// this.k= 2*Math.PI/waveLength;
this.size = (0.5+1*Math.random())*(radius);
this.velocityY = -1+ 2*Math.random();
this.ix;

}

drawArc( color ){
ctx.save();    
ctx.fillStyle= color;
ctx.beginPath();    
ctx.arc(this.x,this.y,this.size,0,2*Math.PI)
ctx.fill();
ctx.restore();

}

}


for(let i=0;i<ballCount;i++){

let y=i*height/ballCount;

    ballArray.push(new Point(0,y))

    let ball = ballArray[i];   
    ball.iy = y;
    ball.A =  minAmp + ampRange*Math.sin(i*(2*Math.PI/(ballCount/6)));
    ball.w= 0.0001*(1+Math.sin(i*(2*Math.PI/(ballCount/6))));
    ball.k= 2*Math.PI/((150+(Math.sin(i*(2*Math.PI/(ballCount/6))))*height/ballCount));



}



let t=0
setInterval(()=>{

    t=t+1;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);      

 


for(ball of ballArray){


    if(ball.y<height/3){
        ballColor ="#00bcd4";
    
           } else if(ball.y<2*height/3){
            ballColor = "#80deea";
        
           } else {
            ballColor = "white";
        
           }



    ball.y += ball.velocityY;
    ball.x = ball.A*Math.sin((ball.w*t)+ball.k*(ball.y-ball.iy)) +width*yOffset;
    
    ball.drawArc(ballColor);

if(ball.y<0 || ball.y>canvas.height ){

ball.velocityY = -ball.velocityY;    

}






}


for(i=0; i<ballArray.length;i++){
    let agent = ballArray[i];

    for( j=0;j<i;j++){
     let other = ballArray[j]

     let distance = Math.sqrt(Math.pow((agent.y-other.y),2)+Math.pow((agent.x-other.x),2));



     if(distance <= d1 ){
       
        if(distance>=d2){
            if(width>700){
            lineWidth = 0.1*radius;
            }else{
         lineWidth = 0.2*radius;}

 
        }else if(distance<d2&& distance>d3){
            if(width>700){
            lineWidth = 0.2*radius;
            }else{
         lineWidth = 0.3*radius;}


        }else if(distance<=d3){
            if(width>700){
            lineWidth = 0.3*radius;
            }else{
         lineWidth = 0.4*radius;}
 
        }


       if(ballArray[i].y<height/3){
     lineColor= "#00bcd4";

       } else if(ballArray[i].y<2*height/3){
      lineColor="#80deea";

       } else {
        lineColor= "white";
    
       }

            
        ctx.strokeStyle = lineColor; 
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(agent.x, agent.y);
        // ctx.bezierCurveTo(((agent.x+other.x)/2)+2 , ((agent.y+other.y)/2)+2, ((agent.x+other.x)/2)-2, ((agent.y+other.y)/2)-2, other.x,other.y);
        ctx.lineTo(other.x,other.y);
        ctx.stroke();

  
    

    
     }
    }
}
}
,50)
