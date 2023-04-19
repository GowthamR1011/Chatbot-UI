import { createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import "./chatbot.css"

export default function ChatBot(props){
    const [chatMessages,setChatMessages ] = createStore([{
        role:"assistant",message:"Hi, I'm Jeevan Chat-Bot. How can I help you today?"}])
    const [userMessage, setUserMessage] = createSignal("")

    function submitChatMessage(){
        setChatMessages([...chatMessages,{role:"user",message:userMessage()}])
        //console.log(chatMessages.role)
    }

    return(
        <div className="chat-box">
            <div className="chat-message-area">
                <For each = {chatMessages}>
                    { (chatMessage) =>{
                        const {role,message} = chatMessage;
                        return (
                            <div> 
                                <h4>{role }</h4>
                                <p>{message}</p>
                            </div>
                        )
                    }

                    }
                </For>
            </div>
            <div className="input-bar">
                <input className="user-input" type="text" placeholder="Enter your text" onInput={(e)=>setUserMessage(e.target.value)}></input>
                <button className="input-submit-btn" onClick={submitChatMessage}>Submit</button>
            </div>
        </div>
    )
}