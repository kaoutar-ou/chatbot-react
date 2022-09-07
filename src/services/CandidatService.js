import * as api from "../api";

export const verifyCandidatInfos = (candidat_infos) => {
  const candidat_infos_reference = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    calendar: "",
    comment: "",
  };

  let errors = {};

  // Format
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(candidat_infos.email)) {
    errors["email"] = "Le format de votre email n'est pas valide";
  }

  if(!/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(candidat_infos.telephone)) {
    errors["telephone"] = "Le format de votre numéro de téléphone n'est pas valide";
  }

  // Undefined / Empty
  if (
    candidat_infos.nom === undefined ||
    candidat_infos.nom === ""
  ) {
    errors["nom"] = "Vous devez remplir le nom";
  }

  if (
    candidat_infos.prenom === undefined ||
    candidat_infos.prenom === ""
  ) {
    errors["prenom"] = "Vous devez remplir le prénom";
  }

  if (candidat_infos.email === undefined || candidat_infos.email === "") {
    errors["email"] = "Vous devez fournir votre email";
  }

  if (candidat_infos.telephone === undefined || candidat_infos.telephone === "") {
    errors["telephone"] = "Vous devez fournir votre numéro de telephone";
  }

  if (candidat_infos.adresse === undefined || candidat_infos.adresse === "") {
    errors["adresse"] = "Vous devez fournir votre adresse";
  }

  // Length
  if (
    [...candidat_infos?.nom].length < 3 ||
    [...candidat_infos.nom].length > 30
  ) {
    errors["nom"] =
      "Votre nom doit être comprise entre 3 et 30 caractères";
  }

  if (
    [...candidat_infos?.prenom].length < 3 ||
    [...candidat_infos.prenom].length > 30
  ) {
    errors["prenom"] =
      "Votre prénom doit être comprise entre 3 et 30 caractères";
  }

  if ([...candidat_infos?.adresse].length < 10) {
    errors["adresse"] = "Votre adresse doit être supérieure à 10 caractères";
  }

  if ([...candidat_infos?.adresse].length > 75) {
    errors["adresse"] = "Votre adresse doit être inférieure à 75 caractères";
  }

  if ([...candidat_infos?.telephone].length < 10) {
    errors["telephone"] =
      "Votre numéro de téléphone doit être supérieur ou égal à dix caractères";
  }

  if ([...candidat_infos?.telephone].length > 14) {
    errors["telephone"] =
      "Votre numéro de téléphone doit être inférieur ou égal à 14 caractères";
  }

  if ([...candidat_infos?.comment].length > 255) {
    errors["comment"] = "Veuillez ne pas dépasser 255 caractères";
  }

  return errors;
};

export const saveCandidat = async (candidat_infos) => {
  let response = {
    data: {},
    errors: {},
  };

  let res;

  let server_error_message =
    "Nous sommes désolés, nous avons rencontré une erreur interne !";
  let comment =
    "Veuillez revenir aux pages précédentes et revérifier les informations remplis avant de confirmer";

  response.errors = verifyCandidatInfos(candidat_infos);
  
  if (candidat_infos.calendar === undefined || candidat_infos.calendar === "") {
    response.errors["calendar"] = "Vous devez choisir un créneau";
  }

  if (Object.keys(response.errors).length > 0) {
    if (response.errors["calendar"] === "") {
      response.errors = { ...response.errors, comment: comment };
    }
    return response;
  }

  try {
    res = await api.saveCandidat(candidat_infos);
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
