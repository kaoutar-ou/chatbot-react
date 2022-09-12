import * as api from "../api";
import * as constants from "./constants";

export const verifyClientInfos = async (client_infos) => {
  const client_infos_reference = {
    raison_sociale: "",
    email: "",
    telephone: "",
    adresse: "",
    service: "",
    comment: "",
  };

  // let errors = {
  //     raison_sociale: "",
  //     email: "",
  //     telephone: "",
  //     adresse: "",
  //     service: "",
  //     comment: "",
  // }

  let errors = {};

  // TODO if errors .. page 5 with .. return to previous pages

  // TODO Verifications in backend

  // Format
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(client_infos.email)) {
    errors["email"] = (await constants.formatErrors()).emailFormatError;
  }

  if (
    !/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(
      client_infos.telephone
    )
  ) {
    errors["telephone"] = (await constants.formatErrors()).telephoneFormatError;
  }

  // Undefined / Empty
  if (
    client_infos.raison_sociale === undefined ||
    client_infos.raison_sociale === ""
  ) {
    errors["raison_sociale"] = (
      await constants.emptyErrors()
    ).raisonSocialeEmptyError;
  }

  if (client_infos.email === undefined || client_infos.email === "") {
    errors["email"] = (await constants.emptyErrors()).adresseEmptyError;
  }

  if (client_infos.telephone === undefined || client_infos.telephone === "") {
    errors["telephone"] = (await constants.emptyErrors()).telephoneEmptyError;
  }

  if (client_infos.adresse === undefined || client_infos.adresse === "") {
    errors["adresse"] = (await constants.emptyErrors()).adresseEmptyError;
  }

  if (client_infos.service === undefined || client_infos.service === "") {
    errors["service"] = (await constants.emptyErrors()).serviceEmptyError;
  }

  // XXX le commentaire n est pas obligatoire
  // TODO trim
  // TODO cette condition en real time .. tester sur le nombre des caractères
  // Length
  if (
    [...client_infos?.raison_sociale].length < 1 ||
    [...client_infos.raison_sociale].length > 30
  ) {
    errors["raison_sociale"] = (
      await constants.lengthErrors()
    ).raisonSocialeLengthError;
  }

  if ([...client_infos?.adresse].length < 10) {
    errors["adresse"] = (await constants.lengthErrors()).minAdresseLengthError;
  }

  if ([...client_infos?.adresse].length > 75) {
    errors["adresse"] = (await constants.lengthErrors()).maxAdresseLengthError;
  }

  if ([...client_infos?.telephone].length < 10) {
    errors["telephone"] = (
      await constants.lengthErrors()
    ).minTelephoneLengthError;
  }

  if ([...client_infos?.telephone].length > 15) {
    errors["telephone"] = (
      await constants.lengthErrors()
    ).maxTelephoneLengthError;
  }

  if ([...client_infos?.comment].length > 255) {
    errors["comment"] = (await constants.lengthErrors()).commentLengthError;
  }

  // TODO email verification
  // TODO service existant

  return errors;
};

export const saveClient = async (client_infos) => {
  let response = {
    data: {},
    errors: {},
  };

  let res;

  // TODO constants and language
  let server_error_message = (await constants.errors()).internalError;
  let comment = (await constants.errors()).goBackError;

  response.errors = await verifyClientInfos(client_infos);

  if (Object.keys(response.errors).length > 0) {
    response.errors = { ...response.errors, comment: comment };
    return response;
  }

  try {
    res = await api.saveClient(client_infos);
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
