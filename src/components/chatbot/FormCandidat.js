import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import CalendarForm from '../form/CalendarForm';
import CommentForm from '../form/CommentForm';
import InputsForm from '../form/InputsForm';
import BotMessage from '../messages/BotMessage';

import * as candidatService from "../../services/CandidatService";
import * as candidatureService from "../../services/CandidatureService";
import * as ratingService from "../../services/RatingService";
import * as offreService from "../../services/OffreService";
import RatingForm from '../form/RatingForm';
import FileForm from '../form/FileForm';
import SingleChoiceFormCondition from '../form/SingleChoiceFormCondition';

function FormCandidat(props) {
  const { t, i18n } = useTranslation('candidat');

    const generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
      };

    const [candidatInfos, setCandidatInfos] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        calendar: "",
        comment: "",
      });
    
      const [candidatInfosErrors, setCandidatInfosErrors] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        calendar: "",
        comment: "",
      });

      const [candidatureInfos, setCandidatureInfos] = useState({
        type: "",
        offre: "",
        path: "",
        token: "",
      });
    
      const [candidatureInfosErrors, setCandidatureInfosErrors] = useState({
        type: "",
        offre: "",
        path: "",
        token: "",
      });

      const [rating, setRating] = useState({
        rate: null,
        comment: "",
      });

// TODO ... date d expiration du token

      // TODO ... Handle inexistance case
    const [offres, setOffres] = useState({});

    const [candidatToken, setCandidatToken] = useState(null);
    
    const [page, setPage] = useState(1);

    const [isConfirmed, setIsConfirmed] = useState(false);

      const [isSent, setIsSent] = useState(false);

    const last_page = 5;

    const type_candidature = {
        spontanee: t("candidatureSpontanee"),
        choix_offre: t("candidatureOffre"),
    }

      const firstPage = {
        nom: t("nom"),
        prenom: t("prenom"),
        email: t("email"),
      };
      const secondPage = {
        telephone: t("telephone"),
        adresse: t("adresse"),
      };
      const thirdPage = {
        type_candidature: t("typeCandidature"),
        offre: t("offre"),
      };
      const fourthPage = {
        path: t("cv")
      }
      const fifthPage = {
        comment: t("comment"),
      };

      const handlePrevious = () => {
        page > 1 ? setPage((page) => page - 1) : setPage(1);
      };
    
      const handleNext = () => {
        page < last_page ? setPage((page) => page + 1) : setPage(last_page);
      };


      useEffect(() => {
        const getAllOffres = async () => {
          let response = await offreService.getAllOffres();
          setOffres(response?.data?.offres);
        };
    
        getAllOffres();
      }, []);

      useEffect(() => {
        // TODO or candidatToken
        if (isSent) {
          setTimeout(() => {
            props.handleAddNewMessage(
              <BotMessage
                key={generateKey("chatbot")}
                content={t("wantToRate")}
              />
            );
            setTimeout(() => {
              props.handleAddNewMessage(
                <RatingForm
                  key={"CandidatRatingForm"}
                  sendRating={sendRating}
                  token={candidatToken}
                  userType={"candidat"}
                  setMainInputDisabled={props.setMainInputDisabled}
                  handleAddNewMessage={props.handleAddNewMessage}
                />
              );
            }, 1000);
          }, 1000);
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
            // setCandidatInfosErrors((prev) => ({...prev, server_error:response.errors.server_error}) )
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
                  t("completed")
                }
              />
            );
            props.setMainInputDisabled(false);
          }, 1000);
        }
      };

      const handleConfirmForm = async () => {

        let response = await candidatService.verifyCandidatInfos(candidatInfos);

        let responseCandidature = await candidatureService.verifyCandidatureInfos(candidatureInfos)
        
        setCandidatInfosErrors((prev) => ({ ...prev, comment: "" }));
        
        if (Object.keys(response).length > 0 || Object.keys(responseCandidature).length > 0) {
            if (Object.keys(response).length > 0 ) {
          
            setCandidatInfosErrors(response);}
            if (Object.keys(responseCandidature).length > 0) {
                setCandidatureInfosErrors(responseCandidature);
            }
        } else {
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content={t("calendarChoice")}
            />
          );
          setTimeout(() => {
            setIsConfirmed(true);
          }, 1000);
          setCandidatInfosErrors((prev) => ({ ...prev, server_error: "" }));
      }
    }

