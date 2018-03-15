'use strict';
/*! (c) Andrea Giammarchi, @WebReflection (ISC) */
// inspired by https://github.com/justinfagnani/mixwith.js#mixwith

Object.defineProperty(exports, '__esModule', {value: true}).default = endow;
function endow(Super) {
  return {
    "with": function () {
      for (var
        Mixin,
        Class = Super,
        i = 0, length = arguments.length; i < length; i++
      ) {
        Mixin = arguments[i];
        Class = Mixin(Class);
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
exports.endow = endow

var classes = Symbol('endow');
var hasInstance = Symbol.hasInstance;
var descriptor = {
  configurable: true,
  value: function (object) {
    return this[classes].some(instanceOf, object);
  }
};

function define(Mixin, Class, descriptors) {
  descriptors[classes] = {value: [Class]};
  descriptors[hasInstance] = descriptor;
  Object.defineProperties(Mixin, descriptors);
}

function has(object, value) {
  return object.hasOwnProperty(value);
}

function instanceOf(Class) {
  return this instanceof Class;
}
