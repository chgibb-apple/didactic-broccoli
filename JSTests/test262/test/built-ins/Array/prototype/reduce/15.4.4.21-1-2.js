// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.reduce
description: Array.prototype.reduce applied to null
---*/


assert.throws(TypeError, function() {
  Array.prototype.reduce.call(null);
});

d114e52b708328d883f89c988c04825046a3a64c834df7085ea729fec5ca794d