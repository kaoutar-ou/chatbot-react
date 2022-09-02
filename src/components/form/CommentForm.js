import React from 'react'

const CommentForm = (props) => {
    const {content, ...others} = props
    return (
        <div className="w-full flex p-2 place-content-center flex-col" key={content[0]}>
            <div className="flex-auto w-full mb-3">Vous pouvez nous laisser un commentaire</div>
            <textarea className="w-full resize-none rounded-lg p-2 focus:outline-none" id={content[0]} name={content[0]} rows="4"
                        cols="50" placeholder="Laisser un commentaire ..." maxLength={1000}></textarea>
        </div>
    )
}

export default CommentForm