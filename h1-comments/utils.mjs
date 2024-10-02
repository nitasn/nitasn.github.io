export function h(tagName, props = null, ...children) {
  const element = document.createElement(tagName);

  for (const key in props) {
    if (key.startsWith("on") && key.toLowerCase() in window) {
      element.addEventListener(key.toLowerCase().substring(2), props[key]);
    } else {
      element[key] = props[key];
    }
  }

  for (const child of children) {
    if (!child) continue;
    const node = child instanceof Node ? child : document.createTextNode(child);
    element.appendChild(node);
  }

  return element;
}

export function addStylesheet(cssString, id = null) {
  const style = h("style", id && { id }, cssString);
  document.head.appendChild(style);
}
