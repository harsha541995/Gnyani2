const express = require("express");
const app = express();

app.use(express.static(__dirname));



app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));


app.get("/", (req,res)=>{
res.sendFile(__dirname +"/home.html");
})

app.get("/AbouttheAuthor",
(req,res)=>{
    res.sendFile(__dirname +"/Pages/AboutAuthor/AboutAuthor.html");
    } )

    app.get("/WaveSimulation",
(req,res)=>{
    res.sendFile(__dirname +"/Pages/physics/Waves and Vibrations/Waves combination simulations/WaveSimulation.html");
    } )
