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

function borderAccordingToState() {
  const [first, second] = styles[radiosInput.value];
  const options = { char: second ?? first, lineLength: rangeInput.value };
  const input = mainInput.value.trim() || mainInput.placeholder.trim();
  const result = borderify(input, options);
  const output = first + result.substring(1, result.length - 1) + first;
  return output.toUpperCase();
}

function onStateChanged() {
  localStorage.setItem("rangeInput.value", rangeInput.value);
  localStorage.setItem("radiosInput.value", radiosInput.value);

  rangeSpan.innerText = `Length: ${rangeInput.value}`;
  radiosSpan.innerText = `Style: ${styles[radiosInput.value]}`;

  mainOutput.innerText = borderAccordingToState();
}

rangeInput.value = localStorage.getItem("rangeInput.value");
radiosInput.value = localStorage.getItem("radiosInput.value");

rangeInput.addEventListener("input", onStateChanged);
radiosInput.addEventListener("input", onStateChanged);
mainInput.addEventListener("input", onStateChanged);

mainBtn.addEventListener("click", copyToClipboard);

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  copyToClipboard();
});

function copyToClipboard() {
  navigator.clipboard
    .writeText(mainOutput.innerText)
    .then(() => toast("Copied :)"))
    .catch((err) => toast("Couldn't Copy :(", err?.message));
}

onStateChanged(); // set everything up
