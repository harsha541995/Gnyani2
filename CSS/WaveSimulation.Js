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
   
   displayequation.innerHTML= "Sin(4&pi;x)";
   
   
   let iterationCount = canvas.width/100;
   const H = canvas.width*0.005;
   const radius = H;
   let t = 0;
   let clickStatus;


   console.log(iterationCount);

   if ( Math.abs( iterationCount)<5){
    wavenumber.defaultValue=6;
   }

   
   class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = radius;  
    }
      drawArc(){
     
        ctx.save(); 
        ctx.translate(canvas.width/2, canvas.height/2);
       ctx.fillStyle= "white";
       ctx.beginPath();
       ctx.arc(this.x,this.y, radius,0,2*Math.PI);
       ctx.fill();
       ctx.restore();
      }   }

const point = new Point(-canvas.width/2, 100*Math.cos(10*((t)/50)))

let attributes = [];
let i=-1;

class Attributes{
    constructor(amplitude,angle,k,omega){
        this.amplitude = amplitude;
        this.angle = angle;
        this.k = k;
        this.omega = omega;  
    }
}



submit.addEventListener("click", ()=>{

    console.log("yes");


    const A = amplitude.value;
    const S = sine.checked
    const C = cosine.checked;
    const k = wavenumber.value;
    const w= omega.value;

    if(sine.checked){
        displayequation.innerHTML= `${A}Sin(${k}x+${w}&pi;t)`;
        attributes.push( new Attributes(A,"sine",k,w));
        i++;

    }
    else if(cosine.checked){
        displayequation.innerHTML= `${A}Cos(${k}x+${w}&pi;t)`;
        attributes.push( new Attributes(A,"cosine",k,w));
        i++;
             
    }
    console.log(attributes[i]);


})






setInterval(()=>{

ctx.clearRect(0,0,canvas.width, canvas.height);

ctx.strokeStyle = "#D9E4EC";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(0,canvas.height/2);
ctx.lineTo(canvas.width, canvas.height/2);
ctx.stroke();
 

if (attributes.length>0){

    if(attributes[i].angle=="sine"){
        point.y = (attributes[i].amplitude)*40*(Math.sin( (attributes[i].k)*0.005*point.x+ (1*((Math.PI/(width*8))*point.x*(attributes[i].omega)))));
        point.x = point.x+ iterationCount; 
        point.drawArc();  
        console.log(attributes[i].A);

    }else{

        point.y = attributes[i].amplitude*40*(Math.cos( attributes[i].k*0.005*point.x+ (1*((Math.PI/(width*8))*point.x*(attributes[i].omega)))));
        point.x = point.x+ iterationCount;
        point.drawArc();

    }

}
else{
   
    if (Math.abs( iterationCount)<5){

        point.y = 1*40*(Math.sin(0.005*6*point.x+(1*((Math.PI/(8*width))*point.x))));
        point.x = point.x+ iterationCount;
        point.drawArc(); 

    }else{

    point.y = 1*40*(Math.sin(0.005*point.x+(1*((Math.PI/(8*width))*point.x))));
    point.x = point.x+ iterationCount;
    point.drawArc(); 
    }   

}




  
    if(point.x>canvas.width/2 || point.x< -canvas.width/2){
        iterationCount = -iterationCount;
    }
     

    t++;



}, 50)




