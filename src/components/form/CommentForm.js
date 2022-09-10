import React from "react";
import { useTranslation } from 'react-i18next';

const CommentForm = (props) => {
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

  const handleChange = (e) => {
    if (infosErrors[content[0]] !== "") {
      setInfosErrors((previous) => ({ ...previous, [content[0]]: "" }));
    }
    let value = e.target.value;
    setInfos((previous) => ({ ...previous, [content[0]]: value }));
  };
  return (
    <div
      className="w-full flex p-2 place-content-center flex-col"
      key={content[0]}
    >
      <div className="flex-auto w-full mb-3">
        {t("comment.leaveComment")}
      </div>
      <textarea
        className="w-full resize-none rounded-lg p-2 focus:outline-none disabled:outline disabled:outline-1 disabled:outline-teal-500"
        id={content[0]}
        name={content[0]}
        rows="4"
        cols="50"
        placeholder={t("comment.leaveCommentPH")}
        maxLength={1000}
        onChange={(e) => handleChange(e)}
        disabled={isSent}
      ></textarea>
      {infosErrors[content[0]] && infosErrors[content[0]] !== "" ? (
        <div className="text-amber-500">{infosErrors[content[0]]}</div>
      ) : null}
    </div>
  );
};

export default CommentForm;
