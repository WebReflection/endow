const {endow} = require('./cjs');

const M1 = Super => class M1 extends Super {};
const M2 = Super => class M2 extends Super {};
class A {}
class B extends endow(A).with(M1) {}
class C extends endow(A).with(M2) {}
class D extends endow(A).with(M1, M2) {}

console.assert([
  new B instanceof A,
  new B instanceof M1,
  new C instanceof A,
  new C instanceof M2,
  new D instanceof A,
  new D instanceof M1,
  new D instanceof M2,
  !(new B instanceof M2),
  !(new C instanceof M1)
].every(Boolean));

const M3 = Super => class M3 extends Super {};
Object.defineProperty(M3, Symbol.hasInstance, {value() { return false; }});
class Z extends endow(A).with(M1, M3) {}

console.assert([
  new Z instanceof A,
  new Z instanceof M1,
  !(new Z instanceof M3)
].every(Boolean));

class G extends A {
  constructor() {
    super().G = true;
  }
}
const G1 = Super => class extends Super {
  constructor() {
    super().G1 = true;
  }
};
const G2 = Super => class extends Super {
  constructor() {
    super().G2 = true;
  }
};
endow.with(G1, G2)({kind: 'class', elements: []}).finisher(G);

console.assert([
  new G instanceof A,
  new G instanceof G,
  new G instanceof G1,
  new G instanceof G2,
  (new G).G && (new G).G1 && (new G).G2
].every(Boolean));

endow.with(G1, G2)({});

delete require.cache[require.resolve('./cjs')];
global.Symbol = String;
const {endow:ish} = require('./cjs');

const M4 = function (Super) {
  return class M4 extends Super {};
};
class E extends ish(A).with(M4) {}

console.assert([
  new E instanceof A,
  !(new E instanceof M4)
].every(Boolean));
