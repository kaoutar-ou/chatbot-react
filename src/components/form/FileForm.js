import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from 'react-i18next';

const FileForm = (props) => {
  const { t, i18n } = useTranslation("global");

  const {
    content,
    setInfos,
    infos,
    setInfosErrors,
    infosErrors,
    isSent,
    ...others
  } = props;

  const key = Object.keys(content).at(0);
  const val = Object.values(content).at(0);

//   console.log(Object.keys(content).at(0));
//   console.log(Object.values(content).at(0));

  const handleInputChange = (e) => {
    if (infosErrors[key] !== "") {
      setInfosErrors((previous) => ({ ...previous, [key]: "" }));
    }
    let value = e.target.files[0];
    // console.log(value);
    setInfos((previous) => ({ ...previous, [key]: value }));
  };

  return (
    <div>
      <div className="w-full p-2 place-items-center" key={key}>
        <div className="w-full text-center mb-5">{val}</div>
        <label htmlFor={key} className={`w-full bg-gray-100 rounded-xl m-1 p-2 px-10 outline-dotted outline-1 outline-gray-500 ${
                infos[key] != ""
                  ? "bg-teal-500 text-white  disabled:outline disabled:outline-1 disabled:outline-teal-500"
                  : "hover:bg-amber-200 cursor-pointer"
              } hover:outline-offset-2`}>
                {
                    infos[key] != ""
                        ? t("file.fileAdded")
                        : t("file.addFile")
                }
              </label>
        <input
          disabled={isSent}
          onChange={(e) => handleInputChange(e)}
          className="w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none opacity-0 hidden"
          id={key}
          name={key}
          type="file"
        ></input>
      </div>
      {infosErrors[key] && infosErrors[key] !== "" ? (
        <div className="text-red-500">{infosErrors[key]}</div>
      ) : null}
    </div>
  );
};

export default FileForm;

// TODO light and dark mode
// TODO TOKEN SET STATE BY FUNCTION CALL

// TODO Partenaire afficher msg in comment