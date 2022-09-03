import React from "react";

function UserMessage(props) {
  const {content, ...others} = props
  return (
    <div className="w-full flex flex-row-reverse">
      <div className="bg-amber-400 m-3 rounded-t-2xl rounded-bl-2xl p-4 shadow-md break-all outline-dotted outline-1 outline-gray-500">
        <div>{content}</div>
      </div>
    </div>
  );
}

export default UserMessage;
