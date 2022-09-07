import React, { useEffect, useState } from 'react'
import CalendarForm from '../form/CalendarForm';
import CommentForm from '../form/CommentForm';
import InputsForm from '../form/InputsForm';
import SingleChoiceForm from '../form/SingleChoiceForm';
import BotMessage from '../messages/BotMessage';

import * as partenaireService from "../../services/PartenaireService";
import * as partenariatService from "../../services/PartenariatService";
import * as ratingService from "../../services/RatingService";
import RatingForm from '../form/RatingForm';

function FormPartenaire(props) {

    const generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
      };

    const [partenaireInfos, setPartenaireInfos] = useState({
        raison_sociale: "",
        email: "",
        telephone: "",
        adresse: "",
        nombre_employes: "",
        partenariat: "",
        calendar: "",
        comment: "",
      });
    
      const [partenaireInfosErrors, setPartenaireInfosErrors] = useState({
        raison_sociale: "",
        email: "",
        telephone: "",
        adresse: "",
        nombre_employes: "",
        partenariat: "",
        calendar: "",
        comment: "",
      });

      const [rating, setRating] = useState({
        rate: null,
        comment: "",
      });

// TODO ... date d expiration du token

      // TODO ... Handle inexistance case
      const [partenariats, setPartenariats] = useState({});

    const [partenaireToken, setPartenaireToken] = useState(null);
    
    const [page, setPage] = useState(1);

    const [isConfirmed, setIsConfirmed] = useState(false);

      const [isSent, setIsSent] = useState(false);

    const last_page = 5;

      const firstPage = {
        raison_sociale: "Raison sociale",
        email: "Email",
      };
      const secondPage = {
        telephone: "Telephone",
        adresse: "Adresse",
        nombre_employes: "Nombre d'employés",
      };
      const thirdPage = {
        partenariat: "Type du partenariat",
      };
      const fourthPage = {
        document_joint: "Document joint"
      }
      const fifthPage = {
        comment: "Commentaire",
      };

      const handlePrevious = () => {
        page > 1 ? setPage((page) => page - 1) : setPage(1);
      };
    
      const handleNext = () => {
        page < last_page ? setPage((page) => page + 1) : setPage(last_page);
      };


      useEffect(() => {
        const getAllPartenariats = async () => {
          let response = await partenariatService.getAllPartenariats();
          setPartenariats(response?.data?.partenariats);
        };
    
        getAllPartenariats();
      }, []);

      useEffect(() => {
        // TODO or partenaireToken
        if (isSent) {
          setTimeout(() => {
            props.handleAddNewMessage(
              <BotMessage
                key={generateKey("chatbot")}
                content="Si vous voulez, vous pouvez nous donner votre avis, cela nous aidera à s'améliorer :)"
              />
            );
            setTimeout(() => {
              props.handleAddNewMessage(
                <RatingForm
                  key={"PartenaireRatingForm"}
                  sendRating={sendRating}
                  token={partenaireToken}
                  userType={"partenaire"}
                  setMainInputDisabled={props.setMainInputDisabled}
                  handleAddNewMessage={props.handleAddNewMessage}
                />
              );
            }, 1000);
          }, 2000);
        }
      }, [isSent]);

      const sendRating = async (sentRating) => {
        setRating(sentRating);
        let response = await ratingService.saveRating(sentRating);
    
        if (Object.keys(response.errors).length > 0) {
          if (
            response.errors.server_error !== undefined &&
            response.errors.server_error !== null
          ) {
            // setPartenaireInfosErrors((prev) => ({...prev, server_error:response.errors.server_error}) )
          }
        } else {
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content={response?.data?.message}
            />
          );
          setTimeout(() => {
            props.handleAddNewMessage(
              <BotMessage
                key={generateKey("chatbot")}
                content={
                  "Vous avez compléter toutes les étapes, vous pouvez maintenant continuer la conversation pour avoir plus d'informations."
                }
              />
            );
            props.setMainInputDisabled(false);
          }, 1000);
        }
      };

      const handleConfirmForm = async () => {

        let response = await partenaireService.verifyPartenaireInfos(partenaireInfos);
        setPartenaireInfosErrors((prev) => ({ ...prev, comment: "" }));
        if (Object.keys(response).length > 0) {
          if (
            response.server_error !== undefined &&
            response.server_error !== null
          ) {
            setPartenaireInfosErrors((prev) => ({
              ...prev,
              server_error: response.server_error,
            }));
          } else {
            setPartenaireInfosErrors(response);
          }
        } else {
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content="Pour finir votre inscription, veuillez choisir l'un des créneaux valables en haut, celui qui vous convient."
            />
          );
          setTimeout(() => {
            setIsConfirmed(true);
          }, 1000);
          setPartenaireInfosErrors((prev) => ({ ...prev, server_error: "" }));
      }
    }

