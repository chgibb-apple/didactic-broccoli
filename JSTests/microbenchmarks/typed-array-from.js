var a1 = new Uint8Array(1024 * 1024 * 1);
a1.fill(99);
for (var i = 0; i < 1e2; ++i)
    var a2 = Uint8Array.from(a1);
