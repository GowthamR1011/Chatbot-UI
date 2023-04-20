var express = require("express");
var path = require("path")
var app = express();
var bodyParser = require('body-parser');
var chat = require("./chat/chatbot")

//var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname,"..","frontend/my-app/dist")))
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json());

app.get("/home",function(req,res){
    //console.log("Request from ",req.headers.origin)
    res.send("Welcome to Home Page")
});


app.post("/api/chat", function(req,res){
    if(req.body.messageHistory){
        messageHistory = chat.chatMessageProcessor(req.body.messageHistory)
    }
    
    res.sendStatus(200)
})

app.listen(5000,()=>{
    console.log("Listening on Port 5000");
});

