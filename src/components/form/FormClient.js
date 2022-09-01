import React, { useState } from "react";


const FormInput = (props) => {
    const {content, ...others} = props
    return (
        <div className="w-full flex p-2 place-items-center" key={content[0]}>
                    <div className="flex-auto w-2/6 text-left">{content[1]}</div>
                    <input className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 hover:outline-none" placeholder={"Entrer Votre " + content[1]} id={content[0]} name={content[0]}></input>
                </div>
    )
}
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

// const ChoiceTextForm = (props) => {
//     const {content, ...others} = props
//     return (
//         <>
//         <FormOneChoice content={Object.entries(content).at(0)} />
//         <FormTextArea content={Object.entries(content).at(1)} />
//         </>
//     )
// }

const FormOneChoice = (props) => {
    const {content, ...others} = props
    return (
        <div className="w-full flex p-2 place-items-center" key={content[0]}>
            <div className="flex-auto w-2/6 text-left">{content[1]}</div>
            <input className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 hover:outline-none" placeholder={"Entrer Votre " + content[1]} id={content[0]} name={content[0]}></input>
        </div>
    )
}

const FormComment = (props) => {
    const {content, ...others} = props
    return (
        <div className="w-full flex p-2 place-content-center flex-col" key={content[0]}>
            <div className="flex-auto w-full my-3">Vous pouvez nous laisser un commentaire</div>
            <textarea class="w-full resize-none rounded-lg p-2" id={content[0]} name={content[0]} rows="4"
                        cols="50" placeholder="Laisser un commentaire ..." maxlength={1000}></textarea>
        </div>
    )
}

function FormClient() {
    const [clientInfos, setClientInfos] = useState({
        raison_sociale: "",
        email: "",
        telephone: "",
        adresse: "",
        service: "",
        comment: "",
    });
    const firstPage = {
        raison_sociale: "Raison sociale",
        email: "Email",
    }
    const secondPage = {
        telephone: "Telephone",
        adresse: "Adresse",
    }
    const thirdPage = {
        service: "Service",
        // comment: "Commentaire",
    }
    const fourthPage = {
        // service: "Service",
        comment: "Commentaire",
    }

    const last_page = 4
    const [page, setPage] = useState(1);

    const handlePrevious = () => {
        (page > 1) ? setPage((page) => page - 1) : setPage(1)
    }
    
    const handleNext = () => {
        (page < last_page) ? setPage((page) => page + 1) : setPage(last_page)
    }

  return (
    <div className="relative">
      <div className="w-full flex flex-row">
        <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          <div className="w-11/12 p-3 ml-3">
            {
                (page === 1) ? (
                    <InputsForm content={firstPage} />
                ) : (
                    (page === 2) ? (
                        <InputsForm content={secondPage} />
                    ) : (
                        (page === 3) ? (
                            <FormOneChoice content={Object.entries(thirdPage).at(0)}/>
                        ) : (
                            <FormComment content={Object.entries(fourthPage).at(0)}/>
                        )
                    )
                )
            }
            
            {/* <div className="w-full flex p-2 place-items-center">
              <div className="flex-auto w-2/6 text-left">hi</div>
              <input className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 hover:outline-none" placeholder="ppp"></input>
            </div>
            <div className="w-full flex p-2 place-items-center">
              <div className="flex-auto w-2/6 text-left">hi</div>
              <input className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 hover:outline-none" placeholder="ppp"></input>
            </div> */}
          </div>
          <div className="-mb-3  w-full grid grid-cols-2 gap-4 text-xs">
            <button className="place-self-start flex place-items-center mx-3" onClick={handlePrevious}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
              <div className="mx-1">précédent</div>
            </button>
            <button className="place-self-end flex place-items-center mx-3" onClick={handleNext}>
              <div className="mx-1">suivant</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 hover:bg-teal-500 hover:text-white">
        OK
      </button>
    </div>
  );
}

export default FormClient;
