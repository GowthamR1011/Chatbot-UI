import { Show, createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import "./chatbot.css"
import UserChat from "./userchat/userchat"
import AssistantChat from "./assistantchat/assistantchat"

export default function ChatBot(props){
    const [chatMessages,setChatMessages ] = createStore([{
        role:"assistant",message:"Hi, I'm Jeevan Chat-Bot. How can I help you today?"}])
    const [userMessage, setUserMessage] = createSignal("")
    const [replyLoading,setReplyLoading] = createSignal(false)
    function submitChatMessage(){
        setChatMessages([...chatMessages,{role:"user",message:userMessage()}])
        setReplyLoading(true);
        //console.log(chatMessages.role)
        setTimeout(getReply,1000);
    }

    function getReply(){
        fetch("/api/chat",{
            method:"POST",
            body:JSON.stringify({
                queryid:123,
                messageHistory:chatMessages
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
               setChatMessages([...chatMessages,{role:"assistant",message:"Great! Thats Good"}]);
               setReplyLoading(false);
            })
            .catch((err)=>{
                console.log("Error in Fetch")
            })
    }

    return(
        <div className="chat-box">
            <div className="chat-message-area">
                <For each = {chatMessages}>
                    { (chatMessage) =>{
                        const {role,message} = chatMessage;
                        if (role == "user")
                        {
                            return (
                               <UserChat  role={role} message={message}/>
                            )
                        }
                        else{
                            return(
                                <AssistantChat message={message} />
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
                <input className="user-input" type="text" placeholder="Enter your text" onInput={(e)=>setUserMessage(e.target.value)}></input>
                <button className="input-submit-btn" onClick={submitChatMessage}>Submit</button>
            </div>
        </div>
    )
}