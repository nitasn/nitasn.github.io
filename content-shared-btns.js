'use strict';

const homeBtn = document.getElementById('btn-home');
const iAmBetterBtn = document.getElementById('i-am-better-btn');

homeBtn.addEventListener('click', () => {
    window.location.href = './index.html';
});