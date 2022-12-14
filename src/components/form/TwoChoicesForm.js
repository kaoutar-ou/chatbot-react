import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const TwoChoicesForm = (props) => {
  const { t, i18n } = useTranslation("global");
  
  // const { content, choiceValue, ...others } = props;
  const { content, ...others } = props;

  const [choice, setChoice] = useState(null);
  const [sentChatChoice, setSentChatChoice] = useState(false);
  // const [sentChatChoiceError, setSentChatChoiceError] = useState(false);

  const [isSent, setIsSent] = useState(false);

  const [error, setError] = useState(false);

  const handleChoice = (res) => {
    setChoice(res);
    setError(false)
  };

  const handleSendChoice = () => {
    if(choice != null) {
      if(choice === Object.keys(content).at(0))
        {
          setIsSent(true);
        }
      else {
        setSentChatChoice(true)
      }
      // if(sentChatChoice) {
      //   setSentChatChoiceError(true)
      // }
      props.handleConfirm(choice);
    } else {
      setError(true)
    }
  };

  const [scale, setScale] = useState("scale-0");
  useEffect(() => {
    setTimeout(() => {
      setScale("scale-1");
    }, 1000);
  }, []);

  return (
    <div className={`transition-all duration-150 ease-out relative ${scale}`}>
      <div className="w-full flex flex-row">
        <div className="w-full m-5 rounded-2xl shadow-lg break-words outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          <div className="flex flex-row">
            <button
              className={`w-1/2 h-14 bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 flex items-center justify-center ${
                Object.keys(content).at(0) === choice
                  ? "bg-teal-500 text-white disabled:outline disabled:outline-1 disabled:outline-teal-500"
                  : "enabled:hover:bg-amber-200"
              }`}
              name={Object.keys(content).at(0)}
              onClick={() => handleChoice(Object.keys(content).at(0))}
              disabled={isSent}
            >
              {Object.values(content).at(0)}
            </button>
            <button
              className={`w-1/2 h-14 bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 flex items-center justify-center ${
                Object.keys(content).at(1) === choice
                  ? "bg-teal-500 text-white"
                  : "enabled:hover:bg-amber-200"
              }`}
              name={Object.keys(content).at(1)}
              onClick={() => handleChoice(Object.keys(content).at(1))}
              disabled={isSent}
            >
              {Object.values(content).at(1)}
            </button>
          </div>
        {error ? (
        <div className="text-red-500 mb-3 -mt-2">{t('twoChoices.noChoice')}</div>
      ) : null}
      {(sentChatChoice && choice === Object.keys(content).at(1)) ? (
        <div className="text-amber-500 mb-3 -mt-2 px-3">{t('twoChoices.repeatedChat')}</div>
      ) : null}
        </div>
      </div>
      <button
        className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 enabled:hover:bg-teal-500 enabled:hover:text-white disabled:text-gray-300"
        onClick={handleSendChoice}
        disabled={isSent || (sentChatChoice && choice === Object.keys(content).at(1))}
      >
        OK
      </button>
    </div>
  );
};

export default TwoChoicesForm;
