'use strict';

const infinite_random_iter = (array) => {

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function shuffledIndices(arr) {
        const indices = [...arr.keys()];
        shuffleArray(indices);
        return indices;
    }

    const last_of = (arr) => {
        return arr[arr.length - 1];
    }

    // function randomIntFromInterval(min, max) { // min and max included
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    // }

    let idxInPerm = 0; // goes from 0 to array.length - 1 repeatedly
    let indicesPermutation = shuffledIndices(array);

    return {
        next() {
            if (indicesPermutation.length === 0) {
                return; // just in case...
            }
            if (idxInPerm === indicesPermutation.length) { // if reached end
                let newPerm = shuffledIndices(array); // start a new cycle
                if (last_of(indicesPermutation) === newPerm[0]) {
                    // if prev's last img == new's first img,
                    // take the new's middle img to be the first
                    const j = Math.floor(array.length / 2);
                    [newPerm[0], newPerm[j]] = [newPerm[j], newPerm[0]];
                }
                indicesPermutation = newPerm;
                idxInPerm = 0;
            }
            const arrIdx = indicesPermutation[idxInPerm++];
            return array[arrIdx];
        }
    }
};