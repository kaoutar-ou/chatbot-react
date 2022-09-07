import axios from "./axios";

const saveClientUrl = "chatbot/add_client_type"

const getAllServicesUrl = "chatbot/get_all_services"

const saveRatingUrl = "chatbot/add_rating"

const getBotResponseUrl = "chatbot/chatbot_response_db"

const saveRecruteurUrl = "chatbot/add_recruteur_type"

const getAllDomainesExpertiseUrl = "chatbot/get_all_domaines_expertise"

const getAllFreeCalendarUrl = "chatbot/get_all_free_calendar"

const savePartenaireUrl = "chatbot/add_partenaire_type"

const getAllPartenariatsUrl = "chatbot/get_all_partenariats"

export const saveClient = async (client_infos) => await axios.post(saveClientUrl, client_infos);

export const getAllServices = async () => await axios.get(getAllServicesUrl);

export const saveRating = async (rating) => await axios.post(saveRatingUrl, rating);

export const getBotResponse = async (user_message) => await axios.post(getBotResponseUrl, user_message);

export const saveRecruteur = async (recruteur_infos) => await axios.post(saveRecruteurUrl, recruteur_infos);

export const getAllDomainesExpertise = async () => await axios.get(getAllDomainesExpertiseUrl);

export const getAllFreeCalendar = async () => await axios.get(getAllFreeCalendarUrl);

export const savePartenaire = async (partenaire_infos) => await axios.post(savePartenaireUrl, partenaire_infos);

export const getAllPartenariats = async () => await axios.get(getAllPartenariatsUrl);