// TODO .. if partenariat / choix / domaine / sevice vide .. say sorry .. 

    const handleSendForm = async () => {
        let response = await candidatService.saveCandidat(candidatInfos);
        
        setCandidatInfosErrors((prev) => ({ ...prev, comment: "" }));
        if (Object.keys(response.errors).length > 0) {
          
          if (
            response.errors.server_error !== undefined &&
            response.errors.server_error !== null
          ) {
            
            
            setCandidatInfosErrors((prev) => ({
              ...prev,
              server_error: response.errors.server_error,
            })); 
          } else {
            
            setCandidatInfosErrors(response.errors);
          }
        } else {
          
          setCandidatToken(response.data.token);


          // setCandidatureInfos((prev) => ({...prev, token:response.data.token}))
          handleSetCandidatureInfos(response.data.token)
          let responseCandidature = await handleSaveCandidature(response.data.token)
          setCandidatInfosErrors((prev) => ({ ...prev, comment: "" }));

          if (Object.keys(responseCandidature.errors).length > 0) {
          
            if (
              responseCandidature.errors.server_error !== undefined &&
              responseCandidature.errors.server_error !== null
            ) {
              setCandidatInfosErrors((prev) => ({
                ...prev,
                server_error: responseCandidature.errors.server_error,
              })); 
            } else {
              setCandidatInfosErrors(responseCandidature.errors);
            }
          } else {
            setIsSent(true);
            setCandidatInfosErrors((prev) => ({ ...prev, server_error: "" }));
            props.handleAddNewMessage(
              <BotMessage
                key={generateKey("chatbot")}
                content={response?.data?.message}
              />
            );
          }
          // TODO .. show a success message or error

          // TODO .. count number of messages then rate
          
          // TODO .. presentation de l'entreprise au début
        }
      };

      const handleSetCandidatureInfos = (token) => {
        setCandidatureInfos((prev) => ({...prev, token:token}))
        // console.log(candidatureInfos)
      }

      const handleSaveCandidature = async (token) => {
        return await candidatureService.saveCandidature(candidatureInfos, token);
      }


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
                  key={"CandidatCalendarForm"}
                  handleSendForm={handleSendForm}
                  setInfos={setCandidatInfos}
                  infos={candidatInfos}
                  setInfosErrors={setCandidatInfosErrors}
                  infosErrors={candidatInfosErrors}
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
                      key={"FirstCandidatInputsForm"}
                      content={firstPage}
                      setInfos={setCandidatInfos}
                      infos={candidatInfos}
                      setInfosErrors={setCandidatInfosErrors}
                      infosErrors={candidatInfosErrors}
                      isSent={isConfirmed}
                    />
                  ) : page === 2 ? (
                    <InputsForm
                      key={"SecondCandidatInputsForm"}
                      content={secondPage}
                      setInfos={setCandidatInfos}
                      infos={candidatInfos}
                      setInfosErrors={setCandidatInfosErrors}
                      infosErrors={candidatInfosErrors}
                      isSent={isConfirmed}
                    />
                  ) : page === 3 ? (
                            <SingleChoiceFormCondition
                                key={"CandidatSingleChoiceForm"}
                                content={thirdPage}
                                types={type_candidature}
                                choices={offres}
                                setInfos={setCandidatureInfos}
                                infos={candidatureInfos}
                                setInfosErrors={setCandidatureInfosErrors}
                                infosErrors={candidatureInfosErrors}
                                isConfirmed={isConfirmed}
                            />
                    ) : page === 4 ? (
                        <>
                          <FileForm 
                            key={"CandidatCandidatureCVForm"}
                            content={fourthPage}
                            setInfos={setCandidatureInfos}
                            infos={candidatureInfos}
                            setInfosErrors={setCandidatureInfosErrors}
                            infosErrors={candidatureInfosErrors}
                            isSent={isConfirmed}
                          />
                        </>
                    ) : (
                    <>
                      <CommentForm
                        content={Object.entries(fifthPage).at(0)}
                        setInfos={setCandidatInfos}
                        infos={candidatInfos}
                        setInfosErrors={setCandidatInfosErrors}
                        infosErrors={candidatInfosErrors}
                        isSent={isConfirmed}
                      />
                      {candidatInfosErrors["server_error"] &&
                      candidatInfosErrors["server_error"] !== "" ? (
                        <div className="text-red-500">
                          {candidatInfosErrors["server_error"]}
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
                    <div className="mx-1">{t("previous")}</div>
                  </button>
                  <button
                    className="place-self-end flex place-items-center mx-3 disabled:text-gray-500"
                    onClick={handleNext}
                    disabled={page === last_page ? true : false}
                  >
                    <div className="mx-1">{t("next")}</div>
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

export default FormCandidat