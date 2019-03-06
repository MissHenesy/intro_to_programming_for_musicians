class MySet
{
  constructor(opt_data)
  {
    this._dataset = new Set(opt_data);
  }

  add(val)
  {
    return this._dataset.add(val);
  }

  remove(val)
  {
    this._dataset.delete(val);
  }

  size()
  {
    return this._dataset.size;
  }

  has(val)
  {
    return this._dataset.has(val);
  }

  clone()
  {
    return new MySet(this._dataset);
  }

  toArray()
  {
    // Using "Array.from" will clone our set,
    // so we won't have to worry about changes
    // to the array affecting our original set.
    //console.log(this);
    return Array.from(this._dataset);
  }

  for_each()
  {
    this._dataset.forEach(function callback(element)
      {
        console.log(element);
      }
    );
  }

  is_equal(dataset_b)
  {
    if (this.size() !== dataset_b.size()) return false;
    for (let a of this._dataset)
    {
      if (!dataset_b.has(a)) return false;
    }
    return true;
  }
}
//----------------------------------------------------------------------------
let ms1 = new MySet();
ms1.add(4);
ms1.add(4);
ms1.add(5);
ms1.add(6);
console.log(ms1);
console.log(ms1.toArray());
// prints 4, 5, 6

let ms2 = new MySet([1,2,1,3]);
console.log(ms2);
let ms2_arr = ms2.toArray();
console.log(ms2_arr);

ms2_arr.push(86, 87, 88);
console.log("ms2 array: " + ms2_arr);
console.log("ms2 dataset: ");
console.log(ms2);

let ms3 = ms2.clone();
console.log("ms3 dataset: ");
console.log(ms3);

console.log("ms2 size is: " + ms2.size());
console.log("ms3 size is: " + ms3.size());
console.log(ms2.has(3));
ms2.remove(3);
ms2.remove(1);
ms2.remove(2);
ms2.add(4);
ms2.add(5);
ms2.add(6);
console.log(ms2.has(3));
console.log("Is ms2 = ms3?");
console.log(ms2.is_equal(ms3));
console.log("----------------------------------");
ms1.for_each();
console.log("----------------------------------");
ms2.for_each();
console.log("----------------------------------");
ms3.for_each();
console.log("----------------------------------");

let ms4 = new MySet(["tea", "coffee", "milk"]);
ms4.add("sugar").add("milk");
ms4.add("cream");
ms4.add(5);
ms4.add("spoon");
let ms4_arr = ms4.toArray();
ms4_arr.push("saucer","scone","cucumber sandwich");
console.log(ms4_arr);
let foreach_vals = ms4.for_each();
console.log(foreach_vals);
