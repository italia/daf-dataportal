import { serviceurl } from "../../config/serviceurl";

export const apiURLs = {
  kataLOD: serviceurl.urlKatalod,
  semanticValidator: serviceurl.urlSemanticValidator
};

export const jsonRequest = {
  method: "GET",
  headers: new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
  }),
  mode: "cors",
  cache: "no-cache"
};

/* export const validationFormRequest = formData => ({
  method: "POST",
  body: formData
}); */
