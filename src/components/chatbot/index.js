import React, { useEffect, useState } from "react";
import FormClient from "./FormClient";
import MultiChoices from "../form/MultiChoicesForm";
import ChatbotFooter from "../layout/ChatbotFooter";
import ChatbotHeader from "../layout/ChatbotHeader";
import BotMessage from "../messages/BotMessage";
import DotsMessage from "../messages/DotsMessage";
import UserMessage from "../messages/UserMessage";
import "./style.css";
import TwoChoicesForm from "../form/TwoChoicesForm";


function Chatbot() {
  // TODO isLoading
  // TODO button to choice form after chatting .. u can click above to fill ...
  const formOrChatChoices = {
    form_choice: "Remplir le formulaire",
    chat_choice: "Continuer à poser des questions"
  }

  const userTypeChoices = {
    type_client: "Client",
    type_partenaire: "Partenaire",
    type_recruteur: "Recruteur",
    type_candidat: "Candidat"
  }

  const [formOrChat, setFormOrChat] = useState(null);

  const [userType, setUserType] = useState(null);

  useEffect(() => {
    console.log(formOrChat)
  }, [formOrChat]);

  useEffect(()=> {
    console.log(userType)
  }, [userType])
  
  const [messages, setMessages] = useState([<BotMessage />,<BotMessage />,<UserMessage />]);
  // TODO if null then welcome screen

  const handleAddNewMessage = (new_message) => {
    setMessages((messages) => ([new_message, ...messages]))
  }

  return (
    <div className="h-screen chatbot">
      {/* Header */}
      <ChatbotHeader />
      {/* Body */}
      <div className="overflow-y-scroll min-h-screen max-h-screen flex flex-col-reverse py-20 chatbot-messages">
        {/* <TwoChoicesForm content={formOrChatChoices} setFormOrChat={setFormOrChat}/>
        <FormClient />
        <MultiChoices content={userTypeChoices} setUserType={setUserType}/>
        <DotsMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage />
        <BotMessage />
        <UserMessage /> */}
        {/* {(messages != null) ? messages.map((val)=> {return val}) : null } */}
        {messages.map((message) => message)}
        <BotMessage />
      </div>
      {/* Footer */}
      <ChatbotFooter />
        <button onClick={() => handleAddNewMessage(<BotMessage />)}>hi</button>
    </div>
  );
}

export default Chatbot;
