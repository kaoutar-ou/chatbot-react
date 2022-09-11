import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import FormClient from "./FormClient";
import MultiChoices from "../form/MultiChoicesForm";
import BotMessage from "../messages/BotMessage";
import DotsMessage from "../messages/DotsMessage";
import "./style.css";
import TwoChoicesForm from "../form/TwoChoicesForm";
import FormRecruteur from "./FormRecruteur";
import FormPartenaire from "./FormPartenaire";
import FormCandidat from "./FormCandidat";
import { LanguageContext, VoiceContext } from "../../App";

// TODO PREVENT SEND WITHOUT CHOICE
// FIXME PREVENT SEND WITHOUT CHOICE
function ChatbotBody(props) {
  const { t, i18n } = useTranslation();

  const {setIsDisabled, handleAddNewMessage, messages} = props
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


  // TODO make generate key global
  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const isVoiceOn = useContext(VoiceContext);
  const lang = useContext(LanguageContext);

  const handleSpeakMessage = (message) => {
    if (isVoiceOn) {
      console.log("hi")
      let toSpeech = new SpeechSynthesisUtterance(message)
      toSpeech.lang = Object.keys(lang).at(0)
      window.speechSynthesis.speak(toSpeech)
    }
  }

  // TODO .. ask about the form any time
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
        handleSpeakMessage(t("chooseUserType"))
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
      handleSpeakMessage(t("chatChoice.choice"))

      // TODO .. talk with a real person .. "message" : "Please wait a few seconds while we connect you to a consultant"
      // TODO .. send language with user message
      setTimeout(() => {
        handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={t("chatChoice.message")}
          />
        );
        handleSpeakMessage(t("chatChoice.message"))
        setIsDisabled(false)
        setIsLoading(false)
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
        handleSpeakMessage(t("welcomeUserType.client"))
        handleAddNewMessage(
          <FormClient
            key={"FormClient"}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
            setIsLoading={setIsLoading}
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
        handleSpeakMessage(t("welcomeUserType.recruteur"))
        // TODO ... change this key to be unique
        handleAddNewMessage(
          <FormRecruteur
            key={generateKey("FormRecruteur")}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
            setIsLoading={setIsLoading}
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
        handleSpeakMessage(t("welcomeUserType.partenaire"))
        // TODO ... change this key to be unique
        handleAddNewMessage(
          <FormPartenaire
            key={generateKey("FormPartenaire")}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
            setIsLoading={setIsLoading}
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
        handleSpeakMessage(t("welcomeUserType.candidat"))
        handleAddNewMessage(
          <FormCandidat
            key={generateKey("FormCandidat")}
            handleAddNewMessage={handleAddNewMessage}
            setMainInputDisabled={setIsDisabled}
            setIsLoading={setIsLoading}
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
  
  // TODO if null then welcome screen .. logo architeo

  

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
      handleSpeakMessage(t("formOrChat.message"))
      setIsLoading(true);
      setTimeout(() => {
        // TODO give a deneral name to the function .. handleConfirm
        handleAddNewMessage(
          <TwoChoicesForm
            key={"TwoChoicesForm"}
            content={formOrChatChoices}
            handleConfirm={setFormOrChat}
            // choiceValue={formOrChat}
          />
        );
        setIsLoading(false);
      }, [1000]);
    }, 1000);
  }, []);
  
  return (
    <div className="h-screen chatbot">

      {/* Body */}
      <div className="overflow-y-scroll min-h-screen max-h-screen flex flex-col-reverse py-20 chatbot-messages">
        {isLoading ? <DotsMessage /> : null}
        {/* <CalendarForm
                  key={"CalendarForm"}
                /> */}
        {messages.map((message) => message)}
        {/* <BotMessage /> */}
      </div>
      
    </div>
  );
}

export default ChatbotBody;
