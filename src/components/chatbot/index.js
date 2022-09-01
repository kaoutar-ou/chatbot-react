import React from "react";
import FormClient from "../form/FormClient";
import MultiChoices from "../form/MultiChoices";
import ChatbotFooter from "../layout/ChatbotFooter";
import ChatbotHeader from "../layout/ChatbotHeader";
import BotMessage from "../messages/BotMessage";
import DotsMessage from "../messages/DotsMessage";
import UserMessage from "../messages/UserMessage";
import "./style.css";


function Chatbot() {
  return (
    <div className="h-screen chatbot">
      {/* Header */}
      <ChatbotHeader />
      {/* Body */}
      <div className="overflow-y-scroll min-h-screen max-h-screen flex flex-col-reverse py-20 chatbot-messages">
        <FormClient />
        <MultiChoices />
        <DotsMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage />
        <BotMessage />
      </div>

      {/* Footer */}
      <ChatbotFooter />

    </div>
  );
}

export default Chatbot;
