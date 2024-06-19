jQuery(document).ready(function ($) {

  $("#mobile-toggle").on("click", function (e) {
    e.preventDefault();
    $('html').toggleClass('open-mobile-navbar');
    $(this).find(".fas")[0].toggleClass("fa-bars fa-times");
    $(".menu-main-menu-container").toggleClass("show");
  });

  if (window.innerWidth <= 992) {
    $('.menu-main-menu-container').append($('.header-search'));
    document.querySelectorAll('header li.menu-item-has-children').forEach((li) => {
      let arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill="#fff"><path d="M20 26.125 9.75 15.917h20.5Z"/></svg>`;
      li.insertBefore(arrow, li.querySelector('ul.sub-menu'));
    });

    $.each($('header li.menu-item-has-children .arrow'), function (key, arrow) {
      $(arrow).on('click', openSub);
    });


  }

  function openSub() {
    $(this).siblings('.sub-menu').toggleClass('open');
    $(this).toggleClass('open');
  }


});


