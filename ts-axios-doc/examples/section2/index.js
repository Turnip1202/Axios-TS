"use strict";
let defaults = {
    food: 'spicy',
    price: '$10',
    ambiance: 'noisy'
};
let search = Object.assign({ food: 'rich' }, defaults);
console.log(search);
