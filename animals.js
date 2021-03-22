'use strict';

(function iife() {

    const urls = [
        'foxy.jpg',
        'kitty.jpg',
        'welsh-corgi.jpg',
    ]
    .map(url => './cute-animals/' + url);


    const mainImg = document.getElementById('main-img');
    const againBtn = document.getElementById('btn-again');


    const infiniteRandIter = infinite_random_iter(urls);

    function changeImage() {
        mainImg.src = infiniteRandIter.next();
    }

    againBtn.addEventListener('click', changeImage);

    changeImage();
})();