import React, { useState } from "react";

function MultiChoices(props) {
  const {content, ...others} = props

  const [type, setType] = useState(null);
  
  const handleChoice = (res) => {
    console.log(res)
    setType(res)
  }

  const handleSendChoice = () => {
    props.setUserType(type)
  }

  return (
    <div className="relative">
      <div className="w-full flex flex-row">
        <div className="w-full m-5 py-4 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          {
            Object.entries(content).map((choice) => {
              return (
                <button className={`w-5/6 bg-gray-100 rounded-xl m-1 p-2 last:mb-4 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 cursor-pointer ${(choice[0] === type) ? "bg-teal-500 text-white" : "hover:bg-white"}`}
                  key={choice[0]}
                  name={choice[0]}
                  onClick={() => handleChoice(choice[0])}
                  // TODO disabled={true}
                >
                  {choice[1]}
                </button>
              )
            })
          }
          {/* <div className="bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white cursor-pointer">Choice</div>
          <div className="bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white cursor-pointer">Choice</div>
          <div className="bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white cursor-pointer">Choice</div> */}
        </div>
      </div>
      <button className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 hover:bg-teal-500 hover:text-white"
        onClick={handleSendChoice}
      >
        OK
      </button>
    </div>
  );
}

// TODO votre email exist already .. vouz avez recu email du meet


export default MultiChoices;
