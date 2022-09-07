import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

const FileForm = (props) => {
  const {
    content,
    setInfos,
    infos,
    setInfosErrors,
    infosErrors,
    isSent,
    ...others
  } = props;

  const key = Object.keys(content).at(0)
  const val = Object.values(content).at(0)

  console.log(Object.keys(content).at(0))
  console.log(Object.values(content).at(0))

  const handleInputChange = (e) => {
    if (infosErrors[key] !== "") {
      setInfosErrors((previous) => ({ ...previous, [key]: "" }));
    }
    let value = e.target.files[0];
    setInfos((previous) => ({ ...previous, [key]: value }));
  };

  return (
    <div>
      <div className="w-full flex p-2 place-items-center" key={key}>
        {/* <div className="flex-auto w-2/6 text-left">{val}</div>
        <input
          className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 focus:outline-none disabled:outline disabled:outline-1 disabled:outline-teal-500"
          placeholder={"Entrer Votre " + val.toLowerCase()}
          id={key}
          name={key}
          onChange={(e) => handleInputChange(e)}
          value={infos[key]}
          disabled={isSent}
        ></input> */}

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="small_size">{val}</label>
<input disabled={isSent} onChange={(e) => handleInputChange(e)} className="block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id={key} name={key} type="file"></input>


      </div>
      {infosErrors[key] && infosErrors[key] !== "" ? (
        <div className="text-red-500">{infosErrors[key]}</div>
      ) : null}
    </div>
  );
};

export default FileForm;
