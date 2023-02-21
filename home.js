const canvas = document.querySelector("#landingPageCanvas");
const width = screen.width;
const height = screen.height;

canvas.setAttribute("width",width);
canvas.setAttribute("height",height);
const ctx = canvas.getContext("2d");

let H = 0.005*width;
const Y = 0.005*height;
let ballArray = [];
// const ballColor= '#BFBFFF';
// let ballColor = '#e6f8fb';
let ballColor;
let lineColor="";
let ballCount= 300;

let d1=40*H;
let d2=20*H;
let d3=10*H;

let radius = 0.5*H;

if(width>700){
    H=0.005*width;
    ballCount= 250;
    radius =0.5*H;
    // d1=80*H;
    // d2=40*H;
    // d3=20*H;
d1=20*H;
d2=10*H;
d3=5*H;
}








var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
// grd.addColorStop(0, "#4949FF");
// grd.addColorStop(1, "#0000FF");

grd.addColorStop(0, "#00579c");
grd.addColorStop(0.8, "#03acc1");


class Point{
    constructor(x,y,size){
        this.x=x;
        this.y=y;
        this.radius=size;
        this.velocityX = -0.5 + 1*Math.random();;
        this.velocityY = -0.5 + 1*Math.random();;
        }
       drawArc(ballColor){
        ctx.save();
        ctx.fillStyle = ballColor;
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

        if(ballArray[i].y<height/3){
            // ballColor = "#99e4ee";
        ballColor ="#00bcd4";

           } else if(ballArray[i].y<2*height/3){
            // ballColor = "#b3ebf2";
            ballColor = "#80deea";
        
           } else {
            ballColor = "white";
        
           }



        ballArray[i].drawArc(ballColor);    
    
    }
    
    for(i=0; i<ballArray.length;i++){
        let agent = ballArray[i];
    
        for( j=0;j<i;j++){
         let other = ballArray[j]
    
         let distance = Math.sqrt(Math.pow((agent.x-other.x),2)+Math.pow((agent.y-other.y),2));
    
         
 

         if(distance <= d1){
           
           if(distance>=d2){
               if(width>700){
               ctx.lineWidth = 0.1*radius;
               }else{
            ctx.lineWidth = 0.2*radius;}

    
           }else if(distance<d2&& distance>d3){
               if(width>700){
               ctx.lineWidth = 0.2*radius;
               }else{
            ctx.lineWidth = 0.3*radius;}


           }else if(distance<=d3){
               if(width>700){
               ctx.lineWidth = 0.3*radius;
               }else{
            ctx.lineWidth = 0.4*radius;}
    
           }


           if(ballArray[i].y<height/3){
            // lineColor="#99e4ee";
         lineColor= "#00bcd4";

           } else if(ballArray[i].y<2*height/3){
            // lineColor="#b3ebf2";
          lineColor="#80deea";

           } else {
            lineColor= "white";
        
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
    
