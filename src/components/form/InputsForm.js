import React from "react";
import { useTranslation } from 'react-i18next';

import FormInput from "./FormInput";

const InputsForm = (props) => {
  const { t, i18n } = useTranslation("global");
  
  return Object.entries(props.content).map((content) => {
    return (
      <FormInput
        key={content[0]}
        content={content}
        setInfos={props.setInfos}
        infos={props.infos}
        setInfosErrors={props.setInfosErrors}
        infosErrors={props.infosErrors}
        isSent={props.isSent}
      />
    );
  });
};

export default InputsForm;
