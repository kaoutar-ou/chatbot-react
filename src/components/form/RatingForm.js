import React, { useEffect, useRef, useState } from "react";
import BotMessage from "../messages/BotMessage";

const RatingForm = (props) => {
  const {
    content,
    sendRating,
    token,
    userType,
    setMainInputDisabled,
    handleAddNewMessage,
    ...others
  } = props;
  const [stars, setStars] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  let commentRef = useRef();

  const [isSent, setIsSent] = useState(false);

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
    // TODO set token to "" if inexistant
    let rating = {
      user_type: userType,
      token: token,
      rate: 0,
      comment: commentRef.current.value,
    };

    for (let i = 1; i <= 5; i++) {
      if (stars[i]) {
        rating.rate = i;
      }
    }

    console.log(token);
    console.log(rating);

    console.log(props);

    sendRating(rating);
    setIsSent(true);
  };

  const handleLater = () => {
    props.handleAddNewMessage(
      <BotMessage
        content={
          "Vous avez compléter toutes les étapes, vous pouvez maintenant continuer la conversation pour avoir plus d'informations."
        }
      />
    );
    setMainInputDisabled(false);
    setIsSent(true);
  };

  const [scale, setScale] = useState("scale-0");
  useEffect(() => {
    setTimeout(() => {
      setScale("scale-1");
    }, 1000);
  }, []);

  return (
    <div className={`transition-all duration-150 ease-out relative ${scale}`}>
      <div className="w-full flex flex-row">
        <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          <div className="flex flex-row m-6 p-2 justify-center outline-dotted outline-1 outline-gray-500 bg-gray-100 rounded-xl">
            {Object.entries(stars).map((star) => {
              return (
                <button
                  key={star[0]}
                  onClick={() => handleStars(star[0])}
                  disabled={isSent}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      star[1]
                        ? "stroke-amber-400 w-10 h-10 fill-yellow-400"
                        : "stroke-gray-500 stroke-1 w-10 h-10 hover:fill-yellow-200"
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
              className="w-full resize-none rounded-lg p-2 focus:outline-none disabled:outline disabled:outline-1 disabled:outline-teal-500"
              id={"comment"}
              name={"comment"}
              rows="4"
              ref={commentRef}
              cols="50"
              placeholder="Votre Avis ..."
              maxLength={1000}
              disabled={isSent}
            ></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="w-2/5 mx-6 outline-dotted outline-1 outline-gray-500 rounded-md bg-gray-100 text-gray-600 hover:outline-offset-1 enabled:hover:bg-amber-400 enabled:hover:text-white"
              onClick={handleRating}
              disabled={isSent}
            >
              Confirmer
            </button>
            <button
              className="w-2/5 mx-6 rounded-md text-gray-500 enabled:hover:text-gray-800"
              onClick={handleLater}
              disabled={isSent}
            >
              Plus tard ...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
