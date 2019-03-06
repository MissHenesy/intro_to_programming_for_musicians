describe(`Testing Assignment 8.1, 'MySet Revisited'.
          This is the checklist::`, () => {
  let test_set, test_array;

  beforeEach(function() {
    test_set = new MySet();
  });
  it ("should add an item", () => {
    test_set.add("tea");
    expect(test_set.size()).toBe(1);
  });
  it ("should receive duplicated items but only contain unique items", () => {
    let compare_set = new MySet([1,2,3]);
    test_set.add(1).add(1).add(1).add(2).add(2).add(3).add(3).add(3);
    expect(test_set.is_equal(compare_set)).toBe(true);
  });
  it ("should remove an item", () => {
    test_set.add(1).add(2).add(2).add(3).add(3).add(3).add(4).add(5);
    test_set.remove(3);
    expect(test_set.has(3)).toBe(false);
  });
  it ("should create a clone without impacting the original set", () => {
    test_set.add("raindrops on roses");
    test_set.add("whiskers on kittens");
    test_set.add("bright copper kettles");
    test_set.add("warm woolen mittens");
    let cloned_set = test_set.clone();
    expect(test_set.is_equal(cloned_set)).toBe(true);

    cloned_set.add("cream-coloured ponies");
    cloned_set.add("crisp apple strudels");
    cloned_set.add("doorbells and sleighbells");
    cloned_set.add("schnitzel with noodles");
    expect(test_set.is_equal(cloned_set)).toBe(false);
  });
  it ("should create an array of unique values from a set", () => {
    test_set.add(1).add(2).add(3).add(4).add(4).add(5);
    test_array = test_set.toArray();
    let compare_array = [1,2,3,4,5];
    expect(test_array).toEqual(compare_array);
  });
  it ("should create an array from a set, without impacting the original set", () => {
    test_set.add(1).add(2).add(3);
    test_array = test_set.toArray();
    test_array.push(4, 5, 6);
    expect(test_set.size()).toBe(3);
    expect(test_array.length).toBe(6);
  });
  it ("should call a forEach function and not blow up", () => {
    test_set.add("tea").add("honey").add("cream").add("scones");
    expect(test_set.for_each()).toBe(undefined);
  });
});
