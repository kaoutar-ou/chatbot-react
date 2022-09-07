import * as api from "../api";

export const verifyPartenaireInfos = (partenaire_infos) => {
  const partenaire_infos_reference = {
    raison_sociale: "",
    email: "",
    telephone: "",
    adresse: "",
    nombre_employes: "",
    partenariat: "",
    comment: "",
  };

  const max_nombre_employes = 1000

  let errors = {};

  // Format
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(partenaire_infos.email)) {
    errors["email"] = "Le format de votre email n'est pas valide";
  }

  if(!/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(partenaire_infos.telephone)) {
    errors["telephone"] = "Le format de votre numéro de téléphone n'est pas valide";
  }

  // Undefined / Empty
  if (
    partenaire_infos.raison_sociale === undefined ||
    partenaire_infos.raison_sociale === ""
  ) {
    errors["raison_sociale"] = "Vous devez remplir la raison sociale";
  }

  if (partenaire_infos.email === undefined || partenaire_infos.email === "") {
    errors["email"] = "Vous devez fournir votre email";
  }

  if (partenaire_infos.telephone === undefined || partenaire_infos.telephone === "") {
    errors["telephone"] = "Vous devez fournir votre numéro de telephone";
  }

  if (partenaire_infos.adresse === undefined || partenaire_infos.adresse === "") {
    errors["adresse"] = "Vous devez fournir votre adresse";
  }

  if (partenaire_infos.nombre_employes === undefined || partenaire_infos.nombre_employes === "") {
    errors["nombre_employes"] = "Vous devez préciser le nombre de vos employés";
  }

  if (partenaire_infos.partenariat === undefined || partenaire_infos.partenariat === "") {
    errors["partenariat"] = "Vous devez séléctionner un domaine d'expertise";
  }

  // Length
  if (
    [...partenaire_infos?.raison_sociale].length < 1 ||
    [...partenaire_infos.raison_sociale].length > 30
  ) {
    errors["raison_sociale"] =
      "Votre raison sociale doit être comprise entre 1 et 30 caractères";
  }

  if ([...partenaire_infos?.adresse].length < 10) {
    errors["adresse"] = "Votre adresse doit être supérieure à 10 caractères";
  }

  if ([...partenaire_infos?.adresse].length > 75) {
    errors["adresse"] = "Votre adresse doit être inférieure à 75 caractères";
  }

  if ([...partenaire_infos?.telephone].length < 10) {
    errors["telephone"] =
      "Votre numéro de téléphone doit être supérieur ou égal à dix caractères";
  }

  if ([...partenaire_infos?.telephone].length > 13) {
    errors["telephone"] =
      "Votre numéro de téléphone doit être inférieur ou égal à 13 caractères";
  }

  if ([...partenaire_infos?.comment].length > 255) {
    errors["comment"] = "Veuillez ne pas dépasser 255 caractères";
  }

  // TODO Force number in inputs from begening
  
  if (isNaN(partenaire_infos.nombre_employes) || partenaire_infos.nombre_employes.trim() === "") {
    errors["nombre_employes"] = "Veuillez entrer un nombre";
  }
  
  if (partenaire_infos.nombre_employes > max_nombre_employes) {
    errors["nombre_employes"] = "Veuillez ne pas dépasser " + max_nombre_employes + " personnes";
  }

  return errors;
};

export const savePartenaire = async (partenaire_infos) => {
  let response = {
    data: {},
    errors: {},
  };

  let res;

  let server_error_message =
    "Nous sommes désolés, nous avons rencontré une erreur interne !";
  let comment =
    "Veuillez revenir aux pages précédentes et revérifier les informations remplis avant de confirmer";

  response.errors = verifyPartenaireInfos(partenaire_infos);
  
  console.log(partenaire_infos)
  if (partenaire_infos.calendar === undefined || partenaire_infos.calendar === "") {
    response.errors["calendar"] = "Vous devez choisir un créneau";
  }

  if (Object.keys(response.errors).length > 0) {
    if (response.errors["calendar"] === "") {
      response.errors = { ...response.errors, comment: comment };
    }
    return response;
  }

  try {
    res = await api.savePartenaire(partenaire_infos);
    console.log(res);
    if (res.data.error != null && res.data.error !== undefined) {
      response.errors = { ...response.errors, server_error: res.data.error };
    } else {
      response.data = res.data;
    }
  } catch (error) {
    console.log(error);
    response.errors = {
      ...response.errors,
      server_error: res?.data?.error ? res.data.error : server_error_message,
    };
  }

  return response;
};
