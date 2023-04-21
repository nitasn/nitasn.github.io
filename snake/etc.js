'use strict';

const random_entry = (arr) => arr[Math.floor(Math.random() * arr.length)];

const split_lines = (txt) => txt.split(/\n\s*/g).slice(1, -1);

const random_pastel_color = () => {
    const hue = 153 + Math.floor(Math.random() * 217);
    const saturation = 10 + Math.floor(Math.random() * 40);
    const value = 22 + Math.floor(Math.random() * 40);
    return `hsl(${hue}, ${saturation}%, ${value}%)`
};

/**
 * the perceived brightness of a color.
 * @param {string} color a valid css rgb string like rgb(75, 140, 175)
 * @returns {number} a number between 0 and 1
 */
const gray_scale_value = (color) => {
    let [r, g, b] = color.match(/\d+/g);
    let result = .299 * r + .587 * g + .114 * b;
    result = Math.max(0, Math.min(result, 255));
    return result / 255;
};