// Copyright (C) 2020 Rick Waldron. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-ecmascript-standard-built-in-objects
description: >
  Function.prototype.toString does not implement [[Construct]], is not new-able
info: |
  ECMAScript Function Objects

  Built-in function objects that are not identified as constructors do not
  implement the [[Construct]] internal method unless otherwise specified in
  the description of a particular function.

  sec-evaluatenew

  ...
  7. If IsConstructor(constructor) is false, throw a TypeError exception.
  ...
includes: [isConstructor.js]
features: [Reflect.construct, arrow-function]
---*/

assert.sameValue(
  isConstructor(Function.prototype.toString),
  false,
  'isConstructor(Function.prototype.toString) must return false'
);

assert.throws(TypeError, () => {
  new Function.prototype.toString();
}, '`new Function.prototype.toString()` throws TypeError');

var toString = Function.prototype.toString;
assert.throws(TypeError, () => {
  new toString;
}, '`new toString` throws TypeError');
