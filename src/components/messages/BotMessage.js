import React, { useContext, useEffect, useState } from "react";
import { LanguageContext, VoiceContext } from "../../App";

// TODO animated background glassmorphism
function BotMessage(props) {
  const { content, ...others } = props;

  const isVoiceOn = useContext(VoiceContext);
  const lang = useContext(LanguageContext);

  const [scale, setScale] = useState("scale-0");
  useEffect(() => {
    setTimeout(() => {
      setScale("scale-1");
    }, 1000);

    if (isVoiceOn) {
      let toSpeech = new SpeechSynthesisUtterance(content)
      toSpeech.lang = Object.keys(lang).at(0)
      window.speechSynthesis.speak(toSpeech)
    }

  }, []);

  return (
    <div
      className={`transition-all duration-150 ease-out w-full flex flex-row text-white ${scale}`}
    >
      <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4 shadow-md break-all outline-dotted outline-1 outline-gray-500">
        <div className="text-left">{content}</div>
      </div>
    </div>
  );
}

export default BotMessage;
