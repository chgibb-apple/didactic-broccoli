// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --harmony-weak-refs --expose-gc --noincremental-marking

load("./resources/v8-mjsunit.js", "caller relative");

let cleanup_called = false;
let holdings_list = [];
let cleanup = function(holdings) {
  assertFalse(cleanup_called);
  holdings_list.push(holdings);
  cleanup_called = true;
}

let fg = new FinalizationRegistry(cleanup);
let s1 = Symbol();
let holdings = {'a': 'this is the holdings object'};

// Ignition holds references to objects in temporary registers. These will be
// released when the function exits. So only access o inside a function to
// prevent any references to objects in temporary registers when a gc is
// triggered.
(() => {fg.register(s1, holdings);})()

gc();
assertFalse(cleanup_called);

// Drop the last references to s1.
(() => {s1 = null;})()

// Drop the last reference to the holdings. The FinalizationRegistry keeps it
// alive, so the cleanup function will be called as normal.
holdings = null;
gc();
assertFalse(cleanup_called);

let timeout_func = function() {
  assertTrue(cleanup_called);
  assertEquals(holdings_list.length, 1);
  assertEquals(holdings_list[0].a, "this is the holdings object");
}

setTimeout(timeout_func, 0);
