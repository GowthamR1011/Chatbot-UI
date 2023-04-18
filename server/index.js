var express = require("express");
var path = require("path")
var app = express();



app.use(express.static(path.join(__dirname,"..","frontend/my-app/dist")))


app.get("/home",function(req,res){
    //console.log("Request from ",req.headers.origin)
    res.send("Welcome to Home Page")
});

app.listen(5000,()=>{
    console.log("Listening on Port 5000");
});