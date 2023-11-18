import { borderify } from "./h1-comment.mjs";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

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

updateOutput();
mainInput.addEventListener("input", updateOutput);

mainForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    navigator.clipboard.writeText(mainOutput.innerText);
    alert('Copied :)');
  }
  catch (err) {
    alert(`Couldn't Copy :( \n\nReason: ${err.message}`);
  }
});
