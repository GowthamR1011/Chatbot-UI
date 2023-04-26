var express = require("express");
var path = require("path")
var app = express();
var bodyParser = require('body-parser');
var CHAT_SERVER = require("./data/data").CHAT_SERVER
var DATABASE_SERVER = require("./data/data").DATABASE_SERVER
const generateUniqueId = require("generate-unique-id");

app.use(express.static(path.join(__dirname,"..","frontend/my-app/dist")))
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json());
//console.log(DATABASE_SERVER)
app.get("/home",function(req,res){

    res.send("Welcome to Home Page")
});


app.post("/api/newchat",function(req,res){
    console.log("New Chat API called")
    newid=generateUniqueId()
    //queryId = "xyz"



    fetch(CHAT_SERVER.newChatAPI,{
        method:"POST",
        body:JSON.stringify({
            queryId:newid,
            messageHistory:req.body.messageHistory
        }),
        headers:{
            "Content-type":"application/json; chatset=UTF-8"
        }
    })
    
    .then((reply) => reply.json())
    .then((newMessage) => {
        fetch(DATABASE_SERVER.POST_PROMPT,{
            method:"POST",
            body:JSON.stringify({
                id:newid,
                //queryId:queryId,
                prompt:newMessage.prompt,
                topic:newMessage.topic
                
            }),
            headers:{
                "Content-type":"application/json; chatset=UTF-8"
            }
            

        })
        .then(postReply => {
            console.log("POST REQUEST Successful")
            res.send({queryId:newid,
                reply:newMessage.reply
            }).status(200)
        })
         .catch(err => {console.log("Chat Database Server Error",err)})
    })


    .catch(err => {
        console.log(err)
        res.send("Chat Server Error",err).status(404)
    })

})



app.post("/api/chat", async function(req,res){
        var prompt,topic;
        console.log("Request with Query ID: ",req.body.queryId);

        fetch("http://localhost:4000/chats?id=" +req.body.queryId)
        .then((databaseReply) => databaseReply.json())
        .then(databaseObj => {
            prompt=databaseObj[0].prompt;
            topic=databaseObj[0].topic;

            
            fetch(CHAT_SERVER.chatAPI,{
                method:"POST",
                body:JSON.stringify({
                    messageHistory:req.body.messageHistory,
                    prompt:prompt,
                    topic:topic

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
    
            })
    
            .then((chatResp) => chatResp.json())
            .then((newMessage)=> {
                res.send(JSON.stringify({
                    queryId:req.body.queryId,
                    reply:newMessage.reply

                })).status(200)    
            })
            .catch(err => {
                console.log(err)
                res.send("Chat Server Error",err)
            })
        })
        .catch( err => console.log("Chat Database Server Error",err))


})

app.listen(5000,()=>{
    console.log("Listening on Port 5000");
});

