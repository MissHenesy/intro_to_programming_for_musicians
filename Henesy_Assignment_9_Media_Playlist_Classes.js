/*****************************************************************************/
// CLASSES
/*****************************************************************************/
class Playlist
{
  constructor(track_list = [])
  {
    this._track_list = track_list;
    this._original_track_list = [];
    this._now_playing_index = 0;
    this._current_track;
  }

  add(track)
  {
    this._track_list.push(track);
    this._original_track_list.push(track);
    return this;
  }

  play()
  {
    this._current_track = this._track_list[this._now_playing_index];
  }

  reset()
  {
    this._now_playing_index = 0;
  }

  next()
  {
    this._now_playing_index++;
    if (this._now_playing_index >= this._track_list.length)
    {
      this._now_playing_index = 0;
    }
    this.play();
  }

  sort(criteria)
  {
    switch(criteria)
    {
      case "title":
        this._track_list = array_sorter(this._track_list, "alphabetical", "title");
        break;
      case "duration":
        this._track_list = array_sorter(this._track_list, "numerical", "duration");
        break;
      case "shuffle":
        this._track_list = array_sorter(this._track_list, "random");
        break;
      case "reverse_order":
        this._track_list = this._original_track_list;
        this._track_list = array_sorter(this._track_list, "reverse_order");
        break;
      case "reverse_alphabetical":
        this._track_list = array_sorter(this._track_list, "reverse_alphabetical", "title");
        break;
      default:
        this._track_list = this._original_track_list;
    }
  }

  track_list()
  {
    return this._track_list;
  }

  now_playing()
  {
    if (this._current_track)
    {
      return "\nNow Playing::" +
             "\n  **" + this.media_type().toUpperCase() + "**" +
             "\n  TITLE: " + this._current_track.title() +
             "\n  " + this.media_specific_text() +
             "\n  DURATION: " + this._current_track.duration() + " seconds" +
             "\n----------------------------------------------------";
    } else {
      return "NO MEDIA SELECTED; PRESS \"PLAY\" TO START PLAYLIST" +
             "\n----------------------------------------------------";
    }
  }

  media_type()
  {
    return this._current_track.type();
  }

  media_specific_text()
  {
    switch(this.media_type())
    {
      case "Song":
        return `ARTIST: ${this._current_track.artist()}`;
        break;
      case "Movie":
        return `RATING: ${this._current_track.rating()}`;
        break;
      case "Podcast":
        return `HOST: ${this._current_track.host()}`;
        break;
    }
  }
}
//-----------------------------------------------------------------------------
class Media
{
  constructor(title, duration)
  {
    this._title = title;
    this._duration = duration;
  }

  title()
  {
    return this._title;
  }

  duration()
  {
    return this._duration;
  }

  type()
  {
    return this.constructor.name;
  }
}
//-----------------------------------------------------------------------------
class Song extends Media
{
  constructor(artist, title, duration)
  {
    super(title, duration);
    this._artist = artist;
  }

  artist()
  {
    return this._artist;
  }
}
//-----------------------------------------------------------------------------
class Podcast extends Media
{
  constructor(title, host, duration)
  {
    super(title, duration);
    this._host = host;
  }

  host()
  {
    return this._host;
  }
}
//-----------------------------------------------------------------------------
class Movie extends Media
{
  constructor(title, rating, duration)
  {
    super(title, duration);
    this._rating = rating;
  }

  rating()
  {
    return this._rating;
  }
}
/*****************************************************************************/
// RUN OUR FUNCTION!
/*****************************************************************************/
run_main_function();

/*****************************************************************************/
// MAIN FUNCTION
/*****************************************************************************/
function run_main_function()
{
  let track1 = new Song("John & Yoko / Plastic Ono Band with Elephant's Memory", "New York City", 272);
  let track2 = new Song("Paul McCartney and Wings", "Too Many People", 250);
  let track3 = new Song("George Harrison", "Cheer Down", 248)
  let track4 = new Song("Ringo Starr", "Photograph", 240);
  let music_tracks = [track1, track2, track3, track4];

  let movie1 = new Movie("Hard Day's Night", "G", 5520);
  let movie2 = new Movie("Help", "G", 5760);
  let movie3 = new Movie("Pink Floyd: The Wall", "R", 5700);
  let movie4 = new Movie("Spinal Tap", "R", 5100);
  let movies = [movie1, movie2, movie3, movie4];

  let podcast1 = new Podcast("WTF", "Marc Maron", 5760);
  let podcast2 = new Podcast("Kevin McDonald's Kevin McDonald Show", "Kevin McDonald", 4800);
  let podcast3 = new Podcast("Kevin Pollak's Chat Show", "Kevin Pollak", 4500);
  let podcast4 = new Podcast("Comedy Bang! Bang!", "Scott Aukerman", 7200);
  let podcasts = [podcast1, podcast2, podcast3, podcast4];

  let my_playlist = new Playlist();
  my_playlist.add(track1).add(track2).add(track3);
  my_playlist.add(movie2).add(movie4);
  my_playlist.add(podcast1).add(podcast3);

  console.log(play_all_media(my_playlist));
  console.log(play_all_media(my_playlist, "title"));
  console.log(play_all_media(my_playlist, "duration"));
  console.log(play_all_media(my_playlist, "reverse_alphabetical"));
  console.log(play_all_media(my_playlist, "shuffle"));
}
/*****************************************************************************/
// HELPER FUNCTION(S)
/*****************************************************************************/
function play_all_media(arr_playlist, sort_order)
{
  let str_result = "";
  let sort_text = "ORIGINAL ORDER";

  if (sort_order) { sort_text = sort_order.toUpperCase(); }

  str_result += "*********************************************************";
  str_result += "\n HERE IS YOUR PLAYLIST, SORT ORDER: " + sort_text;
  str_result += "\n*********************************************************\n";

  arr_playlist.sort(sort_order);
  arr_playlist.reset();
  arr_playlist.play();
  str_result += arr_playlist.now_playing();

  for (let i = 1; i < arr_playlist.track_list().length; i++)
  {
    arr_playlist.next();
    str_result += arr_playlist.now_playing();
  }
  return str_result;
}
//-----------------------------------------------------------------------------
function array_sorter(arr, sort_criteria, sort_field)
{
  let arr_copy = arr.slice(),
      a_field,
      b_field;

  switch(sort_criteria)
  {
    case "alphabetical":
      if (sort_field)
      {
        arr_copy.sort(function(a, b)
          {
            a_field = eval("a." + sort_field + "()");
            b_field = eval("b." + sort_field + "()");

            let x = a_field.toLowerCase();
            let y = b_field.toLowerCase();

            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
          }
        );
      } else {
        arr_copy.sort();
      }
      break;
    case "numerical":
      if (sort_field)
      {
        arr_copy.sort(function(a, b)
          {
            a_field = eval("a." + sort_field + "()");
            b_field = eval("b." + sort_field + "()");
            return a_field - b_field;
          }
        );
      } else {
        arr_copy.sort(function(a, b) { return b - a} );
      }
      break;
    case "random":
      arr_copy.sort(function(a, b) { return 0.5 - Math.random() });
      break;
    case "reverse_order":
      arr_copy.reverse();
      break;
    case "reverse_alphabetical":
      arr_copy = array_sorter(arr, "alphabetical", sort_field);
      arr_copy.reverse();
      break;
    case "reverse_numerical":
      arr_copy = array_sorter(arr_copy, "numerical");
      arr_copy.reverse();
      break;
  }
  return arr_copy;
}
