import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingGIF from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}){
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      function saveInputText(event){
        setInputText(event.target.value);
      }

      function keyDown(event){
        if (event.key === 'Enter'){
          if (inputText !== '')
          sendMessage();
        }

        if(event.key === 'Escape'){
          setInputText('');
        }
      }

      async function sendMessage(){
        setInputText('');
        if (inputText !== ''){
          setIsLoading(true);
          const newChatMessages = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
          ]

          setChatMessages([
            ...newChatMessages,
            {
              message: <img className="loading-spinner" src={LoadingGIF} />,
              sender: 'robot',
              id: crypto.randomUUID
            }
          ]);

          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);
          setIsLoading(false);
        } else{
          return;
        }
      }

      return (
        <div className="chat-input-container">
          <input
            className="chat-input"
            placeholder='Send a message to Chatbot' 
            size="30" 
            onChange={saveInputText}
            value={inputText}
            onKeyDown={keyDown}
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={sendMessage}>
            Send
          </button>
        </div>
      );
    }