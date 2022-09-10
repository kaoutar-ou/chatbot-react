import React from "react";
import LanguageSelector from "../language";

function ChatbotHeader(props) {
  return (
    <div className="flex w-full h-18 fixed bg-gradient-to-r from-teal-500 to-amber-300 shadow-md z-50">
      {/* <div className="flex items-center text-white font-bold text-lg p-2"> */}
      <div className="text-white font-bold text-lg p-2">Architeo Chatbot</div>
      <div>
        <LanguageSelector setLanguage={props.setLanguage} />
      </div>
    </div>
  );
}

export default ChatbotHeader;
