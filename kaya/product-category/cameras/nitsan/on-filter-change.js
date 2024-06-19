const productElements = document.querySelectorAll("main section.products .product");
const msgAllProductsFiltered = document.querySelector(".msg-all-products-filtered");

FilterState.subscribe((currentFilters) => {
  let atLeastOne = false;
  productObjects.forEach((prodObj, idx) => {
    const match = doesMatch(prodObj, currentFilters);
    productElements[idx].classList.toggle("filtered-out", !match);
    atLeastOne ||= match;
  });

  msgAllProductsFiltered.style.display = atLeastOne ? "none" : "unset";
});

function doesMatch(productObj, filters) {
  for (const [attrName, filter] of Object.entries(filters)) {
    const value = productObj[attrName];
    if (VALUES_TO_IGNORE.includes(value)) {
      return false;
    }

    if (attrTypes[attrName] === "number") {
      if (value < filter.min || value > filter.max) {
        return false;
      }
    }
    if (attrTypes[attrName] === "string") {
      if (!filter.includes(value)) {
        return false;
      }
    }
  }
  return true;
}
