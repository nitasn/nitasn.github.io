import { borderify } from "./h1-comment.mjs";
import toast from "./toast.mjs";

const mainInput = document.querySelector(".main input");
const mainOutput = document.querySelector(".main .output");
const mainForm = document.querySelector("form.main");
const mainBtn = document.querySelector('.main button[type="submit"]');

function getInput() {
  return mainInput.value.trim() || mainInput.placeholder.trim();
}

function updateOutput() {
  mainOutput.innerText = borderify(getInput()).toUpperCase();
}

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Promise.reject({ message: "Test Error" })
  navigator.clipboard.writeText(mainOutput.innerText)
    .then(() => toast("Copied :)"))
    .catch((err) => toast("Couldn't Copy :(", err?.message));
});

mainInput.addEventListener("input", updateOutput);
updateOutput();
