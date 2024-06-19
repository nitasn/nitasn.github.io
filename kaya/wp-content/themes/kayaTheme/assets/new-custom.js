jQuery(document).ready((function (e) {

  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const header = document.querySelector('header');

  // const is_distributors_page = body.classList.contains('page-template-page-distributors');

  const products_megamenu_container = document.querySelector('#products-megamenu-categories');

  const products_menu_item = header.querySelector('li.products-mega-menu');

  products_menu_item.appendChild(products_megamenu_container);
  // if (is_distributors_page) {
  products_menu_item.addEventListener('mouseenter', () => {
    // html.style.overflowY = 'hidden';
    products_megamenu_container.classList.remove('hide');
    html.style.overflowY = 'hidden';
  });

  products_menu_item.addEventListener('mouseleave', () => {
    // html.style.overflowY = 'auto';
    products_megamenu_container.classList.add('hide');
    html.style.overflowY = 'visible';
  });
  // }

}));