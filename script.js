const h1Element = document.getElementsByTagName("h1");
const button = document.getElementById("button");
const [form] = document.getElementsByClassName("form");
const body = document.querySelector("body");
const input = document.querySelector("#title-input");

console.log(body);

button.addEventListener("click", (event) => {
  event.preventDefault();
  const h1 = document.createElement("h1");
  const innerText = input.value;
  h1.innerText = "hello";
  h1.innerHTML = innerText;
  body.appendChild(h1);
  input.value = "";
});
