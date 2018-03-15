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

The compatibility is every JS engine, but you need a global `Symbol` and, if you want to use `instanceof` to check your objects, a `Symbol.hasInstance` compatible, or transpiled, environment.
