import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

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
import FormPartenaire from "./FormPartenaire";
import FormCandidat from "./FormCandidat";

// TODO PREVENT SEND WITHOUT CHOICE
// FIXME PREVENT SEND WITHOUT CHOICE
function Chatbot() {
  const { t, i18n } = useTranslation();
  // TODO isLoading
  // TODO button to choice form after chatting .. u can click above to fill ...
  const formOrChatChoices = {
    form_choice: t("formOrChat.form"),
    chat_choice: t("formOrChat.chat"),
  };

  const userTypeChoices = {
    type_client: t("userType.client"),
    type_partenaire: t("userType.partenaire"),
    type_recruteur: t("userType.recruteur"),
    type_candidat: t("userType.candidat"),
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
    setIsLoading(true);
    if (formOrChat === "form_choice") {
      setIsDisabled(true);
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={t("chooseUserType")}
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
      }, [1000]);
    } else if (formOrChat === "chat_choice") {
      handleAddNewMessage(
        <BotMessage
          key={generateKey("chatbot")}
          content={t("chatChoice.choice")}
        />
      );

      // TODO .. talk with a real person .. "message" : "Please wait a few seconds while we connect you to a consultant"
      // TODO .. message = feel free to
      // TODO .. send language with user message
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={t("chatChoice.message")}
          />
        );
      }, 1000);
    } else {
      // console.log(formOrChat);
    }
  }, [formOrChat]);

  useEffect(() => {
    setIsLoading(true);
    // TODO Switch case here
    if (userType === "type_client") {
      setTimeout(() => {
        // TODO add cancel to cancel process and enable main input
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={t("welcomeUserType.client")}
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
      }, [1000]);
    } else if (userType === "type_recruteur") {
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={t("welcomeUserType.recruteur")}
          />
        );
        // TODO ... change this key to be unique
        handleAddNewMessage(
          <FormRecruteur
            key={generateKey("FormRecruteur")}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
          />
        );
        setIsLoading(false);
      }, [1000]);
    } else if (userType === "type_partenaire") {
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={t("welcomeUserType.partenaire")}
          />
        );
        // TODO ... change this key to be unique
        handleAddNewMessage(
          <FormPartenaire
            key={generateKey("FormPartenaire")}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
          />
        );
        setIsLoading(false);
      }, [1000]);
    } else if (userType === "type_candidat") {
      // console.log(userType);
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={t("welcomeUserType.candidat")}
          />
        );
        handleAddNewMessage(
          <FormCandidat
            key={generateKey("FormCandidat")}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
          />
        );
        setIsLoading(false);
      }, [1000]);
    }
  }, [userType]);

  useEffect(() => {
    // console.log(userType);
  }, [userType]);

  // TODO Content aleatoire .. multi choices here random choice
  const [messages, setMessages] = useState([
    <BotMessage
      key={generateKey("chatbot")}
      content={t("welcome")}
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
          content={t("formOrChat.message")}
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
      }, [1000]);
    }, 1000);
  }, []);
  return (
    <div className="h-screen chatbot">
      {/* Header */}
      <ChatbotHeader />
      {/* Body */}
      <div className="overflow-y-scroll min-h-screen max-h-screen flex flex-col-reverse py-20 chatbot-messages">
        {isLoading ? <DotsMessage /> : null}
        {/* <CalendarForm
                  key={"CalendarForm"}
                /> */}
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
