import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../App";

const LanguageSelector = (props) => {
  const { t, i18n } = useTranslation();

  //   const changeLanguage = (e) => {
  //     i18n.changeLanguage(e.target.value);
  //   };

  // const [lang, setLang] = useState("en");

  const lang = useContext(LanguageContext);

  useEffect(() => {
    i18n.changeLanguage("en")
  }, []);

  const changeLanguage = (language) => {
    // console.log("hi")
    (language == 'fr') ? (
      // setLang(language)
      props.setLanguage({fr: "fr-FR"})
    ) : (
      props.setLanguage({en: "en-US"})
    )
    i18n.changeLanguage(language);
  };

  return (
    // <div onChange={changeLanguage}>
    //   <input type="radio" value="en" name="language" defaultChecked /> EN
    //   <input type="radio" value="fr" name="language" /> FR
    // </div>

    <div>
      <button
        className={`w-8 text-white h-8 hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300 rounded-full m-2 ${
          Object.keys(lang).at(0) === "fr"
            ? "outline-dashed outline-1 outline-gray-600 outline-offset-2 bg-gradient-to-t from-amber-300"
            : ""
        }`}
        onClick={() => changeLanguage("fr")}
      >
        FR
      </button>
      <button
        className={`w-8 text-white h-8 hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300 rounded-full m-2 ${
          Object.keys(lang).at(0) === "en"
            ? "outline-dashed outline-1 outline-gray-600 outline-offset-2 bg-gradient-to-t from-amber-300"
            : ""
        }`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
