import React from "react";
import "./style.css"
function Chatbot() {
  return (
    <div className="h-screen">
      <div className="flex w-full h-18 fixed bg-gradient-to-r from-teal-500 to-yellow-200 shadow-md z-50">
        <span className="flex items-center text-white font-bold text-lg p-2">
          Chatbot header
        </span>
      </div>

      {/* <div
        className="flex flex-col mt-24 bg-gray-200  overflow-scroll p-2 w-full"
        style={{ height: "80vh" }}
      >
        <div className="user flex flex-row my-2 w-full p-2">
          <span className="w-2/3">hi</span>
          <span className="w-1/3 bg-gray-100 p-2 rounded">hi</span>
        </div>
      </div> */}
      {/* <div className="bottom-16 w-full"> */}
      <div className="overflow-y-scroll min-h-screen max-h-screen flex flex-col-reverse py-20">
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
      {/* </div> */}

      <div className="bg-gradient-to-l from-teal-500 to-yellow-200 flex bottom-0 absolute h-16 w-full shadow-md items-center">
        <div className="flex-auto">
          <div className="rounded-lg mx-1">
            <input
              className="w-11/12 rounded-2xl h-10 my-2 mx-2"
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

    /* <div className="flex flex-row justify-between items-center p-1 h-5/6 w-full -bottom-5">
        <div className="flex flex-row justify-between flex-1 bg-white w-full">
          <input
            className=" bg-gray-200 w-2/3 p-2 "
            placeholder="Type a message"
          />
          <button
            className=" bg-black p-2 ml-2 w-1/3  text-white"
            type="submit"
          >
            {" "}
            Send
          </button>
        </div>
      </div>
      </div> */

    // <div className="max-h-screen w-full overflow-hidden">
    //   <div className="bg-gradient-to-r from-teal-500 to-yellow-200 w-full h-16 shadow-md">
    //     Chatbot header
    //   </div>
    //   <div className="overflow-y-scroll max-h-screen pb-32">
    //     {/* <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div> */}
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hi</div>
    //     <div>hii</div>
    //   </div>
    //   <div className="bg-gradient-to-l from-teal-500 to-yellow-200 flex bottom-0 absolute h-16 w-full shadow-md items-center">
    //     <div className="flex-auto">
    //       <div className="rounded-lg mx-1">
    //         <input
    //           className="w-11/12 rounded-2xl h-12 my-2 mx-2"
    //           type={"text"}
    //           placeholder="Type something here ..."
    //         ></input>
    //       </div>
    //     </div>
    //     <div className="flex-none w-28 flex">
    //       <div className="w-1/2">
    //         <button>voice</button>
    //       </div>
    //       <div className="w-1/2">
    //         <button>send</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="min-h-screen w-full">
    //   <div className="bg-gradient-to-r from-teal-500 to-yellow-200 w-full h-16 shadow-md">
    //     Chatbot header
    //   </div>
    //   <div className="w-full h-full overflow-y-auto">
    //     {/* <div className=""> */}
    //     <div className="absolute bottom-16 w-full">
    //       <div className="w-full flex flex-row">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
    //           <div>Bot message</div>
    //         </div>
    //       </div>
    //       <div className="w-full flex flex-row-reverse">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-bl-2xl p-4">
    //           <div>User message</div>
    //         </div>
    //       </div>

    //       <div className="w-full flex flex-row">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
    //           <div>Bot message</div>
    //         </div>
    //       </div>
    //       <div className="w-full flex flex-row-reverse">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-bl-2xl p-4">
    //           <div>User message</div>
    //         </div>
    //       </div>
    //       <div className="w-full flex flex-row">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
    //           <div>Bot message</div>
    //         </div>
    //       </div>
    //       <div className="w-full flex flex-row-reverse">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-bl-2xl p-4">
    //           <div>User message</div>
    //         </div>
    //       </div>
    //       <div className="w-full flex flex-row">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4">
    //           <div>Bot message</div>
    //         </div>
    //       </div>
    //       <div className="w-full flex flex-row-reverse">
    //         <div className="bg-teal-500 m-3 rounded-t-2xl rounded-bl-2xl p-4">
    //           <div>User message</div>
    //         </div>
    //       </div>

    //       <div>
    //         <div className="h-fit w-fit bg-teal-500 m-3 rounded-t-2xl rounded-br-2xl p-4 flex place-items-center">
    //           <div className="w-3 h-3 rounded-3xl bg-slate-200 mx-1 animate-bounce"></div>
    //           <div className="w-3 h-3 rounded-3xl bg-slate-200 mx-1 animate-bounce"></div>
    //           <div className="w-3 h-3 rounded-3xl bg-slate-200 mx-1 animate-bounce"></div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* </div> */}
    //   </div>
    //   <div className="bg-gradient-to-l from-teal-500 to-yellow-200 flex bottom-0 absolute h-16 w-full shadow-md items-center">
    //     <div className="flex-auto">
    //       <div className="rounded-lg mx-1">
    //         <input
    //           className="w-11/12 rounded-2xl h-12 my-2 mx-2"
    //           type={"text"}
    //           placeholder="Type something here ..."
    //         ></input>
    //       </div>
    //     </div>
    //     <div className="flex-none w-28 flex">
    //       <div className="w-1/2">
    //         <button>voice</button>
    //       </div>
    //       <div className="w-1/2">
    //         <button>send</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Chatbot;
