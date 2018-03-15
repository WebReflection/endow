var endow = (function (cache, modules) {
  function require(i) { return cache[i] || get(i); }
  function get(i) {
    var exports = {}, module = {exports: exports};
    modules[i].call(exports, window, require, module, exports);
    return (cache[i] = module.exports);
  }
  require.E = function (exports) { return Object.defineProperty(exports, '__esModule', {value: true}); };
  var main = require(0);
  return main.__esModule ? main.default : main;
}([],[function (global, require, module, exports) {
// index.js
'use strict';
/*! (c) Andrea Giammarchi, @WebReflection (ISC) */
// inspired by https://github.com/justinfagnani/mixwith.js#mixwith

require.E(exports).default = endow;
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

}]));
