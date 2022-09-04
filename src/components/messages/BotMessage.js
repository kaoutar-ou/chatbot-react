import React from "react";

// TODO animated background glassmorphism
function BotMessage(props) {
    const {content, ...others} = props
  return (
    <div className="w-full flex flex-row text-white">
      <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4 shadow-md break-all outline-dotted outline-1 outline-gray-500">
         <div className="text-left">{content}</div>
      </div>
    </div>
  );
}

export default BotMessage;
