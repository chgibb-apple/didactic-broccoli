function shouldBe(actual, expected) {
    if (actual !== expected)
        throw new Error('bad value: ' + actual);
}

for (let i = 0; i < 30; i++) {
    let array = Array.from({ length: 1024 * 1024 * 2 });
    shouldBe(array.length, 1024 * 1024 * 2);
    shouldBe(1 in array, true);
    shouldBe(array[0], undefined);
    shouldBe(array[1], undefined);
}
