'use strict';

const random_entry = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * splits by new lines characters, and trims indentations.
 * @param {string} txt 
 */
const split_lines = (txt) => txt.split(/\n\s*/g);

/**
 * @returns {number[]} h ∈ [0, 360]; s ∈ [0, 100]; v ∈ [0, 100];
 */
const _random_pastel_hsl_values = () => {

    const h = 153 + Math.floor(Math.random() * 217);
    const s = 10 + Math.floor(Math.random() * 40);
    const v = 22 + Math.floor(Math.random() * 40);

    return [h, s, v];
}

const range = n => [...Array(n).keys()];

const average_element_wise = (arr1, arr2) => {

    if (arr1.length !== arr2.length) throw new Error('size mismatch');

    return range(arr1.length).map(i => (arr1[i] + arr2[i]) / 2);
}

/**
 * @returns 3 valid css colors (in hsl format),
 * where the first two are random, and the third is their average.
 */
const random_pastel_colors = () => {

    const [h1, s1, v1] = _random_pastel_hsl_values();
    const [h2, s2, v2] = _random_pastel_hsl_values();
    const [h3, s3, v3] = average_element_wise([h1, s1, v1], [h2, s2, v2]);
    
    const color_1 = `hsl(${h1}, ${s1}%, ${v1}%)`;
    const color_2 = `hsl(${h2}, ${s2}%, ${v2}%)`;
    const average = `hsl(${h3}, ${s3}%, ${v3}%)`;

    return [color_1, color_2, average];
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