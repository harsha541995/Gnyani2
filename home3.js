const canvas = document.querySelector("#landingPageCanvas");
const width = screen.width;
const height = screen.height;
const scale = window.devicePixelRatio; 
let lineWidth;



canvas.setAttribute("width",width);
canvas.setAttribute("height",height);
const ctx = canvas.getContext("2d");

let H = 0.005*width;
const Y = 0.005*height;
let ballArray = [];
let ballColor= "white";
let lineColor="";
let ballCount= 200;

let d1=15*H;
let d2=7*H;
let d3=3*H;

let radius = 0.5*H;

// if(width>700){
//     H=0.005*width;
//     ballCount= 250;
//     radius =0.5*H;
// d1=10*H;
// d2=5*H;
// d3=2.5*H;
// }








var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);

grd.addColorStop(0, "#00579c");
grd.addColorStop(0.8, "#03acc1");


class Point{
    constructor(x,y){
this.x=x;
this.y=y;
this.A = 10 + 10*Math.random();;
this.w= 0.0001*(1+Math.random());
this.k= 2*Math.PI/((Math.floor(50+100*Math.random()))*width/ballCount);
this.size = (0.5+1*Math.random())*(radius);
this.velocityX = -1+ 2*Math.random();
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

let x=i*width/ballCount;

    ballArray.push(new Point(x,0))

    let ball = ballArray[i];   
    ball.ix = x;


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



    ball.x += ball.velocityX;
    ball.y = ball.A*Math.sin((ball.w*t)+ball.k*(ball.x-ball.ix))  + ((ball.ix)/width)*(height);
    // ball.y = height/2- ball.A*10*Math.sin(ball.w*(ball.x-ball.ix));
    
    ball.drawArc(ballColor);

// if(ball.x<0 || ball.x>canvas.width){

// ball.velocityX = -ball.velocityX;    

// }


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











}
,50)
