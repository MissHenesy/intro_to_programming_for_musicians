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
    return Array.from(this._dataset);
  }

  for_each()
  {
    this._dataset.forEach(function callback(element)
      {
        console.log(`this forEach element = ${element}`);
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
