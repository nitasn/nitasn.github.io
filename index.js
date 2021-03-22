'use strict';

const btnSong = document.getElementById('song-btn');
const btnAnimal = document.getElementById('animal-btn');
const btnQuote = document.getElementById('quote-btn');
const btnOkay = document.getElementById('okay-btn');

btnAnimal.addEventListener('click', () => {
    window.location.href = './animals.html';
});

btnOkay.addEventListener('click', () => {
    window.location.href = './gonna-be-okay.html';
});

btnSong.addEventListener('click', () => {
    window.location.href = './songs.html';
});

btnQuote.addEventListener('click', () => {
    window.location.href = './content-page.html';
    const cw = document.querySelector('.content-wrap');
    console.log(cw);
});