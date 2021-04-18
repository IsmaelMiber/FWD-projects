const API = require("../API");
const fetch = require("node-fetch");
const FormData = require("form-data");

function classifiyText(text) {
  const form = new FormData();
  form.append("key", process.env.MEANING_CLOUD_API_KEY);
  form.append("txt", text);
  form.append("model", "IPTC_en");

  const requestOptions = {
    method: "POST",
    body: form,
    redirect: "follow",
  };
  return fetch("https://api.meaningcloud.com/class-2.0", requestOptions);
}

function requestClassifationOfText(text) {
  let url = `${API.CLASSIFYTEXT}?text=${text}`;
  return fetch(url);
}

module.exports = {
  classifiyText,
  requestClassifationOfText,
};
