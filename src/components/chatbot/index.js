import React from "react";

function Chatbot() {
  return (
    <div className="min-h-screen w-full">
      <div className="bg-gradient-to-r from-teal-500 to-yellow-200 w-full h-16 shadow-md">
        Chatbot header
      </div>
      <div className="w-full h-full">
        {/* <div className=""> */}
          <div className="absolute bottom-28">
            <div className="">
              <div className="h-fit w-fit bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
                <div>Bot message</div>
              </div>
            </div>
            <div className="w-full">
              <div className="h-fit w-fit bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
                <div>User message</div>
              </div>
            </div>
          <div>
            <div className="h-fit w-fit bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4 flex place-items-center">
              <div className="w-3 h-3 rounded-3xl bg-slate-200 mx-1 animate-bounce"></div>
              <div className="w-3 h-3 rounded-3xl bg-slate-200 mx-1 animate-bounce"></div>
              <div className="w-3 h-3 rounded-3xl bg-slate-200 mx-1 animate-bounce"></div>
            </div>
          </div>
          </div>
        {/* </div> */}
      </div>
      <div className="bg-gradient-to-l from-teal-500 to-yellow-200 flex bottom-0 absolute h-16 w-full shadow-md">
        <div className="flex-auto">
          <div className="rounded-lg mx-1">
            <input
              className="w-11/12 rounded-2xl h-12 my-2 mx-2"
              type={"text"}
              placeholder="Type something here ..."
            ></input>
          </div>
        </div>
        <div className="flex-none w-28 flex">
          <div className="w-1/2">
            <button>voice</button>
          </div>
          <div className="w-1/2">
            <button>send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
