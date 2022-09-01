import React from "react";
import "./style.css"
import send from "../../send.svg"
import voice from "../../micro.svg"

function Chatbot() {
  return (

    <div className="h-screen chatbot">
      <div className="flex w-full h-18 fixed bg-gradient-to-r from-teal-500 to-yellow-200 shadow-md z-50">
        <span className="flex items-center text-white font-bold text-lg p-2">
          Chatbot header
        </span>
      </div>

      <div className="overflow-y-scroll min-h-screen max-h-screen flex flex-col-reverse py-20 chatbot-messages">
        <div>Hi</div>
        <div className="w-full flex flex-row">
          <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
            <div>Bot message</div>
          </div>
        </div>
        <div className="w-full flex flex-row-reverse">
          <div className="bg-teal-500 m-3 rounded-t-2xl rounded-bl-2xl p-4">
            <div>Bot message</div>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
            <div>Bot message</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-l from-teal-500 to-yellow-200 flex bottom-0 absolute h-16 w-full shadow-md items-center">
        <div className="flex-auto">
          <div className="rounded-lg mx-1">
            <input
              className="w-11/12 rounded-2xl h-10 my-2 mx-2 pl-3 focus:outline-none"
              type={"text"}
              placeholder="Type something here ..."
            ></input>
          </div>
        </div>
        <div className="flex-none w-24 flex">
          <div className="w-1/2">
            <button>
              <img width={25} src={voice} alt="voice"></img>
            </button>
          </div>
          <div className="w-1/2 mr-3">
            <button>
              <img width={25} src={send} alt="send"></img>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Chatbot;
