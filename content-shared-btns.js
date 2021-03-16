'use strict';

const homeBtn = document.getElementById('btn-home');
const iAmBetterBtn = document.getElementById('btn-am-better');

homeBtn.addEventListener('click', () => {
    window.location.href = './index.html';
});