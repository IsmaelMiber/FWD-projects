import { classifiyText } from "../API/form";

export async function handleInput(text) {
  const response = await classifiyText(text);
  const { status } = response;
  const responseJson = await response.json();

  if (status == 200) {
    const { category_list } = responseJson;
    let labels = category_list.map(({ label }) => `<label>${label}</label>`);
    document.getElementById("output").innerText = text;
    document.getElementById("labels").innerHTML = labels;
  } else {
    const {
      status: { msg },
    } = responseJson;

    alert(msg);
  }
}

export function handleSubmit(event) {
  event.preventDefault();

  const text = document.getElementById("textInput").value;
  handleInput(text);
}
