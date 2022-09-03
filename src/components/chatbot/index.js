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

  const [keyState, setKeyState] = useState(2);

  useEffect(() => {
    console.log(formOrChat)
    setIsLoading(true)
    if(formOrChat === "form_choice") {
      setTimeout(() => {
        handleAddNewMessage(<MultiChoices key={"MultiChoices"} content={userTypeChoices} handleConfirm={setUserType}/>)
        setIsLoading(false)
    }, [3000])
    } else {
    console.log(formOrChat)
    }
  }, [formOrChat]);

  useEffect(() => {
    console.log(userType)
    setIsLoading(true)
    if(userType === "type_client") {
      setTimeout(() => {
        handleAddNewMessage(<FormClient key={"FormClient"} />)
        setIsLoading(false)
    }, [3000])
    } else {
    console.log(userType)
    }
  }, [userType]);

  useEffect(()=> {
    console.log(userType)
  }, [userType])
  
  // TODO Content aleatoire .. multi choices here random choice
  const [messages, setMessages] = useState([<BotMessage content="Bonjour .. nous espérons que vous allez bien"/>]);
  // TODO if null then welcome screen

  const handleAddNewMessage = (new_message) => {
    setKeyState((prev) => (prev + 1))
    setMessages((messages) => ([new_message, ...messages]))
  }

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
    
  // }, [isLoading]);

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      handleAddNewMessage(<BotMessage key={keyState} content="Qu'est ce que vous préférez ?" />)
      setIsLoading(true)
      setTimeout(() => {
        // TODO give a deneral name to the function .. handleConfirm
        handleAddNewMessage(<TwoChoicesForm key={"TwoChoicesForm"} content={formOrChatChoices} handleConfirm={setFormOrChat} choiceValue={formOrChat}/>)
        setIsLoading(false)
      }, [2000])
    }, 3000)
  }, []);
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
        {(isLoading) ? <DotsMessage /> : null}
        {messages.map((message) => message)}
        {/* <BotMessage /> */}
      </div>
      {/* Footer */}
      {/* <div className="">hi</div> */}
      <ChatbotFooter />
        {/* <button onClick={() => handleAddNewMessage(<BotMessage />)}>hi</button> */}
    </div>
  );
}

export default Chatbot;
