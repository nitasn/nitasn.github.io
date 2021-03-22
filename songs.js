'use strict';

(function iife() {

    const vid_ids = [
        'XaCrQL_8eMY',
        'gte3BoXKwP0',
        'SmbmeOgWsqE',
    ]
    .map(id => `https://www.youtube.com/embed/${id}`);


    const mainVid = document.getElementById('main-video');
    const againBtn = document.getElementById('btn-again');


    const infiniteRandIter = infinite_random_iter(vid_ids);

    function changeImage() {
        mainVid.src = infiniteRandIter.next();
    }

    againBtn.addEventListener('click', changeImage);

    changeImage();


    function fixSize() {
        const {width, height} = mainVid.getBoundingClientRect();
        console.log(width, height);
        mainVid.style.pixelHeight = 12;
    }

    window.addEventListener('resize', fixSize);
})();