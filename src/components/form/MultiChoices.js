import React from "react";

function MultiChoices() {
  return (
    <div className="relative">
      <div className="w-full flex flex-row">
        <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          <div className="bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white">Choice</div>
          <div className="bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white">Choice</div>
          <div className="bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white">Choice</div>
          <div className="bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white">Choice</div>
        </div>
      </div>
      <button className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 hover:bg-teal-500 hover:text-white">
        OK
      </button>
    </div>
  );
}

export default MultiChoices;
