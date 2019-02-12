/************************************************************************/
/* ASSIGNMENT 4: PART 2                                                 */
/************************************************************************/
run_piano_player();

//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
// FUNCTION TO RUN MY FUNCTIONS!
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
function run_piano_player()
{
  let my_song;

  // This test demonstrates that the demo given in our assignment will
  // work with my solution.
  my_song = { song_title: "SONG TITLE: 'Demo'",
    song_music: [
      { note: "A", starts_at: 0, lasts: 3 },
      { note: "B", starts_at: 0, lasts: 3 },
      { note: "C", starts_at: 1.5, lasts: 1.5 }
    ]
  };
  console.log(play_piano(my_song));

  // This test demonstrates that a slightly different version of the demo,
  // using out-of-order "starts_at" values and longer "lasts" values will
  // produce the correct output.
  my_song = { song_title: "TEST #1",
    song_music: [
      { note: "Eb", starts_at: 2, lasts: 1 },
      { note: "G#", starts_at: 1.5, lasts: 1.5 },
      { note: "A", starts_at: 0, lasts: 3 },
      { note: "D#", starts_at: 1, lasts: 9 },
      { note: "B", starts_at: 0, lasts: 3 },
      { note: "C", starts_at: 1.5, lasts: 1.5 }
    ]
  };
  console.log(play_piano(my_song));

  // This test demonstrates that a song with a last beat
  // that does not release multiple notes will still produce the correct
  // output (i.e., this proves that the function "get_map_of_end_beats"
  // isn't doing anything wonky at the end, if it doesn't have a bunch
  // of the same ending beats).
  my_song = { song_title: "TEST #2",
    song_music: [
      { note: "C", starts_at: 0, lasts: 1 },
      { note: "E", starts_at: 0, lasts: 1 },
      { note: "G#", starts_at: 0, lasts: 1 },
      { note: "A", starts_at: 1, lasts: 3 }
    ]
  };
  console.log(play_piano(my_song));
  // This test demonstrates that a more complicated song can work with my
  // solution. In this case, the song goes on for 2 measures, and uses more
  // chords than the the previous 2 examples. I've also jumbled the order
  // of the second measure's notes a bit, to prove that my "get_sorted_song"
  // function will reassemble these objects in the correct order before the
  // "play_piano()" function loops through the values.
  my_song = { song_title: "TEST #3",
    song_music: [
      { note: "C", starts_at: 0, lasts: 4 },
      { note: "E", starts_at: 0, lasts: 4 },
      { note: "G", starts_at: 0, lasts: 4 },
      { note: "A", starts_at: 1, lasts: 1 },
      { note: "Bb", starts_at: 2, lasts: 2 },

      { note: "D", starts_at: 4, lasts: 2 },
      { note: "F#", starts_at: 4, lasts: 2 },
      { note: "A", starts_at: 4, lasts: 2 },
      { note: "C", starts_at: 6, lasts: 2 },
      { note: "E", starts_at: 6, lasts: 2 },
      { note: "G", starts_at: 6, lasts: 2 },
      { note: "Ab", starts_at: 5, lasts: 3 },
      { note: "G#", starts_at: 6, lasts: 1 },
      { note: "B", starts_at: 5, lasts: 1 },
      { note: "F", starts_at: 7, lasts: 1 }
    ]
  };
  console.log(play_piano(my_song));
}

