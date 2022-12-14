import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import CommentForm from '../form/CommentForm';
import InputsForm from '../form/InputsForm';
import RatingForm from "../form/RatingForm";
import SingleChoiceForm from '../form/SingleChoiceForm';
import BotMessage from '../messages/BotMessage';
import * as recruteurService from "../../services/RecruteurService";
import * as domaineExpertiseService from "../../services/DomaineExpertiseService";
import * as ratingService from "../../services/RatingService";
import CalendarForm from '../form/CalendarForm';
import { LanguageContext, VoiceContext } from '../../App';

function FormRecruteur(props) {
  const { t, i18n } = useTranslation('recruteur');

  const lang = useContext(LanguageContext);

    const [recruteurInfos, setRecruteurInfos] = useState({
        raison_sociale: "",
        email: "",
        telephone: "",
        adresse: "",
        nombre_employes: "",
        nombre_personnes_a_recruter: "",
        domaine_expertise: "",
        calendar: "",
        comment: "",
        language: Object.keys(lang).at(0)
      });
    
      const [recruteurInfosErrors, setRecruteurInfosErrors] = useState({
        raison_sociale: "",
        email: "",
        telephone: "",
        adresse: "",
        nombre_employes: "",
        nombre_personnes_a_recruter: "",
        domaine_expertise: "",
        calendar: "",
        comment: "",
      });

      const [rating, setRating] = useState({
        rate: null,
        comment: "",
      });

      useEffect(() => {
        // console.log(recruteurInfos);
      }, [recruteurInfos]);

      const firstPage = {
        raison_sociale: t("raisonSociale"),
        email: t("email"),
      };
      const secondPage = {
        telephone: t("telephone"),
        adresse: t("adresse"),
      };
      const thirdPage = {
        nombre_employes: t("nombreEmployes"),
        nombre_personnes_a_recruter: t("nombrePersonnesARecruter"),
      };
      const fourthPage = {
        domaine_expertise: t("domaineExpertise"),
      };
      const fifthPage = {
        comment: t("comment"),
      };

      const [domainesExpertise, setDomainesExpertise] = useState({});

    const [recruteurToken, setRecruteurToken] = useState(null);

    useEffect(() => {
        const getAllDomainesExpertise = async () => {
          let response = await domaineExpertiseService.getAllDomainesExpertise();
          setDomainesExpertise(response?.data?.domaines_expertise);
        };
    
        getAllDomainesExpertise();
      }, []);

    // TODO .. use state above then then ... ordering ...

    const last_page = 5;
    const [page, setPage] = useState(1);

    const handlePrevious = () => {
        page > 1 ? setPage((page) => page - 1) : setPage(1);
      };
    
      const handleNext = () => {
        page < last_page ? setPage((page) => page + 1) : setPage(last_page);
      };
    
      const [isConfirmed, setIsConfirmed] = useState(false);

      const [isSent, setIsSent] = useState(false);
    
      const generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
      };

      const isVoiceOn = useContext(VoiceContext);

    const handleSpeakMessage = (message) => {
      if (isVoiceOn) {
        console.log("hi")
        let toSpeech = new SpeechSynthesisUtterance(message)
        toSpeech.lang = Object.keys(lang).at(0)
        window.speechSynthesis.speak(toSpeech)
      }
    }

      const handleConfirmForm = async () => {

        let response = await recruteurService.verifyRecruteurInfos(recruteurInfos);
        setRecruteurInfosErrors((prev) => ({ ...prev, comment: "" }));
        if (Object.keys(response).length > 0) {
          if (
            response.server_error !== undefined &&
            response.server_error !== null
          ) {
            setRecruteurInfosErrors((prev) => ({
              ...prev,
              server_error: response.server_error,
            }));
          } else {
            setRecruteurInfosErrors(response);
          }
        } else {
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content={t("calendarChoice")}
            />
          );
          handleSpeakMessage(t("calendarChoice"))
          setTimeout(() => {
            setIsConfirmed(true);
          }, 1000);
          setRecruteurInfosErrors((prev) => ({ ...prev, server_error: "" }));
      }
    }

    // TODO prevent inputs from typing letters .. only numbers

      const handleSendForm = async () => {
        let response = await recruteurService.saveRecruteur(recruteurInfos);
        
        setRecruteurInfosErrors((prev) => ({ ...prev, comment: "" }));
        if (Object.keys(response.errors).length > 0) {
          
          if (
            response.errors.server_error !== undefined &&
            response.errors.server_error !== null
          ) {
            
            
            setRecruteurInfosErrors((prev) => ({
              ...prev,
              server_error: response.errors.server_error,
            })); 
          } else {
            
            setRecruteurInfosErrors(response.errors);
          }
        } else {
          
          setRecruteurToken(response.data.token);
          setIsSent(true);
          setRecruteurInfosErrors((prev) => ({ ...prev, server_error: "" }));
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content={response?.data?.message}
            />
          );
          handleSpeakMessage(response?.data?.message)
          
          // TODO .. show a success message or error
        }
      };

      const sendRating = async (sentRating) => {
        setRating(sentRating);
        let response = await ratingService.saveRating(sentRating);
    
        if (Object.keys(response.errors).length > 0) {
          if (
            response.errors.server_error !== undefined &&
            response.errors.server_error !== null
          ) {
            // setRecruteurInfosErrors((prev) => ({...prev, server_error:response.errors.server_error}) )
          }
        } else {
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content={response?.data?.message}
            />
          );
          handleSpeakMessage(response?.data?.message)
          setTimeout(() => {
            props.handleAddNewMessage(
              <BotMessage
                key={generateKey("chatbot")}
                content={
                  t("completed")
                }
              />
            );
            handleSpeakMessage(t("completed"))
            props.setMainInputDisabled(false);
          }, 1000);
        }
      };

      useEffect(() => {
        // TODO or RecruteurToken
        if (isSent) {
          setTimeout(() => {
            props.handleAddNewMessage(
              <BotMessage
                key={generateKey("chatbot")}
                content={t("wantToRate")}
              />
            );
            handleSpeakMessage(t("wantToRate"))
            setTimeout(() => {
              props.handleAddNewMessage(
                <RatingForm
                  key={"RecruteurRatingForm"}
                  sendRating={sendRating}
                  token={recruteurToken}
                  userType={"recruteur"}
                  setMainInputDisabled={props.setMainInputDisabled}
                  handleAddNewMessage={props.handleAddNewMessage}
                />
              );
            }, 1000);
          }, 2000);
        }
      }, [isSent]);

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
                  key={"RecruteurCalendarForm"}
                  handleSendForm={handleSendForm}
                  setInfos={setRecruteurInfos}
                  infos={recruteurInfos}
                  setInfosErrors={setRecruteurInfosErrors}
                  infosErrors={recruteurInfosErrors}
                  isSent={isSent}
                />
                </>
            ) : null
          }
          <div className={`transition-all duration-150 ease-out relative ${scale}`}>
            <div className="w-full flex flex-row">
              <div className="w-full m-5 rounded-2xl shadow-xl break-words outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
                <div className="w-11/12 p-3 ml-3">
                  {page === 1 ? (
                    <InputsForm
                      key={"FirstRecruteurInputsForm"}
                      content={firstPage}
                      setInfos={setRecruteurInfos}
                      infos={recruteurInfos}
                      setInfosErrors={setRecruteurInfosErrors}
                      infosErrors={recruteurInfosErrors}
                      isSent={isConfirmed}
                    />
                  ) : page === 2 ? (
                    <InputsForm
                      key={"SecondRecruteurInputsForm"}
                      content={secondPage}
                      setInfos={setRecruteurInfos}
                      infos={recruteurInfos}
                      setInfosErrors={setRecruteurInfosErrors}
                      infosErrors={recruteurInfosErrors}
                      isSent={isConfirmed}
                    />
                  ) : page === 3 ? (
                    <InputsForm
                      key={"SecondRecruteurInputsForm"}
                      content={thirdPage}
                      setInfos={setRecruteurInfos}
                      infos={recruteurInfos}
                      setInfosErrors={setRecruteurInfosErrors}
                      infosErrors={recruteurInfosErrors}
                      isSent={isConfirmed}
                    />
                  ) : page === 4 ? (
                            <SingleChoiceForm
                                key={"RecruteurSingleChoiceForm"}
                                content={Object.entries(fourthPage).at(0)}
                                choices={domainesExpertise}
                                setInfos={setRecruteurInfos}
                                infos={recruteurInfos}
                                setInfosErrors={setRecruteurInfosErrors}
                                infosErrors={recruteurInfosErrors}
                                isSent={isConfirmed}
                            />
                    ) : (
                    <>
                      <CommentForm
                        content={Object.entries(fifthPage).at(0)}
                        setInfos={setRecruteurInfos}
                        infos={recruteurInfos}
                        setInfosErrors={setRecruteurInfosErrors}
                        infosErrors={recruteurInfosErrors}
                        isSent={isConfirmed}
                      />
                      {recruteurInfosErrors["server_error"] &&
                      recruteurInfosErrors["server_error"] !== "" ? (
                        <div className="text-red-500">
                          {recruteurInfosErrors["server_error"]}
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
      );
                      }
export default FormRecruteur;