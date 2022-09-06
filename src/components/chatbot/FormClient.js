import React, { useEffect, useRef, useState } from "react";
import CommentForm from "../form/CommentForm";
import InputsForm from "../form/InputsForm";
import RatingForm from "../form/RatingForm";
import SingleChoiceForm from "../form/SingleChoiceForm";
import "../style.css";
import * as clientFormService from "../../services/ClientService";
import * as serviceService from "../../services/ServiceServices";
import * as ratingService from "../../services/RatingService";
import BotMessage from "../messages/BotMessage";

function FormClient(props) {
  const [clientInfos, setClientInfos] = useState({
    raison_sociale: "",
    email: "",
    telephone: "",
    adresse: "",
    service: "",
    comment: "",
  });

  const [clientInfosErrors, setClientInfosErrors] = useState({
    raison_sociale: "",
    email: "",
    telephone: "",
    adresse: "",
    service: "",
    comment: "",
  });

  useEffect(() => {
    console.log(clientInfos);
  }, [clientInfos]);

  const firstPage = {
    raison_sociale: "Raison sociale",
    email: "Email",
  };
  const secondPage = {
    telephone: "Telephone",
    adresse: "Adresse",
  };
  const thirdPage = {
    service: "Service",
  };
  const fourthPage = {
    comment: "Commentaire",
  };

  const [services, setServices] = useState(null);

  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {
    const getAllServices = async () => {
      let response = await serviceService.getAllServices();
      setServices(response.data.services);
      console.log(response.data.services);
    };

    getAllServices();
  }, []);

  const [rating, setRating] = useState({
    rate: null,
    comment: "",
  });

  const sendRating = async (sentRating) => {
    setRating(sentRating);
    ////////////////////////// TODO   add total votes
    // adding emojis
    console.log(clientToken);
    let response = await ratingService.saveRating(sentRating);
    console.log(response);

    if (Object.keys(response.errors).length > 0) {
      console.log(response.errors);
      if (
        response.errors.server_error !== undefined &&
        response.errors.server_error !== null
      ) {
        // setClientInfosErrors((prev) => ({...prev, server_error:response.errors.server_error}) )
      }
    } else {
      props.handleAddNewMessage(
        <BotMessage
          key={generateKey("chatbot")}
          content={response?.data?.message}
        />
      );
      setTimeout(() => {
        // TODO deactivate main input until finish
        props.handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content={
              "Vous avez compléter toutes les étapes, vous pouvez maintenant continuer la conversation pour avoir plus d'informations."
            }
          />
        );
        props.setMainInputDisabled(false);
      }, 2000);
    }
  };
  // TODO .. plus tard case
  const last_page = 4;
  const [page, setPage] = useState(1);

  const handlePrevious = () => {
    page > 1 ? setPage((page) => page - 1) : setPage(1);
  };

  const handleNext = () => {
    page < last_page ? setPage((page) => page + 1) : setPage(last_page);
  };

  const [isSent, setIsSent] = useState(false);

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  useEffect(() => {
    // TODO or clientToken
    if (isSent) {
      setTimeout(() => {
        console.log(clientToken);
        props.handleAddNewMessage(
          <BotMessage
            key={generateKey("chatbot")}
            content="Si vous voulez, vous pouvez nous donner votre avis, cela nous aidera à s'améliorer :)"
          />
        );
        setTimeout(() => {
          console.log(clientToken);
          props.handleAddNewMessage(
            <RatingForm
              key={"ClientRatingForm"}
              sendRating={sendRating}
              token={clientToken}
              userType={"client"}
              setMainInputDisabled={props.setMainInputDisabled}
              handleAddNewMessage={props.handleAddNewMessage}
            />
          );
        }, 1000);
      }, 2000);
    }
  }, [isSent]);

  const handleSendForm = async () => {
    let response = await clientFormService.saveClient(clientInfos);
    console.log(response);
    setClientInfosErrors((prev) => ({ ...prev, comment: "" }));
    if (Object.keys(response.errors).length > 0) {
      console.log(response.errors);
      if (
        response.errors.server_error !== undefined &&
        response.errors.server_error !== null
      ) {
        console.log("server");
        console.log(response.errors.server_error);
        setClientInfosErrors((prev) => ({
          ...prev,
          server_error: response.errors.server_error,
        }));
      } else {
        console.log("here");
        setClientInfosErrors(response.errors);
      }
    } else {
      console.log(response.data.token);
      setClientToken(response.data.token);
      setIsSent(true);
      setClientInfosErrors((prev) => ({ ...prev, server_error: "" }));
      props.handleAddNewMessage(
        <BotMessage
          key={generateKey("chatbot")}
          content={response?.data?.message}
        />
      );
      console.log(clientToken);
      // TODO .. show a success message or error
    }
  };
  const [scale, setScale] = useState("scale-0");
  useEffect(() => {
    setTimeout(() => {
      setScale("scale-1");
    }, 1000);
  }, []);
  // TODO is active in calendar apres recoi de l email
  return (
    <>
      <div className={`transition-all duration-150 ease-out relative ${scale}`}>
        <div className="w-full flex flex-row">
          <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
            <div className="w-11/12 p-3 ml-3">
              {page === 1 ? (
                <InputsForm
                  key={"FirstClientInputsForm"}
                  content={firstPage}
                  setInfos={setClientInfos}
                  infos={clientInfos}
                  setInfosErrors={setClientInfosErrors}
                  infosErrors={clientInfosErrors}
                  isSent={isSent}
                />
              ) : page === 2 ? (
                <InputsForm
                  key={"SecondClientInputsForm"}
                  content={secondPage}
                  setInfos={setClientInfos}
                  infos={clientInfos}
                  setInfosErrors={setClientInfosErrors}
                  infosErrors={clientInfosErrors}
                  isSent={isSent}
                />
              ) : page === 3 ? (
                <SingleChoiceForm
                  key={"ClientSingleChoiceForm"}
                  content={Object.entries(thirdPage).at(0)}
                  choices={services}
                  setInfos={setClientInfos}
                  infos={clientInfos}
                  setInfosErrors={setClientInfosErrors}
                  infosErrors={clientInfosErrors}
                  isSent={isSent}
                />
              ) : (
                <>
                  <CommentForm
                    content={Object.entries(fourthPage).at(0)}
                    setInfos={setClientInfos}
                    infos={clientInfos}
                    setInfosErrors={setClientInfosErrors}
                    infosErrors={clientInfosErrors}
                    isSent={isSent}
                  />
                  {clientInfosErrors["server_error"] &&
                  clientInfosErrors["server_error"] !== "" ? (
                    <div className="text-red-500">
                      {clientInfosErrors["server_error"]}
                    </div>
                  ) : null}
                </>
              )}
            </div>
            <div className="-mb-3  w-full grid grid-cols-2 gap-4 text-xs">
              <button
                className="place-self-start flex place-items-center mx-3 disabled:text-gray-500"
                onClick={handlePrevious}
                disabled={page === 1 ? true : false}
              >
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
              <button
                className="place-self-end flex place-items-center mx-3 disabled:text-gray-500"
                onClick={handleNext}
                disabled={page === last_page ? true : false}
              >
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
        <button
          className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 enabled:hover:bg-teal-500 enabled:hover:text-white disabled:text-gray-300"
          disabled={page === last_page && !isSent ? false : true}
          onClick={handleSendForm}
        >
          OK
        </button>
      </div>
    </>
  );
}

// TODO Tooltip .. error msgs .. animation

// TODO deactivate ok button after finishing

export default FormClient;
