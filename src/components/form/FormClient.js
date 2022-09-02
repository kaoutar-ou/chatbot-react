import React, { useState } from "react";
import "../style.css"
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

    const services = {
        1: "Service 1",
        2: "Service 2",
        3: "Service 3",
        4: "Service 4",
        5: "Service 5"
    }

    const [rating, setRating] = useState({
        rate: "",
        comment: "",
    });

    // const rating = {
    //     rate: 0,
    //     comment: "Commentaire"
    // }

    const last_page = 4
    const [page, setPage] = useState(1);

    const handlePrevious = () => {
        (page > 1) ? setPage((page) => page - 1) : setPage(1)
    }
    
    const handleNext = () => {
        (page < last_page) ? setPage((page) => page + 1) : setPage(last_page)
    }

// TODO is active in calendar apres recoi de l email
  return (
    <>
    <RatingForm setRating={setRating}/>
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
                            <FormSingleChoice content={Object.entries(thirdPage).at(0)} choices={services}/>
                        ) : (
                            <FormComment content={Object.entries(fourthPage).at(0)}/>
                        )
                    )
                )
            }
          </div>
          <div className="-mb-3  w-full grid grid-cols-2 gap-4 text-xs">
            <button className="place-self-start flex place-items-center mx-3 disabled:text-gray-500" onClick={handlePrevious} disabled={(page === 1) ? true : false}>
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
            <button className="place-self-end flex place-items-center mx-3 disabled:text-gray-500" onClick={handleNext} disabled={(page === last_page) ? true : false}>
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
    </>
  );
}



const FormInput = (props) => {
    const {content, ...others} = props
    return (
        <div className="w-full flex p-2 place-items-center" key={content[0]}>
                    <div className="flex-auto w-2/6 text-left">{content[1]}</div>
                    <input className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 focus:outline-none" placeholder={"Entrer Votre " + content[1]} id={content[0]} name={content[0]}></input>
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

const FormSingleChoice = (props) => {
    const {content, choices, ...others} = props
    return (
        <div className="w-full flex p-2 place-items-center flex-col" key={content[0]}>
            <div className="flex-auto w-full mb-3">{content[1]}</div>
            {/* <input className="rounded-3xl flex-auto w-4/6 col-span-2 p-2 focus:outline-none" placeholder={"Entrer Votre " + content[1]} id={content[0]} name={content[0]}></input> */}
            {/* <select className="p-2 rounded-3xl w-full focus:outline-none text-center">
                <option>-- Select --</option>
                {
                    Object.entries(choices).map((choice) => {
                        return (
                            <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                        )
                    })
                }
            </select> */}
            <div className="p-2 rounded-3xl w-full focus:outline-none text-center max-h-32 overflow-y-auto chatbot-scrollbar-none">
                <div>Selectionner le service que vous cherchez</div>
                {
                    Object.entries(choices).map((choice) => {
                        return (
                            // <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                            <div key={choice[0]} value={choice[0 ]} className="bg-gray-100 rounded-xl m-1 p-1 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 hover:bg-white cursor-pointer">{choice[1]}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const FormComment = (props) => {
    const {content, ...others} = props
    return (
        <div className="w-full flex p-2 place-content-center flex-col" key={content[0]}>
            <div className="flex-auto w-full mb-3">Vous pouvez nous laisser un commentaire</div>
            <textarea className="w-full resize-none rounded-lg p-2 focus:outline-none" id={content[0]} name={content[0]} rows="4"
                        cols="50" placeholder="Laisser un commentaire ..." maxLength={1000}></textarea>
        </div>
    )
}

const RatingForm = (props) => {
    const {content, ...others} = props
    const [stars, setStars] = useState(
            {   
                1:false,
                2:false,
                3:false,
                4:false,
                5:false
            }
        );

    const handleStars = (star) => {
        let newStars = {}
        for (let i = 1; i <= 5; i++) {
            // const element = array[i];
            if(i<=star){
                newStars[i] = true
            } else {
                newStars[i] = false
            }
            // setStars((stars) => ({...stars, i: true}))
        }
        // if(star < 5) {
        //     for (let i = star + 1; i <= 5; i++) {
        //         newStars[i] = false
        //         // setStars((stars) => ({...stars, i: false}))
        //     }
        // }
        console.log(newStars)
        setStars(newStars)
    }

    return (
        <div className="relative">
      <div className="w-full flex flex-row">
        <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
            {/* <div> */}
                <div className="flex flex-row m-6 p-2 justify-center outline-dotted outline-1 outline-gray-500 bg-gray-100 rounded-xl">
                    {
                        Object.entries(stars).map((star) => {
                            return (
                                // <div>{star}</div>
                                <button onClick={() => handleStars(star[0])}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={(star[1]) ? "stroke-amber-400 w-10 h-10 fill-yellow-400" : "stroke-amber-400 stroke-1 w-10 h-10 hover:fill-yellow-200"}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                </button>
                            )
                        })
                    }
                </div>
                <div className="my-3 mx-6">
                    <textarea className="w-full resize-none rounded-lg p-2 focus:outline-none" id={"comment"} name={"comment"} rows="4"
                        cols="50" placeholder="Votre Avis ..." maxLength={1000}></textarea>
                </div>
            {/* </div> */}
        </div>
      </div>
      <button className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 hover:bg-teal-500 hover:text-white">
        OK
      </button>
    </div>
    )
}

export default FormClient;
