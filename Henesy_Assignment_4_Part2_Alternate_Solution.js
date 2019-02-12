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
      { note: "G#", starts_at: 1.5, lasts: 1.5 },
      { note: "A", starts_at: 0, lasts: 3 },
      { note: "D#", starts_at: 1, lasts: 9 },
      { note: "B", starts_at: 0, lasts: 3 },
      { note: "C", starts_at: 1.5, lasts: 1.5 }
    ]
  };
  console.log(play_piano(my_song));


  // This test demonstrates that a song with a different structure from
  // the demo -- in this case, a 1-measure song with a 4/4 rhythm -- will work
  // with my solution.
  my_song = { song_title: "SONG TITLE: 'TEST #1'",
    song_music: [
      { note: "C", starts_at: 0, lasts: 1 },
      { note: "Eb", starts_at: 1, lasts: 1 },
      { note: "F", starts_at: 2, lasts: 2 }
    ]
  };
  console.log(play_piano(my_song));

  // This test demonstrates that a more complicated song can work with my
  // solution. In this case, the song goes on for 2 measures, and uses more
  // chords than the the previous 2 examples. I've also jumbled the order
  // of the second measure's notes a bit, to prove that my "get_sorted_song"
  // function will reassemble these objects in the correct order before the
  // "play_piano()" function loops through the values.
  my_song = { song_title: "SONG TITLE: 'TEST #2'",
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
  let curr_beat = -1;
  let prev_beat = 0;
  let this_note_starts = -1;
  let prev_note_starts = 0;
  let note_ends = -1;

  let song_title = song["song_title"];
  let sorted_song = get_sorted_song(song["song_music"].slice(), "starts_at");
  let end_notes = get_map_of_end_beats(song["song_music"].slice());

  str_result += "------------------------------------\n";
  str_result += song_title + "\n";
  str_result += "------------------------------------\n";

  for (let note of sorted_song)
  {
    this_note_starts = note.starts_at;
    note_ends = (note.starts_at + note.lasts);

    if (prev_note_starts !== this_note_starts)
    {
      str_result += "Wait " + (this_note_starts - prev_note_starts) + " second(s). . .\n";
    }
    if (end_notes.get(this_note_starts))
    {
      str_result += "  Release: " + end_notes.get(this_note_starts) + "\n";
      end_notes.delete(this_note_starts)
    }
    str_result += "  Play: " + note.note + "\n";

    curr_beat += note.starts_at;
    prev_beat = note.starts_at;
    prev_note_starts = note.starts_at;
  }

  for (let [key, val] of end_notes.entries())
  {
    str_result += "Wait " + (key - prev_beat) + " second(s). . .\n";
    str_result += "  Release: " + val + "\n";
    prev_beat = key;
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
/*********************************************************************/
/* get_map_of_end_beats                                              */
/*********************************************************************/
function get_map_of_end_beats(song)
{
  let song_map = new Map();
  let sorted_song = get_sorted_song(song, "ends");

  let notes = "";
  let note_end;
  let this_note_end = -1;
  let prev_note_end = -1;

  for (let key in sorted_song)
  {
    this_note_end = (song[key].starts_at + song[key].lasts);
    if (prev_note_end === -1) prev_note_end = this_note_end;

    if (this_note_end === prev_note_end)
    {
      note_end = this_note_end;
      notes += song[key].note + ",";
    }
    else
    {
      song_map.set(note_end, rtrim(notes,1));
      note_end = this_note_end;
      notes = song[key].note + ",";
    }
    prev_note_end = this_note_end;
  }
  song_map.set(note_end, rtrim(notes, 1));
  return song_map;
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
/*********************************************************************/
/* rtrim                                                             */
/*********************************************************************/
function rtrim(str, num_of_chars)
{
  // return str.substring(0, (str.length - num_of_chars));
  return str.slice(0, parseInt(-num_of_chars));
}
