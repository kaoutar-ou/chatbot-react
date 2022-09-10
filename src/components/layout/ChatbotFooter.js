import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { LanguageContext } from "../../App";

import * as chatbotService from "../../services/ChatbotService";
import BotMessage from "../messages/BotMessage";
import UserMessage from "../messages/UserMessage";

function ChatbotFooter(props) {
  const { t, i18n } = useTranslation("global");

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

    const lang = useContext(LanguageContext);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: Object.values(lang).at(0) });

  const [userMessage, setUserMessage] = useState("");

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  let userMessageRef = useRef();

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };


  const handleSendUserMessage = async () => {
    let user_message = userMessageRef.current.value;
    setUserMessage(user_message);

    handleAddNewMessage(
      <UserMessage key={generateKey("chatbot")} content={user_message} />
    );
    userMessageRef.current.value = "";
    setInputValue("")
    resetTranscript()
    let response = await chatbotService.getBotResponse(user_message, Object.values(lang).at(0));

    if (Object.keys(response.errors).length > 0) {
      // console.log(response.errors);
      // if(response.errors.server_error !== undefined && response.errors.server_error !== null) {
      // }
    } else {
      handleAddNewMessage(
        <BotMessage
          key={generateKey("chatbot")}
          content={response?.data?.bot_message}
        />
      );
    }
  };
  const { isDisabled, handleAddNewMessage, ...others } = props;
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyUp = (e) => {
    // console.log(e)
    // console.log(e.keyCode)
    // console.log(e.key)
    // console.log(e.code)
    if(e.keyCode === 13 || e.key === "Enter" || e.code === "Enter") {
      handleSendUserMessage()
    }
  }

  const handleInputReset = () => {
    setInputValue("")
    resetTranscript()
  }

  return (
    <div className="bg-gradient-to-l from-teal-500 to-amber-300 flex bottom-0 absolute h-16 w-full shadow-md items-center">
      <div className="flex-auto">
        <div className="rounded-lg mx-1">
          <input
            className="w-11/12 rounded-2xl h-10 my-2 mx-2 pl-3 outline-dotted outline-1 outline-gray-500"
            type={"text"}
            placeholder={t("typeHere")}
            disabled={isDisabled}
            ref={userMessageRef}
            value={inputValue}
            onChange={e => handleInputChange(e)}
            onKeyUp={e => handleInputKeyUp(e)}
          ></input>
        </div>
      </div>
      <div className="flex-none w-36 flex">
        <div className="w-12">
          <button
            className="p-2 w-10 h-10 rounded-full hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300"
            disabled={isDisabled}
            onClick={handleInputReset}
          >
            {/* <img width={25} src={voice} alt="voice"></img> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-2 ${
                transcript ? "stroke-red-400" : "stroke-white"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
        <div className="w-12">
          <button
            className={`p-2 w-10 h-10 rounded-full hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300 ${transcript ? "outline-dashed outline-1 outline-gray-600 hover:outline-offset-2 bg-gradient-to-t from-amber-300" : ""}`}
            disabled={isDisabled}
            onTouchStart={startListening}
            onMouseDown={startListening}
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
          >
            {/* <img width={25} src={voice} alt="voice"></img> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-2 ${
                listening ? "stroke-red-400" : "stroke-white"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>
        <div className="w-12 mr-2">
          <button
            className="p-1 w-10 h-10 rounded-full hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300"
            disabled={isDisabled}
            onClick={handleSendUserMessage}
          >
            {/* <img width={25} src={send} alt="send"></img> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-white stroke-2 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
        {!browserSupportsSpeechRecognition ? (
          <span>Browser doesn't support speech recognition.</span>
        ) : null}
      </div>
    </div>
  );
}

export default ChatbotFooter;
