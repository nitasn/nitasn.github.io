function html(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] ?? ""), "");
}

function onToggleFilter(e) {
  e.preventDefault();

  // prevents opening both at the same time via tab-navigation
  if (document.body.classList.contains("in-table-mode")) {
    return;
  }

  document.body.classList.toggle("filter-is-open");
}

function onToggleTable(e) {
  e.preventDefault();

  // prevents opening both at the same time via tab-navigation
  if (document.body.classList.contains("filter-is-open")) {
    return;
  }

  document.body.classList.toggle("in-table-mode");
  document.body.classList.add("table-has-opened-at-least-once");
  InTableMode.set((prev) => !prev);
}

function injectMyHTML() {
  const productsContainer = document.querySelector("main section.products .products-container");

  productsContainer.outerHTML = html`
    <div class="toggles">
      <a href="#" class="toggle toggle-filter" onclick="onToggleFilter(event)">
        <i class="icon fas fa-filter"></i>
        <h3 class="title">Filter</h3>
      </a>
      <!-- <a href="#" class="toggle toggle-all" onclick="event.preventDefault()">
        <i class="icon fas fa-th-large"></i>
        <h3 class="title">All</h3>
      </a> -->
      <a href="#" class="toggle toggle-table" onclick="onToggleTable(event)">
        <i class="icon fas fa-table"></i>
        <h3 class="title">Table</h3>
      </a>
    </div>
    <div class="products-wrapper">
      <div class="products-filters-area">
        <!-- content injected by react (root) -->
      </div>
      <div class="products-main-area">
        <div class="lil-wrapper-products-container">
          ${productsContainer.outerHTML}
          <p class="msg-all-products-filtered" style="display: none">
            All products have been filtered out. Please broaden your query.
          </p>
        </div>
        <!-- content injected by react (portal) -->
      </div>
    </div>
  `;
}

injectMyHTML();

const reactRoot = document.querySelector(".products-filters-area");
ReactDOM.createRoot(reactRoot).render(<Main />);
