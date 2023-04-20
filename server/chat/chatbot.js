var chatMessageProcessor = function(messageHistory){
    if (messageHistory.length > 4)
    {
        messageHistory.splice(2,2)
        console.log(messageHistory)
        console.log("More than 4");
        return(messageHistory)
    }
    return (messageHistory)
}


module.exports.chatMessageProcessor = chatMessageProcessor;