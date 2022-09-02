import React, { useState } from 'react'

const TwoChoicesForm = (props) => {
    const {content, ...others} = props;
  
    const [choice, setChoice] = useState(null);
  
    const handleChoice = (res) => {
      console.log(res)
      setChoice(res)
    }
  
    const handleSendChoice = () => {
      props.setFormOrChat(choice)
    }
  
    return (
      <div className="relative">
        <div className="w-full flex flex-row">
          <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
            <div className="flex flex-row">
              <button className={`w-1/2 h-14 bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 cursor-pointer flex items-center justify-center ${(Object.keys(content).at(0) === choice) ? "bg-teal-500 text-white" : "hover:bg-white"}`} name={Object.keys(content).at(0)} onClick={() => handleChoice(Object.keys(content).at(0))}>{Object.values(content).at(0)}</button>
              <button className={`w-1/2 h-14 bg-gray-100 rounded-xl m-4 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 cursor-pointer flex items-center justify-center ${(Object.keys(content).at(1) === choice) ? "bg-teal-500 text-white" : "hover:bg-white"}`} name={Object.keys(content).at(1)} onClick={() => handleChoice(Object.keys(content).at(1))}>{Object.values(content).at(1)}</button>
            </div>
          </div>
        </div>
        <button className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 hover:bg-teal-500 hover:text-white" onClick={handleSendChoice}>
          OK
        </button>
      </div>
    )
  }

export default TwoChoicesForm