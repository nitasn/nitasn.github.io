'use strict';

const scales = 'C G D A E B F# C# G# D# A# F'.split(' ');

const progressions = split_lines(all_progressions_string).slice(1, -1);;


const scale_elmnt = document.getElementById('scale');

const progression_elmnt = document.getElementById('progression');

const main_elmnt = document.querySelector('main');


const flip_it = () => {

    scale_elmnt.innerText = random_entry(scales);
    progression_elmnt.innerText = random_entry(progressions);

    const [color_1, color_2, average] = random_pastel_colors();
    
    main_elmnt.style.background = 
        `linear-gradient(to left bottom, ${color_1}, ${color_2})`;

    scale_elmnt.style.color = average;

    progression_elmnt.style.color = average;
};

// window.addEventListener('load', flip_it);

document.getElementById('glass').addEventListener('click', flip_it);