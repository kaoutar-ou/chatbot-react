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
import FormRecruteur from "./FormRecruteur";
import CalendarForm from "../form/CalendarForm";

function Chatbot() {
  // TODO isLoading
  // TODO button to choice form after chatting .. u can click above to fill ...
  const formOrChatChoices = {
    form_choice: "Remplir le formulaire",
    chat_choice: "Continuer à poser des questions",
  };

  const userTypeChoices = {
    type_client: "Client",
    type_partenaire: "Partenaire",
    type_recruteur: "Recruteur",
    type_candidat: "Candidat",
  };

  // FIXME Reunion presentielle ou a distance ???
  // TODO Qr Code

  const [formOrChat, setFormOrChat] = useState(null);

  const [userType, setUserType] = useState(null);

  const [keyState, setKeyState] = useState(2);

  const [isDisabled, setIsDisabled] = useState(false);

  // TODO make generate key global
  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  useEffect(() => {
    console.log(formOrChat);
    setIsLoading(true);
    if (formOrChat === "form_choice") {
      setIsDisabled(true);
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content="Parmi les quatres type, qui est le plus proche à votre situation ?"
          />
        );
        handleAddNewMessage(
          <MultiChoices
            key={"MultiChoices"}
            content={userTypeChoices}
            handleConfirm={setUserType}
          />
        );
        setIsLoading(false);
      }, [3000]);
    } else if (formOrChat === "chat_choice") {
      handleAddNewMessage(
        <BotMessage
          key={generateKey("chatbot")}
          content="Vous avez choisi de poser des questions ..."
        />
      );
      // TODO .. message = feel free to
      // TODO .. send language with user message
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content="Vous pouvez demander ce que vous voulez :)"
          />
        );
      }, 1000);
    } else {
      console.log(formOrChat);
    }
  }, [formOrChat]);

  useEffect(() => {
    console.log(userType);
    setIsLoading(true);
    if (userType === "type_client") {
      setTimeout(() => {
        // TODO add cancel to cancel process and enable main input
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content="Bienvenue cher client, veuillez nous fournir plus d'information en remplissant le formulaire suivant."
          />
        );
        handleAddNewMessage(
          <FormClient
            key={"FormClient"}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
          />
        );
        setIsLoading(false);
      }, [2000]);
    } else if(userType === "type_recruteur") {
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content="Bienvenue cher recruteur, veuillez nous fournir plus d'information en remplissant le formulaire suivant."
          />
        );
        // TODO ... change this key to be unique
        handleAddNewMessage(
          <FormRecruteur
            key={"FormRecruteur"}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
          />
        );
        setIsLoading(false);
      }, [2000]);
    } else {
      console.log(userType);
    }
  }, [userType]);

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  // TODO Content aleatoire .. multi choices here random choice
  const [messages, setMessages] = useState([
    <BotMessage
      key={generateKey("chatbot")}
      content="Bonjour .. nous espérons que vous allez bien"
    />,
  ]);
  // TODO if null then welcome screen .. logo architeo

  const handleAddNewMessage = (new_message) => {
    setKeyState((prev) => prev + 1);
    setMessages((messages) => [new_message, ...messages]);
  };

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {

  // }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleAddNewMessage(
        <BotMessage
          key={generateKey("chatbot")}
          content="Qu'est ce que vous préférez ?"
        />
      );
      setIsLoading(true);
      setTimeout(() => {
        // TODO give a deneral name to the function .. handleConfirm
        handleAddNewMessage(
          <TwoChoicesForm
            key={"TwoChoicesForm"}
            content={formOrChatChoices}
            handleConfirm={setFormOrChat}
            choiceValue={formOrChat}
          />
        );
        setIsLoading(false);
      }, [2000]);
    }, 3000);
  }, []);
  return (
    <div className="h-screen chatbot">
      {/* Header */}
      <ChatbotHeader />
      {/* Body */}
      <div className="overflow-y-scroll min-h-screen max-h-screen flex flex-col-reverse py-20 chatbot-messages">
        {isLoading ? <DotsMessage /> : null}
        <CalendarForm
                  key={"CalendarForm"}
                />
        {messages.map((message) => message)}
        {/* <BotMessage /> */}
      </div>
      {/* Footer */}
      <ChatbotFooter
        isDisabled={isDisabled}
        handleAddNewMessage={handleAddNewMessage}
      />
    </div>
  );
}

export default Chatbot;
