import { borderify } from "./h1-comment.mjs";
import toast from "./toast.mjs";

const mainInput = document.querySelector(".main input");
const mainOutput = document.querySelector(".main .output");
const mainForm = document.querySelector("form.main");
const range = document.querySelector("input[type='range']");
const rangeSpan = document.querySelector(".range span");
const mainBtn = document.querySelector('.main button[type="submit"]');

function getInput() {
  return mainInput.value.trim() || mainInput.placeholder.trim();
}

function updateOutput() {
  const options = { char: "/", lineLength: range.value };
  mainOutput.innerText = borderify(getInput(), options).toUpperCase();
}

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  navigator.clipboard
    .writeText(mainOutput.innerText)
    .then(() => toast("Copied :)"))
    .catch((err) => toast("Couldn't Copy :(", err?.message));
});

range.addEventListener("input", () => {
  updateOutput();
  rangeSpan.innerText = `Length: ${range.value}`;
});

mainInput.addEventListener("input", updateOutput);
updateOutput();
