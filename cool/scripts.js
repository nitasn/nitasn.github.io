'use strict';


// todo keep punctuations as they were!
//  hello, how are you?
//  cool, cool cool cool?

function binray2text(string) {
    return string.split(' ').map(function (bits) {
        return String.fromCharCode(parseInt(bits, 2));
    }).join('');
}

function text2binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
}

function binray2inv(string) {
    return string.replace(/0/g, '\u200B').replace(/1/g, '\u200D').replace(/ /g, '\uFEFF');
}

function inv2binary(string) {
    return string.replace(/\u200B/g, '0').replace(/\u200D/g, '1').replace(/\uFEFF/g, ' ');
}


function text2inv(string) {
    return binray2inv(text2binary(string));
}

function inv2text(string) {
    return binray2text(inv2binary(string));
}


const O_SHAPES = 'oôöòóōõ'


function hash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

function word2cool(word) {
    const o_ = O_SHAPES[hash(word, 0) % O_SHAPES.length];
    const _o = O_SHAPES[hash(word, 1) % O_SHAPES.length];
    return `c${_o}${text2inv(word)}${o_}l`;
}

function cool2word(cool) {
    const inv = cool.substring('co'.length, cool.length - 'ol'.length);
    return inv2text(inv);
}

function words2cools(string) {
    return string.split(' ').map(word2cool).join(' ');
}

function cools2words(string) {
    return string.split(' ').map(cool2word).join(' ');
}

function is_sentence_cool(sentence) {
    return sentence.includes('\u200B') || sentence.includes('\u200D') || sentence.includes('\uFEFF');
}


String.prototype.simplify_spaces = function() {
    // remove trailing whitespaces, and reduce any (non inv) whitespces into a single normal space.
    return this.replace(/(^\s+|\s+$)/g,'').replace(/(?=\s+)(?=[^\u200B\u200D\uFEFF])/g, ' ');
};


function process_input(text) {
    if (is_sentence_cool(text))
        return cools2words(text);
    return words2cools(text);
}


function clearInput() {
    $('#main-input').val('');
    on_input_change();
}

async function pasteInput() {
    // todo this doesn't work on iphone :(

    document.getElementById('main-input').focus();
    document.execCommand('paste');

    const text = await navigator.clipboard.readText();
    $('#main-input').val(text);

    on_input_change();
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};


function copyOutput() {
    const quotedTxt = document.getElementById('main-output').innerText;
    if (quotedTxt) {
        const text = quotedTxt.substring(1, quotedTxt.length - 1); // get rid of quotes
        copyToClipboard(text);
        alert(`copied "${text}" to clipboard.`)
    }
}

function on_input_change() {
    // trim and replace any multiple spaces group with a single space
    const input = $.trim($("#main-input").val()).replace(/ +/g, ' ');
    const set_output = (txt) => document.getElementById('main-output').innerText = txt;
    if (!input) {
        set_output('');
        document.getElementById('copy-btn').style.visibility = "hidden";
    }
    else {
        const out = process_input(input);
        set_output(`"${out}"`);
        document.getElementById('copy-btn').style.visibility = "visible";
    }
}

function fixTextAreaSize() {
    let maxDesired = 55;
    let screenSize = $(window).width() / 16;

    const main_input = document.getElementById('main-input');
    main_input.cols = Math.min(maxDesired, screenSize);
    document.getElementById('menu-table').width = main_input.offsetWidth + "px";

    maxDesired = 7;
    screenSize = $(window).height() / 150;

    document.getElementById('main-input').rows = Math.min(maxDesired, screenSize);
}

$(window).resize(function() {
    fixTextAreaSize(); 
});

$('document').ready(function() {
    fixTextAreaSize(); 

    // calls on_input_change when user writes to main-input.
    // thx Vicky Chijwani from stack overflow.
    const area = document.getElementById('main-input');
    if (area.addEventListener) {
        area.addEventListener('input', function() {
            on_input_change(); // for sane browsers
        }, false);
    } else if (area.attachEvent) {
        area.attachEvent('onpropertychange', function() {
            on_input_change(); // for IE
        });
    }

    on_input_change();
});
