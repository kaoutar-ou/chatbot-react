import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  //   const changeLanguage = (e) => {
  //     i18n.changeLanguage(e.target.value);
  //   };

  const [lang, setLang] = useState("en");

  useEffect(() => {
    i18n.changeLanguage("en")
  }, []);

  const changeLanguage = (language) => {
    setLang(language);
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
          lang === "fr"
            ? "outline-dashed outline-1 outline-gray-600 outline-offset-2 bg-gradient-to-t from-amber-300"
            : ""
        }`}
        onClick={() => changeLanguage("fr")}
      >
        FR
      </button>
      <button
        className={`w-8 text-white h-8 hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300 rounded-full m-2 ${
          lang === "en"
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
