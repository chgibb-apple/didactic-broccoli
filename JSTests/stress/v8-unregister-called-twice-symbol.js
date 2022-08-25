// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --harmony-weak-refs --expose-gc --noincremental-marking

load("./resources/v8-mjsunit.js", "caller relative");

let cleanup_call_count = 0;
let cleanup = function(holdings) {
  ++cleanup_call_count;
}

let fg = new FinalizationRegistry(cleanup);
let key = Symbol();
// Create an symbol and register it in the FinalizationRegistry. The symbol needs
// to be inside a closure so that we can reliably kill them!

(function() {
  let symbol = Symbol();
  fg.register(symbol, "holdings", key);

  // Unregister before the GC has a chance to discover the symbol.
  let success = fg.unregister(key);
  assertTrue(success);

  // Call unregister again (just to assert we handle this gracefully).
  success = fg.unregister(key);
  assertFalse(success);

  // symbol goes out of scope.
})();

// This GC will reclaim the target symbol.
gc();
assertEquals(0, cleanup_call_count);

// Assert that the cleanup function won't be called, since the weak reference
// was unregistered.
let timeout_func = function() {
  assertEquals(0, cleanup_call_count);
}

setTimeout(timeout_func, 0);
