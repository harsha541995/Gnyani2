const canvas = document.querySelector("#landingPageCanvas");
const width = screen.width;
const height = screen.height;

canvas.setAttribute("width",width);
canvas.setAttribute("height",height);
const ctx = canvas.getContext("2d");

const H = 0.005*width;
const Y = 0.005*height;
const radius = 2*H;
let ballArray = [];
const ballColor= '#BFBFFF';
let lineColor="";
const ballCount= 50;

var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
grd.addColorStop(0, "#4949FF");
grd.addColorStop(1, "#0000FF");



class Point{
    constructor(x,y,size){
        this.x=x;
        this.y=y;
        this.radius=size;
        this.color = ballColor;
        this.velocityX = -0.5 + 1*Math.random();;
        this.velocityY = -0.5 + 1*Math.random();;
        }
       drawArc(){
        ctx.save();
        ctx.fillStyle = this.color
        ctx.translate(this.x,this.y);
        ctx.beginPath()
        ctx.arc(0,0,this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.restore();

    }
}


for(i=0;i<ballCount;i++){

    let size = 1+Math.random()*radius;
    let x = size+ (width-size)*Math.random();
    let y = size+ (height-size)*Math.random();
 

    ballArray.push( new Point(x,y,size));
}



setInterval(()=>{

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);    

    
    for(i=0;i<ballArray.length;i++){
    
          if(ballArray[i].x<=0 || ballArray[i].x>=canvas.width){
            ballArray[i].velocityX = -1*ballArray[i].velocityX;
        }
     
        if(ballArray[i].y<=0 || ballArray[i].y>=canvas.height){
            ballArray[i].velocityY = -1*ballArray[i].velocityY;
        }  
    
    
        ballArray[i].x += ballArray[i].velocityX;  
        ballArray[i].y += ballArray[i].velocityY;  
        ballArray[i].drawArc();    
    
    }
    
    for(i=0; i<ballArray.length;i++){
        let agent = ballArray[i];
    
        for( j=0;j<i;j++){
         let other = ballArray[j]
    
         let distance = Math.sqrt(Math.pow((agent.x-other.x),2)+Math.pow((agent.y-other.y),2));
    
         if(distance <= 25*H){
           
           if(distance>=18.75*H){
            ctx.lineWidth = 0.2*radius;
            lineColor ="#7879FF";
    
           }else if(distance<18.75*H && distance>12.5*H){
            ctx.lineWidth = 0.3*radius;
            lineColor ="#A3A3FF";
    
           }else if(distance<=12.5*H){
            ctx.lineWidth = 0.4*radius;
            lineColor ="#BFBFFF";
    
           }
                
            ctx.strokeStyle = lineColor; 
            ctx.beginPath();
            ctx.moveTo(agent.x, agent.y);
            ctx.lineTo(other.x,other.y);
            ctx.stroke();
        
         }
        }
    }
    }
    ,33)
    