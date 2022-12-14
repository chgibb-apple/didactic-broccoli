// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --harmony-weak-refs --expose-gc --noincremental-marking

load("./resources/v8-mjsunit.js", "caller relative");

let cleanup_call_count = 0;
let cleanup_holdings_count = 0;
let cleanup = function(holdings) {
  assertEquals(holdings, "holdings");

  // There's mores symbol with the same key that we haven't
  // cleaned up yet so we should be able to unregister the
  // callback for that one.
  let success = fg.unregister(key);

  assertTrue(success);

  ++cleanup_holdings_count;
  ++cleanup_call_count;
}

let fg = new FinalizationRegistry(cleanup);
// Create an symbol and register it in the FinalizationRegistry. The symbol needs to be inside
// a closure so that we can reliably kill them!
let key = Symbol();

(function() {
    for (let i = 0; i < 1000; ++i) {
        let symbol = Symbol();
        let symbol2 = Symbol();
        fg.register(symbol, "holdings", key);
        fg.register(symbol2, "holdings", key);
    }
})();

// This GC will discover dirty WeakCells and schedule cleanup.
gc();
assertEquals(0, cleanup_call_count);

// Assert that the cleanup function was called.
let timeout_func = function() {
  assertEquals(1, cleanup_call_count);
  assertEquals(1, cleanup_holdings_count);
}

setTimeout(timeout_func, 0);
