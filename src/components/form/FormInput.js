import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from 'react-i18next';

const FormInput = (props) => {
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

  const handleInputChange = (e) => {
    if (infosErrors[content[0]] !== "") {
      setInfosErrors((previous) => ({ ...previous, [content[0]]: "" }));
    }
    let value = e.target.value;
    setInfos((previous) => ({ ...previous, [content[0]]: value }));
  };

  return (
    <div>
      <div className="w-full flex p-2 place-items-center" key={content[0]}>
        <div className="flex-auto w-2/6 text-left">{content[1]}</div>
        <input
          className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 focus:outline-none disabled:outline disabled:outline-1 disabled:outline-teal-500"
          placeholder={t("input.enterPH") + content[1]}
          id={content[0]}
          name={content[0]}
          onChange={(e) => handleInputChange(e)}
          value={infos[content[0]]}
          disabled={isSent}
        ></input>
        {/* )
        } */}
      </div>
      {infosErrors[content[0]] && infosErrors[content[0]] !== "" ? (
        <div className="text-red-500">{infosErrors[content[0]]}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
