import React, { useState } from 'react'

const FormInput = (props) => {
    const {content, setInfos, infos, setInfosErrors, infosErrors, ...others} = props
    
    let key = content[0]
    // const [input, setInput] = useState("");
    const handleInputChange = (e) => {
        if(infosErrors[content[0]] !== "") {
            setInfosErrors((previous) => ({...previous, [content[0]]: ""}))
        }

        console.log(content[0])
        console.log(infosErrors)
        let value = e.target.value
        console.log(value)
        // setInfos((previous) => ({...previous, content[0]: value}))
        setInfos((previous) => ({...previous, [content[0]]: value}))
        // setInfos((previous) => (previous[content[0]] = value))
    }

    return (
        <div>
        <div className="w-full flex p-2 place-items-center" key={content[0]}>
                    <div className="flex-auto w-2/6 text-left">{content[1]}</div>
                    <input 
                        className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 focus:outline-none" 
                        placeholder={"Entrer Votre " + content[1]} id={content[0]} 
                        name={content[0]} 
                        onChange={(e) => handleInputChange(e)} 
                        value={infos[content[0]]}
                    ></input>
                </div>
                    {
                        (infosErrors[content[0]] && infosErrors[content[0]] !== "") ? (
                            <div className='text-red-500'>{infosErrors[content[0]]}</div>
                        ) : (
                            null
                        )
                    }
                </div>
    )
}

export default FormInput