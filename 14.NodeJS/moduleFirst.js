// const simple = require('./moduleSecond.js');

// import {simple2 as simple} from "./moduleSecond.mjs"
// import {simple2, simple} from "./moduleSecond.mjs"
// simple2();
// simple();

import * as a from "./moduleSecond.mjs";

console.log(a);
console.log(a.simple())