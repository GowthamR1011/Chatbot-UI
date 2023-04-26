import { Show, createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import "./chatbot.css"
import UserChat from "./userchat/userchat"
import AssistantChat from "./assistantchat/assistantchat"
import NODE_SERVER  from "../../data/data"
import sendBtn from "../../src/assets/send-btn.jpg"

export default function ChatBot(props){
    const [chatMessages,setChatMessages ] = createStore([{
        role:"assistant",content:"Hi, I'm Jeevan Chat-Bot. How can I help you today?"}])
    const [userMessage, setUserMessage] = createSignal("")
    const [replyLoading,setReplyLoading] = createSignal(false)
    var queryId="";

    function submitChatMessage(){
        setChatMessages([...chatMessages,{role:"user",content:userMessage()}])
        setReplyLoading(true);
        setUserMessage("");
        let messageHistory = getMessageHistory()
        if(queryId=="")
        {

            getFirstReply(messageHistory)
        }
        else{
            
            getReply(messageHistory)
        }
    }


    function resetChat(){
        setChatMessages([{role:"assistant",content:"Hi, I'm Jeevan Chat-Bot. How can I help you today?"}]);
        queryId = "";
    }


    function getMessageHistory(){
        if (chatMessages.length > 10)
            return chatMessages.slice(-10)
        
        else
            return chatMessages
    }

    async function getFirstReply(chatContent){
        fetch(NODE_SERVER.newchatAPI,{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                messageHistory:chatContent
            })
        })

        .then(res => res.json())
        .then(replyObj => {
            queryId=replyObj.queryId;
            setChatMessages([...chatMessages,replyObj.reply]);
           setReplyLoading(false);
        })
        .catch(err =>{
            console.log("Error in Getting message from server",err);
        })
    }


    async function getReply(chatContent){
        
        
        fetch(NODE_SERVER.chatAPI,{
            method:"POST",
            body:JSON.stringify({
                queryId:queryId,
                messageHistory:chatContent
                
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then(chatreply => {
                if(queryId == chatreply.queryId){
                    setChatMessages([...chatMessages,chatreply.reply]);
                    setReplyLoading(false);
    }})
            .catch((err)=>{
                console.log("Error in Getting Reply from Server for multiple messages",err)
            })
    }

    return(
        <div className="chat-box">
            <div className="chat-message-area">
                <For each = {chatMessages}>
                    { (chatMessage) =>{
                        const {role,content} = chatMessage;
                        if (role == "user")
                        {
                            return (
                               <UserChat  role={role} message={content}/>
                            )
                        }
                        else{
                            return(
                                <AssistantChat message={content} />
                            )
                        }
                    }

                    }
                </For>
                <Show when={replyLoading()}>
                    <p>....</p>
                </Show>
                 
            </div>
            
            <div className="input-bar">
                <input className="user-input fa-solid fa-paper-plane" onKeyPress={(e) => { if (e.key === "Enter") {submitChatMessage()}}} type="text" placeholder="Enter your text" onInput={(e)=>setUserMessage(e.target.value)} value={userMessage()}></input>
                <button className="input-submit-btn" type="submit" onClick={submitChatMessage}><img src={sendBtn} className ="send-btn-img" alt="Send"></img></button>
                <button className="input-reset-topic-btn" onClick={resetChat}>Reset Topic</button>
                
            </div>
        </div>
    )
}