// TODO .. if partenariat / domaine / sevice vide .. say sorry .. 

    const handleSendForm = async () => {
        let response = await partenaireService.savePartenaire(partenaireInfos);
        
        setPartenaireInfosErrors((prev) => ({ ...prev, comment: "" }));
        if (Object.keys(response.errors).length > 0) {
          
          if (
            response.errors.server_error !== undefined &&
            response.errors.server_error !== null
          ) {
            
            
            setPartenaireInfosErrors((prev) => ({
              ...prev,
              server_error: response.errors.server_error,
            })); 
          } else {
            
            setPartenaireInfosErrors(response.errors);
          }
        } else {
          
          setPartenaireToken(response.data.token);
          setIsSent(true);
          setPartenaireInfosErrors((prev) => ({ ...prev, server_error: "" }));
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content={response?.data?.message}
            />
          );
          
          // TODO .. show a success message or error
        }
      };



      const [scale, setScale] = useState("scale-0");
    useEffect(() => {
        setTimeout(() => {
        setScale("scale-1");
        }, 1000);
    }, []);
  return (
    <>
          {
            (isConfirmed) ? (
              <>
              <CalendarForm
                  key={"PartenaireCalendarForm"}
                  handleSendForm={handleSendForm}
                  setInfos={setPartenaireInfos}
                  infos={partenaireInfos}
                  setInfosErrors={setPartenaireInfosErrors}
                  infosErrors={partenaireInfosErrors}
                  isSent={isSent}
                />
                </>
            ) : null
          }
          <div className={`transition-all duration-150 ease-out relative ${scale}`}>
            <div className="w-full flex flex-row">
              <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
                <div className="w-11/12 p-3 ml-3">
                  {page === 1 ? (
                    <InputsForm
                      key={"FirstPartenaireInputsForm"}
                      content={firstPage}
                      setInfos={setPartenaireInfos}
                      infos={partenaireInfos}
                      setInfosErrors={setPartenaireInfosErrors}
                      infosErrors={partenaireInfosErrors}
                      isConfirmed={isConfirmed}
                    />
                  ) : page === 2 ? (
                    <InputsForm
                      key={"SecondPartenaireInputsForm"}
                      content={secondPage}
                      setInfos={setPartenaireInfos}
                      infos={partenaireInfos}
                      setInfosErrors={setPartenaireInfosErrors}
                      infosErrors={partenaireInfosErrors}
                      isConfirmed={isConfirmed}
                    />
                  ) : page === 3 ? (
                            <SingleChoiceForm
                                key={"PartenaireSingleChoiceForm"}
                                content={Object.entries(thirdPage).at(0)}
                                choices={partenariats}
                                setInfos={setPartenaireInfos}
                                infos={partenaireInfos}
                                setInfosErrors={setPartenaireInfosErrors}
                                infosErrors={partenaireInfosErrors}
                                isConfirmed={isConfirmed}
                            />
                    ) : page === 4 ? (
                        <></>
                    ) : (
                    <>
                      <CommentForm
                        content={Object.entries(fifthPage).at(0)}
                        setInfos={setPartenaireInfos}
                        infos={partenaireInfos}
                        setInfosErrors={setPartenaireInfosErrors}
                        infosErrors={partenaireInfosErrors}
                        isConfirmed={isConfirmed}
                      />
                      {partenaireInfosErrors["server_error"] &&
                      partenaireInfosErrors["server_error"] !== "" ? (
                        <div className="text-red-500">
                          {partenaireInfosErrors["server_error"]}
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
              disabled={page === last_page && !isConfirmed ? false : true}
              onClick={handleConfirmForm}
            >
              OK
            </button>
          </div>
        </>
  )
}

export default FormPartenaire