import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import ChatbotFooter from "../layout/ChatbotFooter";
import ChatbotHeader from "../layout/ChatbotHeader";
import BotMessage from "../messages/BotMessage";
import "./style.css";
import ChatbotBody from "./chatbotBody";

function Chatbot() {
  const { t, i18n } = useTranslation();

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

  const [isDisabled, setIsDisabled] = useState(false);


  const handleAddNewMessage = (new_message) => {
    setKeyState((prev) => prev + 1);
    setMessages((messages) => [new_message, ...messages]);
  };

  return (
    <div className="h-screen chatbot">

      <ChatbotHeader />

      <ChatbotBody 
      setIsDisabled={setIsDisabled} 
      handleAddNewMessage={handleAddNewMessage} 
      messages={messages}/>
      {/* Footer */}
      <ChatbotFooter
        isDisabled={isDisabled}
        handleAddNewMessage={handleAddNewMessage}
      />
    </div>
  );
}

export default Chatbot;