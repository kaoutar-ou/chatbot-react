import * as api from "../api";

export const verifyDocumentJointInfos = (document_joint_infos) => {
  const document_joint_infos_reference = {
    // title: "",
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
    document_joint_infos.token === undefined ||
    document_joint_infos.token === ""
  ) {
    errors["token"] = "Votre session a expirée";
  }

  // TODO Check if token exists in database

  // TODO manyFiles

  return errors;
};

export const saveDocumentJoint = async (document_joint_infos, token) => {
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

  response.errors = verifyDocumentJointInfos(document_joint_infos);
  

  if (Object.keys(response.errors).length > 0) {
      response.errors = { ...response.errors, comment: comment };
        return response;
  }

  let form_data = new FormData();
  form_data.append('path', document_joint_infos.path)
  form_data.append('token', document_joint_infos.token)

  try {
    res = await api.saveDocumentJoint(form_data);
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
