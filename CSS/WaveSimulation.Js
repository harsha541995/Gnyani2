const canvas = document.querySelector("#wave_canvas");
const container = document.querySelector(".wave");
const ctx = canvas.getContext("2d");

const width = container.clientWidth;
const height = container.clientHeight;

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);


const amplitude = document.querySelector("#amplitude");
const sine = document.querySelector("#sine");
const cosine = document.querySelector("#cosine");
const wavenumber = document.querySelector("#wavenumber");
const omega = document.querySelector("#omega");
const submit = document.querySelector(".submit");
const displayequation = document.querySelector(".displayequation");

displayequation.innerHTML= "Sin(x + t)";


let iterationCount = canvas.width/50;
const H = canvas.width*0.005;
let t = 0;
let clickStatus;
let lineWidth;
let radius;
let AmplitudeMultiplicationFactor;
let FrequencyMultiplicationFactor = 20;

if ( Math.abs( iterationCount)<5){
 wavenumber.defaultValue=6;
}


if(screen.width>700){

    lineWidth=3;
    radius = 1.5*H;
    AmplitudeMultiplicationFactor = 40;

}
else{
    lineWidth=2;
    radius = 3*H;
    AmplitudeMultiplicationFactor = 20;


}

let A = AmplitudeMultiplicationFactor*amplitude.value;
let S = sine.checked;
let C = cosine.checked;
let k = wavenumber.value;
let w= omega.value/FrequencyMultiplicationFactor;



class Point{
 constructor(x,y){
     this.x = x;
     this.y = y;
     this.radius = radius;  
     this.absx = x;
 }
   drawArc(){
  
     ctx.save(); 
     ctx.translate(canvas.width/2, canvas.height/2);
     ctx.strokeStyle= "#00579c";
     ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(this.x,this.y, radius,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();
   }   }

   const points = [];
  

for(let i=0;i<iterationCount+1;i++){

 points.push(new Point( (canvas.width/iterationCount)*i -(canvas.width/2), canvas.height/2));

}




submit.addEventListener("click", ()=>{

 A = AmplitudeMultiplicationFactor*amplitude.value;
 S = sine.checked;
 C = cosine.checked;
 k = wavenumber.value;
 w= omega.value/FrequencyMultiplicationFactor;

 if(S){
    displayequation.innerHTML= `${A/AmplitudeMultiplicationFactor}Sin(${k}x+${w*FrequencyMultiplicationFactor}t)`;

}
else{
    displayequation.innerHTML= `${A/AmplitudeMultiplicationFactor}Cos(${k}x+${w*FrequencyMultiplicationFactor}t)`;
         
}


})






setInterval(()=>{

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = "#D9E4EC";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    
    for(point of points){
    
    if(S){
    
    point.y = A*Math.sin(k*point.x - w*t) 
    
    }else{
    
        point.y =A*Math.cos(k*point.x - w*t) 
    
    }
    
point.drawArc();

    
    }
    
    
    
    t++;
    
    
    }, 50)




const canvas = document.querySelector("#wave_canvas");
const container = document.querySelector(".wave");
const ctx = canvas.getContext("2d");

const width = container.clientWidth;
const height = container.clientHeight;

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);


const amplitude = document.querySelector("#amplitude");
const sine = document.querySelector("#sine");
const cosine = document.querySelector("#cosine");
const wavenumber = document.querySelector("#wavenumber");
const omega = document.querySelector("#omega");
const submit = document.querySelector(".submit");
const displayequation = document.querySelector(".displayequation");

displayequation.innerHTML= "Sin(x + t)";


let iterationCount = canvas.width/50;
const H = canvas.width*0.005;
let t = 0;
let clickStatus;
let lineWidth;
let radius;
let AmplitudeMultiplicationFactor;
let FrequencyMultiplicationFactor = 20;

if ( Math.abs( iterationCount)<5){
 wavenumber.defaultValue=6;
}


if(screen.width>700){

    lineWidth=3;
    radius = 1.5*H;
    AmplitudeMultiplicationFactor = 40;

}
else{
    lineWidth=2;
    radius = 3*H;
    AmplitudeMultiplicationFactor = 20;


}

let A = AmplitudeMultiplicationFactor*amplitude.value;
let S = sine.checked;
let C = cosine.checked;
let k = wavenumber.value;
let w= omega.value/FrequencyMultiplicationFactor;



class Point{
 constructor(x,y){
     this.x = x;
     this.y = y;
     this.radius = radius;  
     this.absx = x;
 }
   drawArc(){
  
     ctx.save(); 
     ctx.translate(canvas.width/2, canvas.height/2);
     ctx.strokeStyle= "#00579c";
     ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(this.x,this.y, radius,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();
   }   }

   const points = [];
  

for(let i=0;i<iterationCount+1;i++){

 points.push(new Point( (canvas.width/iterationCount)*i -(canvas.width/2), canvas.height/2));

}




submit.addEventListener("click", ()=>{

 A = AmplitudeMultiplicationFactor*amplitude.value;
 S = sine.checked;
 C = cosine.checked;
 k = wavenumber.value;
 w= omega.value/FrequencyMultiplicationFactor;

 if(S){
    displayequation.innerHTML= `${A/AmplitudeMultiplicationFactor}Sin(${k}x+${w*FrequencyMultiplicationFactor}t)`;

}
else{
    displayequation.innerHTML= `${A/AmplitudeMultiplicationFactor}Cos(${k}x+${w*FrequencyMultiplicationFactor}t)`;
         
}


})






setInterval(()=>{

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = "#D9E4EC";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    
    for(point of points){
    
    if(S){
    
    point.y = A*Math.sin(k*point.x - w*t) 
    
    }else{
    
        point.y =A*Math.cos(k*point.x - w*t) 
    
    }
    
point.drawArc();

    
    }
    
    
    
    t++;
    
    
    }, 50)




