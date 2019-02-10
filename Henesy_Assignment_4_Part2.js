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
  my_song = ["SONG TITLE: 'Demo'",
    { note: "A", starts_at: 0, lasts: 3 },
    { note: "B", starts_at: 0, lasts: 3 },
    { note: "C", starts_at: 1.5, lasts: 1.5 }
  ];
  console.log(play_piano(my_song));

  // This test demonstrates that a song with a different structure from
  // the demo -- in this case, a 1-measure song with a 4/4 rhythm -- will work
  // with my solution.
  my_song = ["SONG TITLE: 'TEST #1'",
    { note: "C", starts_at: 0, lasts: 1 },
    { note: "Eb", starts_at: 1, lasts: 1 },
    { note: "F", starts_at: 2, lasts: 2 }
  ];
  console.log(play_piano(my_song));

  // This test demonstrates that a more complicated song can work with my
  // solution. In this case, the song goes on for 2 measures, and uses more
  // chords than the the previous 2 examples. I've also jumbled the order
  // of the second measure's notes a bit, to prove that my "get_sorted_song"
  // function will reassemble these objects in the correct order before the
  // "play_piano()" function loops through the values.
  my_song = ["SONG TITLE: 'TEST #2'",
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
  ];
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
  let song_title = song[0];
  let sorted_song = get_sorted_song(song);
  let prev_beat = -1;
  let curr_beat = -1;
  let curr_starts = -1;
  let curr_lasts = -1;
  let set_of_beats = new Set();
  let str_result = "";

  // Populate set_of_beats, using the rhythm notations from our
  // song. We can use this set to find the beats where some kind
  // of action happens; that is, we have a set of values created right
  // from the "starts_at" and "lasts" values in our song.

  // NOTE:: Yes! This is KIND of like my previous idea of trying to create
  // a loop based on "beats_per_bar", but now, instead of trying to tell
  // the function how many beats there are per measure, and trying to figure
  // out a lot of fancy math from there, we now have a set of *actual*
  // beat values that will be used in the song, and we can compare
  // our starting & ending times with the values in this set.)
  sorted_song.forEach(function (prop) {
    if (typeof prop === "object")
    {
      set_of_beats.add(prop.starts_at);
      set_of_beats.add(prop.starts_at + prop.lasts);
   }
  });
  set_of_beats = new Set(Array.from(set_of_beats).sort());

  str_result += "------------------------------------\n";
  str_result += song_title + "\n";
  str_result += "------------------------------------\n";

  for (let beat of set_of_beats)
  {
      for (let action of song)
      {
        curr_starts = action.starts_at;
        curr_lasts = action.lasts;
        curr_beat = beat;

        if (prev_beat != curr_beat)
        {
          str_result += "AT BEAT: " + beat + "\n";
        }
        if (curr_starts === beat)
        {
          str_result += " Play " + action.note + "\n";
        }
        if ((curr_starts + curr_lasts) === beat)
        {
          str_result += " Release " + action.note + "\n";
        }
        prev_beat = beat;
      }
  }
  return str_result;
}
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
// HELPER FUNCTIONS
//------------------------------------------------------------------------
/************************************************************************/
//------------------------------------------------------------------------
function get_sorted_song(arr_song)
{
  let a_field, b_field;
  let sorted = arr_song.sort(function (a, b) {
    a_field = a.starts_at + "_" + a.note;
    b_field = b.starts_at + "_" + b.note;

    if (a_field < b_field) return -1;
    if (a_field > b_field) return 1;
    return 0;
  });
  return sorted;
}
