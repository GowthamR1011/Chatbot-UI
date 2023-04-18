import { createSignal } from "solid-js"
import "./chatbot.css"

export default function ChatBot(props){
    const [chatMessage,setChatMessage ] = createSignal(["Hi, I'm Jeevan Chat-Bot. How can I help you today?"])

    return(
        <div className="chat-box">
            <div className="chat-message-area">
                {chatMessage()}
            </div>
            <input className="user-input" type="text" placeholder="Enter your text" onSubmit={setChatMessage(chatMessage().push())}></input>
        </div>
    )
}