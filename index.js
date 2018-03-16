var endow = (function () {
/*! (c) Andrea Giammarchi, @WebReflection (ISC) */
// inspired by https://github.com/justinfagnani/mixwith.js#mixwith

// If not available, Symbol could even be a special `String` here
var classes = Symbol('endow');

// fallback to same symbol, ignore hasInstance completely
// in this case code will be transpiled and the result
// of every instanceof will be simply false
var hasInstance = Symbol.hasInstance || classes;

// Symbol.hasInstance descriptor is always the same
// no need to pollute GC with useless garbage
var descriptor = {
  configurable: true,
  value: function (object) {
    return this[classes].some(instanceOf, object);
  }
};

// endow can be imported as default or as {endow}

return function endow(Super) {
  return {
    // IE < 9 might throw with code that uses `{with: ...}`
    "with": function () {
      for (var
        Mixin,
        Class = Super,
        i = 0, length = arguments.length; i < length; i++
      ) {
        Mixin = arguments[i];
        Class = Mixin(Class);
        // A Mixin knows all classes it extended.
        // there is no iterable WeakSet to do this,
        // so derived classes are retained once.
        // This should not be a real-world issue
        // because classes are usually a pre-defined,
        // well known, amount.
        // If you create a lot of classes on the fly though,
        // and you'd like to use endow, be sure you drain
        // that Mixin list from time to time.
        //
        //  Object.getOwnPropertySymbols(Mixin)
        //    .some(s => /\bendow\b/.test(String(s)) && Mixin[s].splice(0));
        //
        // Please note after that instanceof operations won't be reliable.
        // If you create a lot of classes on the fly though, most likely
        // you won't ever need instanceof against Mixins.
        if (has(Mixin, classes)) {
          Mixin[classes].push(Class);
        } else if (!has(Mixin, hasInstance)) {
          define(Mixin, Class, {});
        }
      }
      return Class;
    }
  };
}

// order matters. In case of a fallback to same symbol
// the Symbol.hasInstance is ignored/overwritten
function define(Mixin, Class, descriptors) {
  descriptors[hasInstance] = descriptor;
  descriptors[classes] = {value: [Class]};
  Object.defineProperties(Mixin, descriptors);
}

// minifier friendly shortcut
function has(object, value) {
  return object.hasOwnProperty(value);
}

// handy array.some(...) helper
function instanceOf(Class) {
  return this instanceof Class;
}
}());
