import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function useAutoScroll(dependencies) {
    const containerRef = useRef(null);

    useEffect(() => {
        const containerElem = containerRef.current;

        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, dependencies);

    return containerRef;
}
function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useAutoScroll([chatMessages]);
    if (chatMessages.length === 0) {
        return (
            <div className="welcome-text">
                <p>Welcome to the chatbot project! Send a message using the textbox below.</p>
            </div>
        )
    }

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}

export default ChatMessages;