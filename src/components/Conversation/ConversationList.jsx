const ConversationList = ({conversations}) => {
    return (
        <>
            {conversations.map((conversationId) => (
                <div key={conversationId}>Conversation {conversationId}</div>
            ))}
        </>
    );
}

export default ConversationList;