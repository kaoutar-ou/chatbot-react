import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import ChatbotFooter from "../layout/ChatbotFooter";
import ChatbotHeader from "../layout/ChatbotHeader";
import BotMessage from "../messages/BotMessage";
import "./style.css";
import ChatbotBody from "./chatbotBody";

function Chatbot(props) {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);

  const [keyState, setKeyState] = useState(2);
  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };
  
  const [messages, setMessages] = useState([
    <BotMessage
      key={generateKey("chatbot")}
      content={t("welcome")}
    />,
  ]);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, []);

  const handleAddNewMessage = (new_message) => {
    setKeyState((prev) => prev + 1);
    setMessages((messages) => [new_message, ...messages]);
  };

  return (
    <div className="h-screen chatbot">
      <ChatbotHeader setLanguage={props.setLanguage} setIsVoiceOn={props.setIsVoiceOn}/>
      {
        (loading) ? (
          <div className="h-screen chatbot flex items-center justify-center">
            <div 
            className="w-24 h-24 outline outline-1 border border-teal-500 outline-amber-500 outline-offset-1 rounded-t-full animate-pulse rounded-br-full flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-3xl bg-slate-100 mx-1 animate-bounce outline-dotted outline-1 outline-gray-500"></div>
              <div className="w-2 h-2 rounded-3xl bg-slate-100 mx-1 animate-bounce outline-dotted outline-1 outline-gray-500"></div>
              <div className="w-2 h-2 rounded-3xl bg-slate-100 mx-1 animate-bounce outline-dotted outline-1 outline-gray-500"></div>
            </div>
          </div>
        ) : (
          <ChatbotBody 
          setIsDisabled={setIsDisabled} 
          handleAddNewMessage={handleAddNewMessage} 
          messages={messages}/>
        )
      }
      
      <ChatbotFooter
        isDisabled={isDisabled}
        handleAddNewMessage={handleAddNewMessage}
      />
    </div>
  );
}

export default Chatbot;