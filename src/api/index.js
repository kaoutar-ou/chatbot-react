import axios from "./axios";

const saveClientUrl = "chatbot/add_client_type"

const getAllServicesUrl = "chatbot/get_all_services"

const saveRatingUrl = "chatbot/add_rating"

export const saveClient = async (client_infos) => await axios.post(saveClientUrl, client_infos);

export const getAllServices = async () => await axios.get(getAllServicesUrl);

export const saveRating = async (rating) => await axios.post(saveRatingUrl, rating);