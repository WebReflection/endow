# endow [![Coverage Status](https://coveralls.io/repos/github/WebReflection/endow/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/endow?branch=master) [![Build Status](https://travis-ci.org/WebReflection/endow.svg?branch=master)](https://travis-ci.org/WebReflection/endow) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A minimalistic, yet powerful, class based mixin utility.

Following an approach explained in [this post](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/),
and inspired by one piece of [the following utility](https://github.com/justinfagnani/mixwith.js#mixwith),
_endow_ makes creation of mixins a no-brainer, giving the ability to use `instanceof` operator.

```js
// define mixins through this class based pattern
const Mixin1 = Super => class extends Super {
  behavior1() {}
};
const Mixin2 = Super => class extends Super {
  behavior2() {}
};

// endow classes with mixins while extending
class Sub extends endow(Super).with(Mixin1, Mixin2) {
  behaviors() {
    this.behavior1();
    this.behavior2();
  }
}

new Sub instanceof Sub;     // true
new Sub instanceof Super;   // true
new Sub instanceof Mixin1;  // true
new Sub instanceof Mixin2;  // true
```

### How to include

  * _ESM_ via `import endow from 'endow/esm'`
  * _CJS_ via `const {endow} = require('endow/cjs');`
  * browsers via [unpkg.com/endow](https://unpkg.com/endow)


### Compatibility

This module syntax is purposely written in an ES3 compatible fashion.

ES5 [Array#some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) and [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) are needed,
and to have a proper `instanceof` operator result, the [Symbol.hasInstance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance) is needed too,
but it's not mandatory.

Please note this utility works with all polyfills <sup><sub>(loaded upfront)</sub></sup> and transpilers too.

#### Size

  * plain `index.js` is 2535 bytes
  * plain `min.js` is 499 bytes
  * gzip `min.js` is 336 bytes
  * brotli `min.js` is 282 bytes
