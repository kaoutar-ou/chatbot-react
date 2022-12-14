import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

function MultiChoices(props) {
  const { t, i18n } = useTranslation("global");
  
  const { content, ...others } = props;

  const [type, setType] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const [error, setError] = useState(false);
  
  const handleChoice = (res) => {
    setType(res);
    setError(false)
  };

  const handleSendChoice = () => {
    if(type != null) {
      setIsSent(true);
      props.handleConfirm(type);
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

  // TODO add tooltip

  return (
    <div className={`transition-all duration-150 ease-out relative ${scale}`}>
      <div className="w-full flex flex-row">
        <div className="w-full m-5 py-4 rounded-2xl shadow-xl break-words outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          {Object.entries(content).map((choice) => {
            return (
              <button
                className={`w-5/6 bg-gray-100 rounded-xl m-1 p-2 last:mb-4 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 ${
                  choice[0] === type
                    ? "bg-teal-500 text-white disabled:outline disabled:outline-1 disabled:outline-teal-500"
                    : "enabled:hover:bg-amber-200"
                }`}
                key={choice[0]}
                name={choice[0]}
                onClick={() => handleChoice(choice[0])}
                disabled={isSent}
              >
                {choice[1]}
              </button>
            );
          })}
        {error ? (
        <div className="text-red-500 mb-3 mt-2">{t('multipleChoices')}</div>
      ) : null}
        </div>
      </div>
      <button
        className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 enabled:hover:bg-teal-500 enabled:hover:text-white disabled:text-gray-300"
        onClick={handleSendChoice}
        disabled={isSent}
      >
        OK
      </button>
    </div>
  );
}

// TODO votre email exist already .. vouz avez recu email du meet

export default MultiChoices;
