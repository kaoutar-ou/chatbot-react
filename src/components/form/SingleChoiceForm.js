import React, { useState } from "react";
import { Trans, useTranslation } from 'react-i18next';

const SingleChoiceForm = (props) => {
  const { t, i18n } = useTranslation("global");

  const {
    content,
    choices,
    setInfos,
    infos,
    setInfosErrors,
    infosErrors,
    isSent,
    ...others
  } = props;
  const [choiceState, setChoice] = useState(null);

  const handleChoiceClick = (e) => {
    if (infosErrors[content[0]] !== "") {
      setInfosErrors((previous) => ({ ...previous, [content[0]]: "" }));
    }
    let value = e.target.value;
    setChoice(value);
    // console.log(value);
    // console.log(content[0]);
    setInfos((previous) => ({ ...previous, [content[0]]: value }));
  };

  // TODO .. if choices defined
  return (
    <div
      className="w-full flex p-2 place-items-center flex-col"
      key={content[0]}
    >
      <div className="flex-auto w-full mb-3">{content[1]}</div>
      <div className="p-2 rounded-3xl w-full focus:outline-none text-center max-h-32 overflow-y-auto chatbot-scrollbar-none">
        <div>
          {/* <Trans ns="global" i18nKey="singleChoice.select" value={{content: (content[1].toLowerCase() !== 'heure') ? content[1].toLowerCase() : "temps"}}>Select the {{content}} you want</Trans> */}
          <Trans ns="global" i18nKey="singleChoice.select">Selectionner le {{content: (content[1].toLowerCase() !== 'heure') ? content[1].toLowerCase() : "temps"}} que vous voulez</Trans>
          {/* Selectionner le {(content[1].toLowerCase() !== 'heure') ? content[1].toLowerCase() : "temps"} que vous voulez */}
          </div>
        {Object.entries(choices).map((choice) => {
          return (
            <button
              onClick={(e) => handleChoiceClick(e)}
              key={choice[1].id}
              value={choice[1].id}
              className={`w-full bg-gray-100 rounded-xl m-1 p-1 outline-dotted outline-1 outline-gray-500 ${
                choice[1].id == infos[content[0]]
                  ? "bg-teal-500 text-white disabled:outline disabled:outline-1 disabled:outline-teal-500"
                  : "enabled:hover:bg-amber-200"
              } hover:outline-offset-2`}
              disabled={isSent}
            >
              {choice[1].name}
            </button>
          );
        })}
      </div>
      {infosErrors[content[0]] && infosErrors[content[0]] !== "" ? (
        <div className="text-red-500">{infosErrors[content[0]]}</div>
      ) : null}
    </div>
  );
};

export default SingleChoiceForm;
