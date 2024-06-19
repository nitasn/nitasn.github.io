const KEYS_TO_RENAME = {
  "Pixel Size": "Pixel",
  "Lens mount": "Lens Mount",
};

const KEYS_TO_OMIT = ["Size", "Format", "Lens Mount"];

const VALUES_TO_RENAME = [
  { key: "name", oldValue: "Iron 2020BSI Camera Link High Speed Compatible", newValue: "Iron 2020BSI High Speed" },
];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

This file generates two important things - `productObjects` and `attrTypes`.

------------------
| productObjects |
------------------

An array of objects like this:
{
  name: "JetCam 19 Dual SFP+",
  aHref: "https://kayainstruments.com/?post_type=product&p=58929",
  imgSrc: "http://kayainstruments.com/wp-content/uploads/2024/05/Jetcam-with-Birger-left-side.jpg",

  MP: 2.1,
  Resolution: "1920 x 1080",
  FPS: 2360,
  Sensor: "LUX 19HS",
  Pixel: "10 µm",
  Shutter: "Global",
  Chroma: "Color/Mono",
  Interface: "20 Gbps Dual SFP+",
}


-------------
| attrTypes |
-------------

This exact object:
{
  name: "name",
  aHref: "a-href",
  imgSrc: "img-src",

  Chroma: "string",
  FPS: "number",
  Interface: "string",
  MP: "number",
  Pixel: "string",
  Resolution: "string",
  Sensor: "string",
  Shutter: "string"
}

Properties that are "string" or "number" are considered REGULAR.
They all become filters, and also columns in the table.

Other properties ("name", "aHref", "imgSrc") are considered SPECIAL.
"name" is used as an ID (also a column in the table);
"aHref" and "imgSrc" become another special column the table.

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const [productObjects, attrTypes] = getProductsObjects();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getProductsObjects() {
  const productElements = [...document.querySelectorAll("main section.products .product")];

  const productObjects = productElements
    .map((el) => el.dataset.productAttributes)
    .map(JSON.parse)
    .map(([{ extra_attributes }]) => extra_attributes)
    .map((arr) => Object.fromEntries(arr.map(({ key, value }) => [key, value])))
    .map(normalizeKeys);

  productElements.forEach((div, idx) => {
    const name = div.querySelector(".title").textContent;
    const aHref = div.querySelector("a").href;
    const imgSrc = div.querySelector("img").src;
    productObjects[idx] = { name, aHref, imgSrc, ...productObjects[idx] };
  });

  VALUES_TO_RENAME.forEach(({ key, oldValue, newValue }) => {
    for (const obj of productObjects) {
      if (obj[key] === oldValue) {
        obj[key] = newValue;
      }
    }
  });

  const attrTypes = inferAttributesTypes(productObjects);

  for (const obj of productObjects) {
    for (const [attrName, attrType] of Object.entries(attrTypes)) {
      const value = obj[attrName];
      // if we inferred that a value is a string representation of a number,
      // convert it to an actual number.
      obj[attrName] = attrType === "number" ? Number(value) : value;
    }
  }

  return [productObjects, attrTypes];
}

function inferAttributesTypes(productObjects) {
  const attrTypes = {};

  const set = new Set(productObjects.flatMap((obj) => Object.keys(obj)));
  set.delete("name");
  set.delete("aHref");
  set.delete("imgSrc");

  attrTypes.name = "name";
  attrTypes.aHref = "a-href";
  attrTypes.imgSrc = "img-src";

  for (const attribute of [...set].sort()) {
    let type = "number";
    for (const productObj of productObjects) {
      if (!isNumeric(productObj[attribute])) {
        type = "string";
        break;
      }
    }
    attrTypes[attribute] = type;
  }

  return attrTypes;
}

function findNumericalRange(attrName) {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const productObj of productObjects) {
    const value = productObj[attrName];
    if (value == undefined) continue;
    min = Math.min(min, value);
    max = Math.max(max, value);
  }
  return { min, max };
}

function findCategoricalOptions(attrName) {
  return [...new Set(productObjects.map((productObj) => productObj[attrName]))].sort();
}

function isNumeric(value) {
  switch (typeof value) {
    case "number":
      return true;
    case "string":
      return !isNaN(value) && !isNaN(parseFloat(value));
    default:
      return false;
  }
}

function normalizeKeys(obj) {
  const normalized = {};
  Object.keys(obj).forEach((oldKey) => {
    const trimmedKey = oldKey.trim();
    const newKey = KEYS_TO_RENAME[trimmedKey] ?? trimmedKey;
    if (!KEYS_TO_OMIT.includes(newKey)) {
      normalized[newKey] = obj[oldKey];
    }
  });
  return normalized;
}
