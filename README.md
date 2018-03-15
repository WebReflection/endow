# endow
A minimalistic, yet powerful, class based mixin utility.

Following an approach explained in [this post](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/),
and inspired by [the following utility](inspired by https://github.com/justinfagnani/mixwith.js#mixwith),
_endow_ makes creation of mixins a no brainer, giving the ability to use `instanceof` operator.

```js
// define mixins through this class based pattern
const Mixin1 = Super = class extends Super {
  behavior1() {}
};
const Mixin2 = Super = class extends Super {
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