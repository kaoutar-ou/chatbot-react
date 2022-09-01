import React from "react";
import send from "../../send.svg";
import voice from "../../micro.svg";

function ChatbotFooter() {
  return (
    <div className="bg-gradient-to-l from-teal-500 to-amber-300 flex bottom-0 absolute h-16 w-full shadow-md items-center">
      <div className="flex-auto">
        <div className="rounded-lg mx-1">
          <input
            className="w-11/12 rounded-2xl h-10 my-2 mx-2 pl-3 outline-dotted outline-1 outline-gray-500"
            type={"text"}
            placeholder="Type something here ..."
          ></input>
        </div>
      </div>
      <div className="flex-none w-24 flex">
        <div className="w-12">
          <button className="p-2 w-10 h-10 rounded-full hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300">
            {/* <img width={25} src={voice} alt="voice"></img> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
        <div className="w-12 mr-2">
          <button className="p-1 w-10 h-10 rounded-full hover:outline-dashed hover:outline-1 hover:outline-gray-600 focus:outline-offset-2 hover:bg-gradient-to-t hover:from-amber-300">
            {/* <img width={25} src={send} alt="send"></img> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white stroke-2 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotFooter;
