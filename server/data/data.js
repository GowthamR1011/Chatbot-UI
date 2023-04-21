CHAT_SERVER = {
    newChatAPI: "http://127.0.0.1:8000/newchat",
    chatAPI:"http://127.0.0.1:8000/chat"
}
DATABASE_SERVER = {
    GET_PROMPT:"http://localhost:4000/chats?id=",
    POST_PROMPT:"http://localhost:4000/chats"
}
module.exports.CHAT_SERVER = CHAT_SERVER;
module.exports.DATABASE_SERVER = DATABASE_SERVER;