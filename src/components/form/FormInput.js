import React from 'react'

const FormInput = (props) => {
    const {content, ...others} = props
    return (
        <div className="w-full flex p-2 place-items-center" key={content[0]}>
                    <div className="flex-auto w-2/6 text-left">{content[1]}</div>
                    <input className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 focus:outline-none" placeholder={"Entrer Votre " + content[1]} id={content[0]} name={content[0]}></input>
                </div>
    )
}

export default FormInput