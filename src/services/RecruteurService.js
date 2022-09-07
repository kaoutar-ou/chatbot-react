import * as api from "../api";

export const verifyRecruteurInfos = (recruteur_infos) => {
  const recruteur_infos_reference = {
    raison_sociale: "",
    email: "",
    telephone: "",
    adresse: "",
    nombre_employes: "",
    nombre_personnes_a_recruter: "",
    domaine_expertise: "",
    comment: "",
  };

  const max_nombre_employes = 1000
  const max_nombre_personnes_a_recruter = 100

  let errors = {};

  // Format
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(recruteur_infos.email)) {
    errors["email"] = "Le format de votre email n'est pas valide";
  }

  if(!/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(recruteur_infos.telephone)) {
    errors["telephone"] = "Le format de votre numéro de téléphone n'est pas valide";
  }

  // Undefined / Empty
  if (
    recruteur_infos.raison_sociale === undefined ||
    recruteur_infos.raison_sociale === ""
  ) {
    errors["raison_sociale"] = "Vous devez remplir la raison sociale";
  }

  if (recruteur_infos.email === undefined || recruteur_infos.email === "") {
    errors["email"] = "Vous devez fournir votre email";
  }

  if (recruteur_infos.telephone === undefined || recruteur_infos.telephone === "") {
    errors["telephone"] = "Vous devez fournir votre numéro de telephone";
  }

  if (recruteur_infos.adresse === undefined || recruteur_infos.adresse === "") {
    errors["adresse"] = "Vous devez fournir votre adresse";
  }

  if (recruteur_infos.nombre_employes === undefined || recruteur_infos.nombre_employes === "") {
    errors["nombre_employes"] = "Vous devez préciser le nombre de vos employés";
  }

  if (recruteur_infos.nombre_personnes_a_recruter === undefined || recruteur_infos.nombre_personnes_a_recruter === "") {
    errors["nombre_personnes_a_recruter"] = "Vous devez préciser le nombre de personnes que vous voulez recruter";
  }

  if (recruteur_infos.domaine_expertise === undefined || recruteur_infos.domaine_expertise === "") {
    errors["domaine_expertise"] = "Vous devez séléctionner un domaine d'expertise";
  }

  // Length
  if (
    [...recruteur_infos?.raison_sociale].length < 1 ||
    [...recruteur_infos.raison_sociale].length > 30
  ) {
    errors["raison_sociale"] =
      "Votre raison sociale doit être comprise entre 1 et 30 caractères";
  }

  if ([...recruteur_infos?.adresse].length < 10) {
    errors["adresse"] = "Votre adresse doit être supérieure à 10 caractères";
  }

  if ([...recruteur_infos?.adresse].length > 75) {
    errors["adresse"] = "Votre adresse doit être inférieure à 75 caractères";
  }

  if ([...recruteur_infos?.telephone].length < 10) {
    errors["telephone"] =
      "Votre numéro de téléphone doit être supérieur ou égal à dix caractères";
  }

  if ([...recruteur_infos?.telephone].length > 13) {
    errors["telephone"] =
      "Votre numéro de téléphone doit être inférieur ou égal à 13 caractères";
  }

  if ([...recruteur_infos?.comment].length > 255) {
    errors["comment"] = "Veuillez ne pas dépasser 255 caractères";
  }

  // TODO Force number in inputs from begening
  if (isNaN(recruteur_infos.nombre_personnes_a_recruter) || recruteur_infos.nombre_personnes_a_recruter.trim() === "") {
    errors["nombre_personnes_a_recruter"] = "Veuillez entrer un nombre";
  }
  
  if (isNaN(recruteur_infos.nombre_employes) || recruteur_infos.nombre_employes.trim() === "") {
    errors["nombre_employes"] = "Veuillez entrer un nombre";
  }

  if (recruteur_infos.nombre_personnes_a_recruter > max_nombre_personnes_a_recruter) {
    errors["nombre_personnes_a_recruter"] = "Veuillez ne pas dépasser " + max_nombre_personnes_a_recruter + " personnes";
  }
  
  if (recruteur_infos.nombre_employes > max_nombre_employes) {
    errors["nombre_employes"] = "Veuillez ne pas dépasser " + max_nombre_employes + " personnes";
  }

  return errors;
};

export const saveRecruteur = async (recruteur_infos) => {
  let response = {
    data: {},
    errors: {},
  };

  let res;

  let server_error_message =
    "Nous sommes désolés, nous avons rencontré une erreur interne !";
  let comment =
    "Veuillez revenir aux pages précédentes et revérifier les informations remplis avant de confirmer";

  response.errors = verifyRecruteurInfos(recruteur_infos);
  
  if (recruteur_infos.calendar === undefined || recruteur_infos.calendar === "") {
    response.errors["calendar"] = "Vous devez choisir un créneau";
  }

  if (Object.keys(response.errors).length > 0) {
    if (response.errors["calendar"] === "") {
      response.errors = { ...response.errors, comment: comment };
    }
    return response;
  }

  try {
    res = await api.saveRecruteur(recruteur_infos);
    if (res.data.error != null && res.data.error !== undefined) {
      response.errors = { ...response.errors, server_error: res.data.error };
    } else {
      response.data = res.data;
    }
  } catch (error) {
    // console.log(error);
    response.errors = {
      ...response.errors,
      server_error: res?.data?.error ? res.data.error : server_error_message,
    };
  }

  return response;
};
