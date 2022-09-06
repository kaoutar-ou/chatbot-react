import React, { useState } from "react";

const SingleChoiceForm = (props) => {
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
    console.log(value);
    setInfos((previous) => ({ ...previous, [content[0]]: value }));
  };

  return (
    <div
      className="w-full flex p-2 place-items-center flex-col"
      key={content[0]}
    >
      <div className="flex-auto w-full mb-3">{content[1]}</div>
      <div className="p-2 rounded-3xl w-full focus:outline-none text-center max-h-32 overflow-y-auto chatbot-scrollbar-none">
        <div>Selectionner le {content[1].toLowerCase()} que vous cherchez</div>
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
