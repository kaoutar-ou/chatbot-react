import React from "react";

function DotsMessage() {
  return (
    <div className="w-full flex flex-row">
      <div className=" m-3 rounded-t-2xl rounded-br-2xl p-3 shadow-md flex place-items-center border border-teal-500">
        <div className="w-2 h-2 rounded-3xl bg-slate-100 mx-1 animate-bounce outline-dotted outline-1 outline-gray-500"></div>
        <div className="w-2 h-2 rounded-3xl bg-slate-100 mx-1 animate-bounce outline-dotted outline-1 outline-gray-500"></div>
        <div className="w-2 h-2 rounded-3xl bg-slate-100 mx-1 animate-bounce outline-dotted outline-1 outline-gray-500"></div>
      </div>
    </div>
  );
}

export default DotsMessage;
