import * as api from "../api";

export const verifyCandidatureInfos = (document_joint_infos) => {
  const document_joint_infos_reference = {
    type: "",
    offre: "",
    path: "",
    token: "",
  };

  let errors = {};

  // Undefined / Empty
  if (
    document_joint_infos.path === undefined ||
    document_joint_infos.path === ""
  ) {
    errors["path"] = "Vous devez fournir un document";
  }

  if (
    document_joint_infos.type === "choix_offre" &&
    (document_joint_infos.offre === undefined ||
    document_joint_infos.offre === "") 
  ) {
    errors["offre"] = "Votre devez choisir un offre";
  }

  if (
    document_joint_infos.type === undefined ||
    document_joint_infos.type === ""
  ) {
    errors["type"] = "Votre devez préciser le type de votre candidature";
  }

  // TODO Check if token exists in database

  // TODO manyFiles

  return errors;
};

export const saveCandidature = async (document_joint_infos, token) => {
  let response = {
    data: {},
    errors: {},
  };

  let res;

  let server_error_message =
    "Nous sommes désolés, nous avons rencontré une erreur interne !";
  let comment =
    "Veuillez revenir aux pages précédentes et revérifier les informations remplis avant de confirmer";

    document_joint_infos = {...document_joint_infos, token:token}

  response.errors = verifyCandidatureInfos(document_joint_infos);
  
  if (
    token === undefined ||
    token === ""
  ) {
    response.errors["token"] = "Votre session a expirée";
  }

  if (Object.keys(response.errors).length > 0) {
      response.errors = { ...response.errors, comment: comment };
        return response;
  }

  let form_data = new FormData();
  form_data.append('path', document_joint_infos.path)
  form_data.append('token', document_joint_infos.token)
  form_data.append('type', document_joint_infos.type)
  form_data.append('offre', document_joint_infos.offre)

  try {
    res = await api.saveCandidature(form_data);
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
