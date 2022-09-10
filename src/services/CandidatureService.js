import * as api from "../api";
import * as constants from "./constants"

export const verifyCandidatureInfos = async (document_joint_infos) => {
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
    errors["path"] = (await constants.emptyErrors()).documentEmptyError;
  }

  if (
    document_joint_infos.type === "choix_offre" &&
    (document_joint_infos.offre === undefined ||
    document_joint_infos.offre === "") 
  ) {
    errors["offre"] = (await constants.emptyErrors()).offreEmptyError;
  }

  if (
    document_joint_infos.type === undefined ||
    document_joint_infos.type === ""
  ) {
    errors["type"] = (await constants.emptyErrors()).typeCandidatureEmptyError;
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
  (await constants.errors()).internalError;
  let comment =
  (await constants.errors()).goBackError;

    document_joint_infos = {...document_joint_infos, token:token}

  response.errors = await verifyCandidatureInfos(document_joint_infos);
  
  if (
    token === undefined ||
    token === ""
  ) {
    response.errors["token"] = (await constants.errors()).tokenError;
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