//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
// MAIN ASSIGNMENT FUNCTIONS
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
function play_piano(song)
{
  let str_result = "";
  let this_beat = 0;
  let prev_beat = 0;
  let note_ends = 0;

  let song_title = song["song_title"];
  let sorted_song = get_sorted_song(song["song_music"].slice(), "starts_at"); // .slice() ensures we do not alter the structure of the originating array
  let release_notes_map = get_map_of_end_beats(song["song_music"].slice()); // .slice() ensures we do not alter the structure of the originating array

  str_result += "------------------------------------\n";
  str_result += "SONG TITLE: " + song_title + "\n";
  str_result += "------------------------------------\n";

  for (let note of sorted_song)
  {
    this_beat = note.starts_at;
    note_ends = (this_beat + note.lasts);

    if (prev_beat !== this_beat)
    {
      // If the "prev_beat" value is not equal to the "this_beat" value,
      // we are at a new "starts_at" beat and we know that some action is
      // coming up. Use math to determine where we are in the song --
      // (this_beat - prev_beat)  will give us the value of how long we have
      // to wait, considering how much time has already elapsed in the song.
      str_result += "Wait " + (this_beat - prev_beat) + " second(s). . .\n";
    }
    if (release_notes_map.get(this_beat))
    {
      // If we have a value in our "release_notes_map" where the key is equal
      // to "this_beat", then add these release notes to our string
      // accumulator.
      str_result += "  Release: " + release_notes_map.get(this_beat) + "\n";

      // Once we've added the current array of release notes to our string
      // accumulator, we will delete them from the "release_notes_map".
      // Then, once we are out of this loop, whatever keys left in the
      // map represent beats that fall outside of the scope of this array.
      release_notes_map.delete(this_beat)
    }
    // Now let's add whatever note we're supposed to be playing at "this_beat"
    // to our string accumulator.
    str_result += "  Play: " + note.note + "\n";

    // Retain the values of this current beat for the next loop, by
    // assigning the "this_beat" value to our "prev_beat" variable.
    prev_beat = this_beat;
  }

  // Now we are outside of our loop. If any entries remain in our
  // "release_notes_map", add them to our string accumulator.
  for (let [key, val] of release_notes_map.entries())
  {
    str_result += "Wait " + (key - prev_beat) + " second(s). . .\n";
    str_result += "  Release: " + val + "\n";
    prev_beat = key;
  }

  // Ready to return our result!
  return str_result;
}

//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
// HELPER FUNCTIONS
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
/*********************************************************************/
/* get_map_of_end_beats                                              */
/*********************************************************************/
function get_map_of_end_beats(song)
{
  // This function will return a Map that uses "end beats" as its keys,
  // and all associated "Release Notes" as an array of notes.
  // Example of output::
  // Map { 2 => ['A'], 4 => ['C,G,Bb,E'], 6 => ['D,F#,A,B'] }
  let end_beat_map = new Map();
  let sorted_song = get_sorted_song(song, "ends");
  let this_note = "";
  let this_note_end = -1;
  let prev_note_end = -1;
  let notes_arr = [];
  let note_end;

  for (let key in sorted_song)
  {
    this_note = song[key].note;
    this_note_end = (song[key].starts_at + song[key].lasts);
    // Set default val for "prev_note_end" equal to "this_note_end"
    if (prev_note_end === -1) prev_note_end = this_note_end;

    if (this_note_end === prev_note_end)
    {
      // If "this_note_end" and "prev_note_end" match, we know we've got
      // multiple notes being released at once. Let's start pushing these
      // into our "notes_arr" variable. We'll stash the end_beat value into
      // our "note_end" variable. We'll add these variable values to our
      // end_beat_map once "this_note_end" no longer matches "prev_note_end".
      note_end = this_note_end;
      notes_arr.push(this_note);
    }
    else
    {
      // We've hit a new end note! Now we'll add the values we've been
      // accumulating into our end_beat_map.
      end_beat_map.set(note_end, notes_arr);

      // Now we'll reset our "note_end" and "notes_arr" variables
      // to our new end_note and the current note in the loop. If
      // "this_note_end" repeats in the next loop, we will keep accumulating
      // notes in our "notes_arr", and make sure we retain the end beat value
      // in our "note_end" variable.
      note_end = this_note_end;
      notes_arr = [this_note];
    }
    // Retain the value of "this_note_end" for the next loop by setting
    // "prev_note_end" to its current value.
    prev_note_end = this_note_end;
  }

  // Now we are outside of our loop, and "note_end" and "notes_arr" are holding
  // all of the values from the last item in our collection. Make sure we
  // capture them by adding them to our end_beat_map.
  end_beat_map.set(note_end, notes_arr);

  // All done and ready to return our map!
  return end_beat_map;
}

/*********************************************************************/
/* get_sorted_song                                                   */
/*********************************************************************/
function get_sorted_song(arr_song, sorted_field)
{
  let a_field,
      b_field,
      sorted;

  switch (sorted_field)
  {
    case "starts_at":
      sorted = arr_song.sort(function (a, b) {
        a_field = parseFloat(a.starts_at);
        b_field = parseFloat(b.starts_at);
        if (a_field < b_field) return -1;
        if (a_field > b_field) return 1;
        return 0;
      });
      break;
    case "ends":
      sorted = arr_song.sort(function (a, b) {
        a_field = parseFloat(a.starts_at + a.lasts);
        b_field = parseFloat(b.starts_at + b.lasts);
        if (a_field < b_field) return -1;
        if (a_field > b_field) return 1;
        return 0;
      });
      break;
    default:
      "";
  }
  return sorted;
}
