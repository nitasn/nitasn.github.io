'use strict';

const btnSong = document.getElementById('song-btn');
const btnAnimal = document.getElementById('animal-btn');
const btnQuote = document.getElementById('quote-btn');
const btnOkay = document.getElementById('okay-btn');

btnAnimal.addEventListener('click', () => {
    window.location.href = './animals.html';
});