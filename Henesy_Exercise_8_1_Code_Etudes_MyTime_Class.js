class MyTime
{
  constructor(hh, mm, ss)
  {
    this._value = MyTime._time_to_value(hh, mm, ss);
  }

  static _time_to_value(hh, mm, ss)
  {
    hh = hh.toString().padStart(2, "0");
    mm = mm.toString().padStart(2, "0");
    ss = ss.toString().padStart(2, "0");
    return new Date(1980, 6, 15, hh, mm, ss);
  }

  static fromString(time_string)
  {
    let ts = get_formatted_time_string(time_string);

    let parts = ts.split(":"),
        hh = parseInt(parts[0]),
        mm = parseInt(parts[1]),
        ss = parseInt(parts[2]);
    return new MyTime(hh, mm, ss);
  }

  // Write a class method called "compare" that takes two MyTime instances
  // as parameters and compares them. If the first parameter is less than
  // the second, return -1. If the second parameter is lower, return 1, and
  // if they're the same, return 0.
  static compare(time_a, time_b)
  {
    let t1 = time_a._value.getTime(),
        t2 = time_b._value.getTime();

    if (t1 < t2)
    {
      return -1;
    } else if (t1 === t2) {
      return 0;
    } else {
      return 1;
    }
  }

  toString()
  {
    return this._value.toLocaleTimeString();
  }
}

//------------------------------------------------------------------------
// HELPER FUNCTIONS
//------------------------------------------------------------------------
function get_formatted_time_string(str_time)
{
  let str = str_time.toString().toLowerCase(),
      str_meridian = "",
      i_this_hh,
      i_new_hh,
      result;

  if (str.indexOf("a.m.") > 0 || str.indexOf("am") > 0)
  {
    str_meridian = "am";
  } else if (str.indexOf("p.m.") > 0 || str.indexOf("pm") > 0) {
    str_meridian = "pm";
  }

  result = str.replace(/a|p|m/ig, "");
  result = result.replace(/\D+/ig, ":");

  for (let i=0; i < 3; i++)
  {
    if (i === 0 && str_meridian === "pm" && parseInt(result.split(":")[0]) < 13)
    {
      i_this_hh = result.split(":")[0];
      i_new_hh = parseInt(i_this_hh) + 12;
      result = i_new_hh + result.slice(i_this_hh.length);
    }
    if (result.split(":")[i] == undefined)
    {
      result += ":00"
    }
  }
  return result;
}

function get_sorted_times(arr_times)
{
  let sorted = [];

  sorted = arr_times.sort(function(a, b)
    {
      a = MyTime.fromString(a);
      b = MyTime.fromString(b);
      return MyTime.compare(a, b);
    }
  );

  return sorted;
}

//let my_time = new MyTime(5, 10, 30);
//let my_time = MyTime.fromString("3-20-30");
//let my_time_val = MyTime.fromString("14:22:45");
//let my_time_val = new MyTime(55, 30, 15);
//let my_time_val = MyTime.fromString("1:15:45");
//console.log(my_time_val);
//console.log("To Human Readable String Value: " + my_time_val.toString());

//console.log("calling validator: " + is_valid_time(my_time_val._value));
// let t1 = new MyTime(6, 15, 00);
// let t2 = new MyTime(9, 15, 00);
//
// console.log("T1 and T2: " + t1 + ", " + t2);
//
// console.log(MyTime.compare(t1, t2));

let arrTimes = ["1pm", "5:15am", "7pm", 4, "12:25"];
console.log(get_sorted_times(arrTimes));
