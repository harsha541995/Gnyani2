const canvas = document.querySelector("#landingPageCanvas");
const width = screen.width;
const height = screen.height;
const slope = height/width;
const H = 0.005*width;
const Y = 0.005*height;
const diagnol = Math.sqrt(Math.pow(width,2)+Math.pow(height,2))

canvas.setAttribute("width",width);
canvas.setAttribute("height",height);
const ctx = canvas.getContext("2d");


let ballArray = [];
let ballColor;
let lineColor="";
let ballCount= 400;
let lineWidth;


radius =0.6*H;

d1=8*H;
d2=4*H;
d3=2*H;

var grd = "#00579c"


class Point{
    constructor(x,y,size){
        this.x=x;
        this.y=y;
        this.radius=size;
        this.iy=0;
        this.ix=0;
        this.A= 20 +100*Math.random();
        this.w = 0.005+ 0.005*Math.random();
        this.k = (2*Math.PI)/((diagnol/ballCount)*(50+50*Math.random()));
   
        this.velocityX = -0.5+Math.random();

        }
       drawArc(ballColor){
        ctx.fillStyle = ballColor;
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius, 0, 2*Math.PI);
        ctx.fill();

    }
}

let x;
let y;

for(let i=0;i<ballCount;i++){

    let size = 0.5+Math.random()*radius;
 
    x = size+ (i*width)/ballCount;
    y = size+ (i*height)/ballCount;
      

    ballArray.push( new Point(x,y,size));
    ballArray[i].iy = y;
    ballArray[i].ix = x;

}

let t=0;

setInterval(()=>{
    
ctx.clearRect(0,0,width,height);
    
ctx.fillStyle = grd;    
ctx.fillRect(0,0,width,height);
ctx.fill();


for(ball of ballArray){

if(ball.y<-slope*ball.x || ball.y >slope*ball.x+diagnol){

   ball.velocityX = -ball.velocityX; 

}

   ball.x += ball.velocityX; 
ball.y = ball.A*Math.sin(ball.w*t-ball.k*(ball.x-ball.ix)) + ball.x*slope;  

if(ball.y<height/3){
ballColor ="#00bcd4";

   } else if(ball.y<2*height/3){
    ballColor = "#80deea";

   } else {
    ballColor = "white";

   }


    ball.drawArc(ballColor);
}



for(i=0; i<ballArray.length;i++){
    let agent = ballArray[i];

    for( j=0;j<i;j++){
     let other = ballArray[j]

     let distance = Math.sqrt(Math.pow((agent.x-other.x),2)+Math.pow((agent.y-other.y),2));



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
        ctx.lineTo(other.x,other.y);
        ctx.stroke();

     }
    }
}












t=t+1;


},50)
