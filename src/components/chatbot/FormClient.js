import React, { useRef, useState } from "react";
import CommentForm from "../form/CommentForm";
import InputsForm from "../form/InputsForm";
import RatingForm from "../form/RatingForm";
import SingleChoiceForm from "../form/SingleChoiceForm";
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
    }
    const fourthPage = {
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
        rate: null,
        comment: "",
    });

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
                            <SingleChoiceForm content={Object.entries(thirdPage).at(0)} choices={services}/>
                        ) : (
                            <CommentForm content={Object.entries(fourthPage).at(0)}/>
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












// TODO deactivate ok button after finishing

export default FormClient;
