import React, { useEffect, useState } from "react";

const SingleChoiceFormCondition = (props) => {
  const {
    content,
    choices,
    types,
    setInfos,
    infos,
    setInfosErrors,
    infosErrors,
    isSent,
    ...others
  } = props;
  const [choice, setChoice] = useState(null);
  const [choiceType, setChoiceType] = useState(null);

  const handleChoiceClick = (e) => {
    if (infosErrors[Object.keys(content).at(1)] !== "") {
      setInfosErrors((previous) => ({ ...previous, [Object.keys(content).at(1)]: "" }));
    }
    let value = e.target.value;
    setChoice(value);
    
    setInfos((previous) => ({ ...previous, [Object.keys(content).at(1)]: value }));
  };

  const handleChoiceType = (res) => {
    console.log(res)
    setChoiceType(res);
    setInfos((previous) => ({ ...previous, type: res }));
    console.log(choiceType)
  };

  // console.log(content)
  // TODO .. if choices defined
  return (
    <div
      className="w-full flex p-2 place-items-center flex-col"
      key={Object.keys(content).at(0)}
    >
      <div className="flex-auto w-full mb-3">{Object.values(content).at(0)}</div>

      <div className="flex flex-row">
            <button
              className={`w-1/2 h-14 bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 flex items-center justify-center ${
                Object.keys(types).at(0) === infos["type"]
                  ? "bg-teal-500 text-white disabled:outline disabled:outline-1 disabled:outline-teal-500"
                  : "enabled:hover:bg-amber-200"
              }`}
              name={Object.keys(types).at(0)}
              onClick={() => handleChoiceType(Object.keys(types).at(0))}
              disabled={isSent}
            >
              {Object.values(types).at(0)}
            </button>
            <button
              className={`w-1/2 h-14 bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 flex items-center justify-center ${
                Object.keys(types).at(1) === infos["type"]
                  ? "bg-teal-500 text-white"
                  : "enabled:hover:bg-amber-200"
              }`}
              name={Object.keys(types).at(1)}
              onClick={() => handleChoiceType(Object.keys(types).at(1))}
              disabled={isSent}
            >
              {Object.values(types).at(1)}
            </button>
          </div>



      {infos["type"] == "choix_offre" ? (
        <div className={`p-2 rounded-3xl w-full focus:outline-none text-center max-h-32 overflow-y-auto chatbot-scrollbar-none`}>
          <div>Sélectionner l'{Object.values(content).at(1).toLowerCase()} que vous voulez</div>
          {Object.entries(choices).map((choice) => {
            return (
              <button
                onClick={(e) => handleChoiceClick(e)}
                key={choice[1].id}
                value={choice[1].id}
                className={`w-full bg-gray-100 rounded-xl m-1 p-1 outline-dotted outline-1 outline-gray-500 ${
                  choice[1].id == infos[Object.keys(content).at(1)]
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
      ) : null}
        {infosErrors["type"] && infosErrors["type"] !== "" ? (
          <div className="text-red-500">{infosErrors["type"]}</div>
        ) : null}
      {infosErrors[Object.keys(content).at(1)] && infosErrors[Object.keys(content).at(1)] !== "" ? (
        <div className="text-red-500">{infosErrors[Object.keys(content).at(1)]}</div>
      ) : null}
    </div>
  );
};

export default SingleChoiceFormCondition;
