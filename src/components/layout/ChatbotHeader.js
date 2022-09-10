import React, { useContext } from "react";
import { VoiceContext } from "../../App";
import LanguageSelector from "../language";

function ChatbotHeader(props) {
  const isVoiceOn = useContext(VoiceContext);

  const handleSetIsVoiceOn = () => {
    props.setIsVoiceOn(!isVoiceOn);
  };

  return (
    <div className="flex w-full items-center h-18 fixed bg-gradient-to-r from-teal-500 to-amber-500 shadow-md z-50">
      {/* <div className="flex items-center text-white font-bold text-lg p-2"> */}
      <div className="w-10/12 mr-3 flex items-center">
        <button
          className={`w-8 text-white h-8 hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-500 rounded-full m-2 ${
            isVoiceOn
              ? "outline-dashed outline-1 outline-gray-600 outline-offset-2 bg-gradient-to-t from-amber-300"
              : ""
          }`}
          onClick={handleSetIsVoiceOn}
        >
          {isVoiceOn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          )}
        </button>
      {/* </div>
      <div className="w-6/12"> */}
        <div className="text-white font-bold text-lg p-2">Architeo Chatbot</div>
      </div>
      <div className="w-5/12">
        <LanguageSelector setLanguage={props.setLanguage} />
      </div>
    </div>
  );
}

export default ChatbotHeader;
