/************************************************************************/
/* ASSIGNMENT 4: PART 1                                                 */
/************************************************************************/
run_tests();

//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
// FUNCTIONS TO RUN MY FUNCTIONS!
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
function run_tests()
{
  let arr_vals,
      new_val1,
      new_val2,
      new_arr,
      new_arr_minus_one;

  arr_vals = [1,2,3];
  new_val1 = 3;
  new_val2 = 4;
  new_arr = [1,2,3,4];
  new_arr_minus_one = [1,2,4];
  get_test_results(arr_vals, new_val1, new_val2, new_arr,new_arr_minus_one);

  arr_vals = ["cats","spiders","ghosts","furbies"];
  new_val1 = "furbies";
  new_val2 = "red pandas";
  new_arr = ["cats","furbies","ghosts","red pandas","spiders"];
  new_arr_minus_one = ["cats","ghosts","red pandas","spiders"];
  get_test_results(arr_vals, new_val1, new_val2, new_arr,new_arr_minus_one);

  arr_vals = ["oolong","green","rooibos","yerba mate","matcha"];
  new_val1 = "oolong";
  new_val2 = "pu'er";
  new_arr = ["oolong","rooibos","yerba mate","green","pu'er","matcha"];
  new_arr_minus_one = ["green","rooibos","yerba mate","matcha","pu'er"];
  get_test_results(arr_vals, new_val1, new_val2, new_arr,new_arr_minus_one);
}
//------------------------------------------------------------------------
function get_test_results(arr_test_vals, new_val1, new_val2, new_arr, new_arr_minus_one)
{
  let test_set = arr_test_vals;
  let new_set;

  console.log("------------------------------");
  console.log("*****  RUNNING TEST  *********");
  console.log("------------------------------");
  console.log("TEST SET VALUES: ");
  console.log(test_set);
  console.log("------------------------------");

  console.log("... Creating new_set....");
  new_set = myset_add(test_set, new_val1);
  console.log("Created new_set and added value '" + new_val1 + "', did it succeed?");
  console.log("Original test_set vals: " + test_set);
  console.log("new_set vals: " + new_set);
  if ( arrays_equal(new_set.sort(), test_set.sort()) )
  {
    console.log("RESULT: Succeeded!");
  } else {
    console.log("RESULT: Failed :-(");
  }
  console.log("------------------------------");
  console.log("new_set is currently: " + new_set);
  console.log("... Adding new value '" + new_val2 + "' to new_set ....");
  new_set = myset_add(test_set, new_val2);
  console.log("Did we succeed?");
  console.log("new_set vals after adding new value: " + new_set);

  if ( arrays_equal(new_set.sort(), new_arr.sort()) )
  {
    console.log("RESULT: Succeeded!");
  } else {
    console.log("RESULT: Failed :-(");
  }
  console.log("------------------------------");
  console.log("Now we will remove value '" + new_val1 + "' from new_set...");
  console.log("new_set is currently: " + new_set);
  console.log("... Removing value....");
  new_set = myset_remove(new_set, new_val1);
  console.log("Did we succeed in removing the value?");
  console.log("new_set is now: " + new_set);
  if ( arrays_equal(new_set.sort(), new_arr_minus_one.sort()) )
  {
    console.log("RESULT: Succeeded!");
  } else {
    console.log("RESULT: Failed :-(");
  }
  console.log("------------------------------");

  console.log("Now let's see if new_set has value '" + new_val1 + "'");
  console.log("... Running 'myset_has()' function ...")
  console.log("Is '" + new_val1 + "' in new_set? " + myset_has(new_set, new_val1));
  console.log("------------------------------");

  console.log("Now let's see if new_set has value '" + new_val2 + "'");
  console.log("... Running 'myset_has()' function ...")
  console.log("Is '" + new_val2 + "' in new_set? " + myset_has(new_set, new_val2));
  console.log("------------------------------");
  console.log("\n");
}

//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
// MAIN ASSIGNMENT FUNCTIONS
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
function myset_add(data, new_value)
{
  let myset,
      result = [];

  // If built-in functions were allowed, I'd create a set and use
  // myset.add(new_value), but since they're not, we'll do this
  // the array way.
  //
  // WHAT WAS I THINKING???
  // There's no need to push a new value into a new
  // array called "result". "data" is already an array,
  // so let's save ourselves a bit of performance juice
  // and just stick with one array.
  //data.forEach( (val) => {
  //     result.push(val);
  // });

  if (!myset_has(data, new_value))
  {
    data.push(new_value);
  }

  return data;
}
//------------------------------------------------------------------------
function myset_remove(data, remove_value)
{
  let myset,
      result = [];

  data.forEach(function (val) {
    if (val !== remove_value)
    {
     result.push(val);
    }
  });

  // Converting the result array to a set will ensure we suppress any
  // dupe values and retain only unique values.
  myset = new Set(result);

  // And now we convert the set back to an array so that we can do
  // array things with the result.
  result = convert_to_array(myset);

  return result;
}
//------------------------------------------------------------------------
function myset_has(data, test_value)
{
  let result;
  result = (data.indexOf(test_value) > -1) ? true : false;

  return result;
}
//------------------------------------------------------------------------
function myset_size(data)
{
  return data.length;
}
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
// HELPER FUNCTIONS
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
function convert_to_array(obj)
{
  let result = [];
  // If built-in functions were allowed, I'd use "Array.from(obj)" to convert
  // my object, but, since they're not, I'll do this the old fashioned way.
  for (let item of obj)
  {
    result.push(item);
  }
  return result;
}
//------------------------------------------------------------------------
function arrays_equal(arr1, arr2)
{
  if (myset_size(arr1) !== myset_size(arr2)) return false;
  for (let key in arr1)
  {
    if (arr1[key] !== arr2[key]) return false;
  }
  return true;
}
//---------------------------------------------------------------------
