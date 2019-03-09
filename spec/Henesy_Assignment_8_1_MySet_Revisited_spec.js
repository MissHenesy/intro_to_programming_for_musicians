describe(`Testing Assignment 8.1, 'MySet Revisited'.
          This is the checklist::`, () => {
  let test_set,
      compare_set,
      test_array;

  beforeEach(function() {
    test_set = new MySet();
    compare_set = new MySet();
  });

  it ("should create new instances with or without values", () => {
    let empty_set = new MySet();
    let full_set = new MySet(["Jack","Kack","Lack","Mack","Nack","Ouack","Pack","Quack"]);
    expect(empty_set.size()).toBe(0);
    expect(full_set.size()).toBe(8);
  });
  it ("should add an item", () => {
    test_set.addValue("tea");
    expect(test_set.size()).toBe(1);
  });
  it ("should try to add duplicate items, but only contain unique items", () => {
    test_set.addValue(1).addValue(1).addValue(1).addValue(2)
            .addValue(2).addValue(3).addValue(3).addValue(3);
    compare_set.addValue(1).addValue(2).addValue(3);
    expect(test_set).toEqual(compare_set);
  });
  it ("should compare two sets and tell if they are equal to each other", () => {
    test_set.addValue("Chico").addValue("Harpo").addValue("Groucho");
    compare_set.addValue("Chico").addValue("Harpo").addValue("Groucho");
    expect(test_set.isEqual(compare_set)).toBe(true);

    compare_set.addValue("Gummo").addValue("Zeppo");
    expect(test_set.isEqual(compare_set)).toBe(false);
  });
  it ("should remove an item", () => {
    test_set.addValue(3).addValue(3).addValue(4).addValue(5).addValue(3);
    test_set.removeValue(3);
    expect(test_set.hasValue(4)).toBe(true);
    expect(test_set.hasValue(5)).toBe(true);
    expect(test_set.hasValue(3)).toBe(false);
  });
  it ("should clone a set without affecting the original set", () => {
    test_set.addValue("raindrops on roses");
    test_set.addValue("whiskers on kittens");
    test_set.addValue("bright copper kettles");
    test_set.addValue("warm woolen mittens");
    let cloned_set = test_set.cloneSet();
    expect(test_set.isEqual(cloned_set)).toBe(true);

    cloned_set.addValue("cream-coloured ponies");
    cloned_set.addValue("crisp apple strudels");
    cloned_set.addValue("doorbells and sleighbells");
    cloned_set.addValue("schnitzel with noodles");
    expect(test_set.isEqual(cloned_set)).toBe(false);
  });
  it ("should create an array from a set, without impacting the original set", () => {
    test_set.addValue(1).addValue(2).addValue(3);
    test_array = test_set.toArray();
    test_array.push(4, 5, 6);
    expect(test_set.size()).toBe(3);
    expect(test_array.length).toBe(6);
    expect(test_set.size()).not.toEqual(test_array.length);
  });
  it ("should use a forEach method that manipulates each value in our set", () => {
    test_set.addValue("piano").addValue("guitar").addValue("oboe")
    test_set.forEach(pluralize);
    let div_results = document.getElementById("divForEachTest").innerHTML;
    expect(div_results).toBe("pianos guitars oboes ");
  });
});

function pluralize(element)
{
  element += "s";
  div_with_new_vals = document.getElementById("divForEachTest");
  div_with_new_vals.innerHTML += element + " ";
}
