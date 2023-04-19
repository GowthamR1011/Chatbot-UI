import "./userchat.css"

export default function UserChat(props){
    return(
        <div className="user-message">
            <h4 className="user-message-header">{props.role }</h4>
            <p className="user-message-content">{props.message}</p>
        </div>
    )
}