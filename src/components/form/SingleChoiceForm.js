import React from 'react'

const SingleChoiceForm = (props) => {
    const {content, choices, ...others} = props
    return (
        <div className="w-full flex p-2 place-items-center flex-col" key={content[0]}>
            <div className="flex-auto w-full mb-3">{content[1]}</div>
            <div className="p-2 rounded-3xl w-full focus:outline-none text-center max-h-32 overflow-y-auto chatbot-scrollbar-none">
                <div>Selectionner le service que vous cherchez</div>
                {
                    Object.entries(choices).map((choice) => {
                        return (
                            <div key={choice[0]} value={choice[0 ]} className="bg-gray-100 rounded-xl m-1 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white cursor-pointer">{choice[1]}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SingleChoiceForm