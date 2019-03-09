class MySet
{
  constructor(opt_data)
  {
    if (opt_data)
    {
      this._dataset = opt_data;
    } else {
      this._dataset = [];
    }
  }

  addValue(val)
  {
    if (!this.hasValue(val))
    {
        this._dataset.push(val);
    }
    return this;
  }

  removeValue(val)
  {
    for (let i in this._dataset)
    {
      if (this._dataset[i] === val)
      {
        this._dataset.splice(i, 1);
      }
    }
    return this;
  }

  size()
  {
    return this._dataset.length;
  }

  hasValue(val)
  {
    return (this._dataset.indexOf(val) > -1) ? true : false;
  }

  cloneSet()
  {
    return new MySet(this.toArray());
  }

  toArray()
  {
    let new_set = [];
    for (let i of this._dataset)
    {
      new_set.push(i);
    }
    return new_set;
  }

  forEach(cb_function)
  {
    for (let i of this._dataset)
    {
      cb_function(i);
    }
  }

  isEqual(dataset_b)
  {
    if (this.size() !== dataset_b.size()) return false;
    for (let a of this._dataset)
    {
      if (!dataset_b.hasValue(a)) return false;
    }
    return true;
  }
}
