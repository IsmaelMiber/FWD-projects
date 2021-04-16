import API from "../API";

export function classifiyText(text) {
  const formdata = new FormData();
  formdata.append("key", process.env.MEANING_CLOUD_API_KEY);
  formdata.append("txt", text);
  formdata.append("model", "IPTC_en");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(API.CLASSIFICATION, requestOptions);
}
