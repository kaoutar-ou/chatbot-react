import React, { useRef, useState } from "react";

const RatingForm = (props) => {
  const { content, ...others } = props;
  const [stars, setStars] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  let commentRef = useRef();

  const handleStars = (star) => {
    let newStars = {};
    for (let i = 1; i <= 5; i++) {
      if (i <= star) {
        newStars[i] = true;
      } else {
        newStars[i] = false;
      }
    }
    setStars(newStars);
  };

  const handleRating = () => {
    let rating = {
      rate: 0,
      comment: commentRef.current.value,
    };

    for (let i = 1; i <= 5; i++) {
      if (stars[i]) {
        rating.rate = i;
      }
    }

    console.log(rating);

    props.setRating(rating);
  };

  return (
    <div className="relative">
      <div className="w-full flex flex-row">
        <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          <div className="flex flex-row m-6 p-2 justify-center outline-dotted outline-1 outline-gray-500 bg-gray-100 rounded-xl">
            {Object.entries(stars).map((star) => {
              return (
                <button key={star[0]} onClick={() => handleStars(star[0])}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      star[1]
                        ? "stroke-amber-400 w-10 h-10 fill-yellow-400"
                        : "stroke-amber-400 stroke-1 w-10 h-10 hover:fill-yellow-200"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
          <div className="my-3 mx-6">
            <textarea
              className="w-full resize-none rounded-lg p-2 focus:outline-none"
              id={"comment"}
              name={"comment"}
              rows="4"
              ref={commentRef}
              cols="50"
              placeholder="Votre Avis ..."
              maxLength={1000}
            ></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <button className="w-1/4 mx-10 outline-dotted outline-1 outline-gray-500 rounded-md bg-amber-200 hover:outline-offset-1 hover:bg-amber-400 hover:text-white">
              Confirmer
            </button>
            <button className="w-1/4 mx-10 rounded-md text-gray-500 hover:text-gray-800">Plus tard ...</button>
          </div>
        </div>
      </div>
      {/* <button
        className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 hover:bg-teal-500 hover:text-white"
        onClick={handleRating}
      >
        OK
      </button> */}
    </div>
  );
};

export default RatingForm;
