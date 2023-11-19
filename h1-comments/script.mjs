import { borderify } from "./h1-comment.mjs";
import toast from "./toast.mjs";

const mainInput = document.querySelector(".main input");
const mainOutput = document.querySelector(".output");
const mainForm = document.querySelector("form.main");
const rangeInput = document.querySelector(".range input");
const rangeSpan = document.querySelector(".range span");
const radiosInput = document.querySelector(".radios input");
const radiosSpan = document.querySelector(".radios span");
const mainBtn = document.querySelector(".btn-copy");

const styles = {
  1: "/",
  2: "/*",
  3: "/-",
  4: "*",
  5: "-",
  6: "#",
};

function getInput() {
  return mainInput.value.trim() || mainInput.placeholder.trim();
}

function updateOutput() {
  const [first, second] = styles[radiosInput.value];
  const options = { char: second ?? first, lineLength: rangeInput.value };
  const result = borderify(getInput(), options).toUpperCase();
  const output = first + result.substring(1, result.length - 1) + first;
  mainOutput.innerText = output;
}

function copyToClipboard() {
  navigator.clipboard
    .writeText(mainOutput.innerText)
    .then(() => toast("Copied :)"))
    .catch((err) => toast("Couldn't Copy :(", err?.message));
}

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  copyToClipboard();
});

mainBtn.addEventListener("click", copyToClipboard);

rangeInput.addEventListener("input", () => {
  updateOutput();
  rangeSpan.innerText = `Length: ${rangeInput.value}`;
});

radiosInput.addEventListener("input", () => {
  updateOutput();
  radiosSpan.innerText = `Style: ${styles[radiosInput.value]}`;
});

mainInput.addEventListener("input", updateOutput);
updateOutput();
