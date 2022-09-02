import React from 'react'
import FormInput from './FormInput'

const InputsForm = (props) => {
    return (
        Object.entries(props.content).map((content) => {
            return (
                <FormInput key={content[0]} content={content}/>
            )
        }
        )   
    )
}

export default InputsForm