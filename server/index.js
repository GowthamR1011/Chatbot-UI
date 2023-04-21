var express = require("express");
var path = require("path")
var app = express();
var bodyParser = require('body-parser');



app.use(express.static(path.join(__dirname,"..","frontend/my-app/dist")))
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json());

app.get("/home",function(req,res){

    res.send("Welcome to Home Page")
});


app.post("/api/newchat",function(req,res){
    console.log("New Chat API called")
    queryId = "abc"

    fetch("http://127.0.0.1:8000/newchat",{
        method:"POST",
        body:JSON.stringify({
            queryId:queryId,
            messageHistory:req.body.messageHistory
        }),
        headers:{
            "Content-type":"application/json; chatset=UTF-8"
        }
    })
    
    .then((reply) => reply.json())
    .then((newMessage) => res.send(newMessage))

    .catch(err => {
        console.log(err)
        res.send("Server Error",err)
    })

})



app.post("/api/chat", function(req,res){

        console.log("Request with Query ID: ",req.body.queryId);

        fetch("http://127.0.0.1:8000/chat",{
            method:"POST",
            body:JSON.stringify({
                queryId:"abc",
                messageHistory:req.body.messageHistory,
                prompt:req.body.prompt,
                topic:req.body.topic
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })

        .then((chatResp) => chatResp.json())
        .then((newMessage)=> {
            res.send(JSON.stringify({
                queryId:req.body.queryId,
                reply:newMessage.reply,
                prompt:newMessage.prompt,
                topic:newMessage.topic
            }))    
        })
        .catch(err => {
            console.log(err)
            res.send("Server Error",err)
        })

})

app.listen(5000,()=>{
    console.log("Listening on Port 5000");
});

