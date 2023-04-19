import "./assistantchat.css"


export default function AssistantChat(props){
    return(
        <div className="assistant-chat-message">
            <h4 className="assistant-message-header">Jeevan Bot</h4>
            <p className="assistant-message-header">{props.message}</p>
        </div>
    )
}