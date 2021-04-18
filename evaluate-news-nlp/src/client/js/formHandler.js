import { requestClassifationOfText } from "../API/form";

export async function handleInput(text) {
  const response = await requestClassifationOfText(text);
  const { status } = response;
  const responseJson = await response.json();

  if (status == 200) {
    const { category_list } = responseJson;
    let labels = category_list.map(({ label }) => `<label>${label}</label>`);
    if (labels.length > 0) {
      document.getElementById("output").innerText = text;
      document.getElementById("labels").innerHTML = labels;
    } else {
      handleInputError("No Classification Founded");
    }
  } else {
    const {
      status: { msg },
    } = responseJson;

    alert(msg);
  }
}

function handleInputError(error) {
  document.getElementById("error").innerHTML = error;
}

export function handleSubmit(event) {
  event.preventDefault();
  const text = document.getElementById("textInput").value;
  const regex = /^[a-z A-Z,"'\S]+$/;
  const isMatch = regex.test(text);
  if (isMatch) {
    handleInput(text);
    handleInputError("");
  } else {
    handleInputError("Input accept only letters and no special chars");
  }
}
