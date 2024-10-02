import { h } from "./utils.mjs";

export default function toast(title, msg) {
  const toast_div = (
    h("div", { className: "toast" },
      h("h3", null, title),
      msg && h("p", null, msg)
    )
  );
  toast_div.addEventListener("animationend", () => {
    document.body.removeChild(toast_div);
  });
  document.body.appendChild(toast_div);
}