/************************************************************************/
/* ASSIGNMENT 4                                                         */
/************************************************************************/
//------------------------------------------------------------------------
/*
Part 1
Your first assignment this week is to implement your own version of the
ES2015 "Set" type that we discussed earlier in this lesson. Write the
following functions, all of which take an array as their first parameter —
our set:

let test_set = [1,2,3], new_set;

function myset_add(data, new_value) { ... }

new_set = myset_add(test_set, 3);
if ( ! arrays_equal(new_set.sort(), [1,2,3]) ) {
  console.log("Failed adding existing data");
}

new_set = myset_add(test_set, 4);
if ( ! arrays_equal(new_set.sort(), [1,2,3,4]) ) {
  console.log("Failed adding new data");
}

function myset_remove(data, remove_value) { ... }

test_set = [1,2,3];
new_set = myset_remove(test_set, 3);
if ( ! arrays_equal(new_set.sort(), [1,2]) ) {
  console.log("Remove failed");
}

// Return true if test_value is in the set, false otherwise
function myset_has(data, test_value) { ... }

function myset_size(data) { ... }
*/
/*
Because a lot of the built-in array functions would make this easy, you're not
allowed to use them in your submitted work. The only exceptions are ".push"
and ".length". You might find it helpful to implement everything first using
".indexOf," ".forEach," and so forth, though. Working this way, you can
verify that your test cases are working. Once they are, you'll have a useful
tool to verify that your final submissions are correct as well.

In addition to the code above, submit the test cases you used to verify your
work. We've written a few test cases for you, for myset_add and myset_remove,
using the arrays_equal function from Etudes 4.1. Note also that we're sorting
each of the sets before comparing them. The myset functions only deal with
what's in the array, but make no promises about the order of the data.

You should follow good programming practices throughout.
Name things logically, indent well, and create helper functions
for any common pieces of code.

Submit a link to your work on GitHub. It should look something like:
https://github.com/berkleemusic/bocce/tree/e87252fe024e65e5102ac6a6abf8d1e403bd30c5.
If it's not obvious, be sure to add a note about which specific folder or
files are relevant to the assignment.
*/
//------------------------------------------------------------------------
