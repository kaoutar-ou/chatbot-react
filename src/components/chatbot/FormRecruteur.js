import React, { useEffect, useState } from 'react'
import CommentForm from '../form/CommentForm';
import InputsForm from '../form/InputsForm';
import SingleChoiceForm from '../form/SingleChoiceForm';
import BotMessage from '../messages/BotMessage';
import * as recruteurService from "../../services/RecruteurService";
import * as domaineExpertiseService from "../../services/DomaineExpertiseService";
import CalendarForm from '../form/CalendarForm';

function FormRecruteur(props) {

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

      useEffect(() => {
        // console.log(recruteurInfos);
      }, [recruteurInfos]);

      const firstPage = {
        raison_sociale: "Raison sociale",
        email: "Email",
      };
      const secondPage = {
        telephone: "Telephone",
        adresse: "Adresse",
      };
      const thirdPage = {
        nombre_employes: "Nombre d'employés",
        nombre_personnes_a_recruter: "Nombre de personnes à recruter",
      };
      const fourthPage = {
        domaine_expertise: "Domaine d'expertise",
      };
      const fifthPage = {
        comment: "Commentaire",
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
          setIsConfirmed(true);
          setRecruteurInfosErrors((prev) => ({ ...prev, server_error: "" }));
      }
    }

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
          // setIsConfirmed(true);
          setIsSent(true);
          setRecruteurInfosErrors((prev) => ({ ...prev, server_error: "" }));
          props.handleAddNewMessage(
            <BotMessage
              key={generateKey("chatbot")}
              content={response?.data?.message}
            />
          );
          
          // TODO .. show a success message or error
        }
      };

      // const [calendar, setCalendar] = useState("");
      
      useEffect(() => {
        // setRecruteurInfos((prev) => ({...prev, calendar:5}))
        console.log(recruteurInfos)
        setRecruteurInfos(recruteurInfos)
      }, [recruteurInfos]);

      const handleSetCalendarInfo = (calendar) => {
        console.log(calendar)
        setRecruteurInfos((prev) => ({...prev, calendar:calendar}))
        console.log(recruteurInfos)
      }

      useEffect(() => {
        if (isConfirmed) {
          setTimeout(() => {
            
            props.handleAddNewMessage(
              <BotMessage
                key={generateKey("chatbot")}
                content="Pour finir votre inscription, veuillez choisir l'un des créneaux valables qui vous convient."
              />
            );
            setTimeout(() => {
              
              props.handleAddNewMessage(
                <CalendarForm
                  key={"RecruteurCalendarForm"}
                  handleSendForm={handleSendForm}
                  handleSetCalendarInfo={setRecruteurInfos}
                  infos={recruteurInfos}
                  setInfosErrors={setRecruteurInfosErrors}
                  infosErrors={recruteurInfosErrors}
                  isSent={isSent}
                />
              );
            }, 1000);
          }, 2000);
        }
      }, [isConfirmed]);

    const [scale, setScale] = useState("scale-0");
    useEffect(() => {
        setTimeout(() => {
        setScale("scale-1");
        }, 1000);
    }, []);
    return (
        <>
          <div className={`transition-all duration-150 ease-out relative ${scale}`}>
            <div className="w-full flex flex-row">
              <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
                <div className="w-11/12 p-3 ml-3">
                  {page === 1 ? (
                    <InputsForm
                      key={"FirstRecruteurInputsForm"}
                      content={firstPage}
                      setInfos={setRecruteurInfos}
                      infos={recruteurInfos}
                      setInfosErrors={setRecruteurInfosErrors}
                      infosErrors={recruteurInfosErrors}
                      isConfirmed={isConfirmed}
                    />
                  ) : page === 2 ? (
                    <InputsForm
                      key={"SecondRecruteurInputsForm"}
                      content={secondPage}
                      setInfos={setRecruteurInfos}
                      infos={recruteurInfos}
                      setInfosErrors={setRecruteurInfosErrors}
                      infosErrors={recruteurInfosErrors}
                      isConfirmed={isConfirmed}
                    />
                  ) : page === 3 ? (
                    <InputsForm
                      key={"SecondRecruteurInputsForm"}
                      content={thirdPage}
                      setInfos={setRecruteurInfos}
                      infos={recruteurInfos}
                      setInfosErrors={setRecruteurInfosErrors}
                      infosErrors={recruteurInfosErrors}
                      isConfirmed={isConfirmed}
                    />
                  ) : page === 4 ? (
                        // (domainesExpertise != null && domainesExpertise != undefined) ? (
                            <SingleChoiceForm
                                key={"RecruteurSingleChoiceForm"}
                                content={Object.entries(fourthPage).at(0)}
                                choices={domainesExpertise}
                                setInfos={setRecruteurInfos}
                                infos={recruteurInfos}
                                setInfosErrors={setRecruteurInfosErrors}
                                infosErrors={recruteurInfosErrors}
                                isConfirmed={isConfirmed}
                            />
                        // ) : (
                        //     <></>
                        // )
                    ) : (
                    <>
                      <CommentForm
                        content={Object.entries(fifthPage).at(0)}
                        setInfos={setRecruteurInfos}
                        infos={recruteurInfos}
                        setInfosErrors={setRecruteurInfosErrors}
                        infosErrors={recruteurInfosErrors}
                        isConfirmed={isConfirmed}
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
      );
                      }
export default FormRecruteur;