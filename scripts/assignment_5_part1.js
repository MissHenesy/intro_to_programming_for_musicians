//do_onload_actions();

function do_onload_actions()
{
  display_album_art();
  add_onclick_events();
}

function add_onclick_events()
{
  let imgs = document.getElementsByClassName("img_albums");
  let div_detail = document.getElementById("div_album_info");
  for (let img of imgs)
  {
    img.addEventListener("click", function() {
      for (let i of get_albums())
      {
        if (i.art === img.src)
        {
          div_detail.innerHTML = "<b>Title:</b> " + i.title + "<br />" +
                                 "<b>Artist:</b> " + i.artist + "<br />" +
                                 "<b>Album:</b> " + i.album + "<br />" +
                                 "<b>Year:</b> " + i.year + "<br />"
        }
      }
    });
  }
}

function display_album_art()
{
  let div_albums = document.getElementById("div_albums");
  let html_result = "<div id=\"div_album_covers\">\n";
  let album_art = get_albums().map(a => a.art);
  for (let [key, val] of album_art.entries())
  {
    html_result += "<img src=\"" + val + "\" class=\"img_albums\"/>\n"
  }
  html_result += "</div>\n"

  div_albums.innerHTML = html_result;
}

function get_albums()
{
  let result = [
    {
      title: "Someone Saved My Life Tonight",
      artist: "Elton John",
      album: "Captain Fantastic",
      year: 1975,
      art: "https://upload.wikimedia.org/wikipedia/en/1/16/Elton_John_-_Captain_Fantastic_and_the_Brown_Dirt_Cowboy.jpg"
    },
    {
      title: "Fish 'n' Chip Paper",
      artist: "Elvis Costello",
      album: "Trust",
      year: 1981,
      art: "https://upload.wikimedia.org/wikipedia/en/d/d7/Trustelviscostello.jpg"
    },
    {
      title: "Sick of Myself",
      artist: "Matthew Sweet",
      album: "100% Fun",
      year: 1995,
      art: "https://upload.wikimedia.org/wikipedia/en/8/84/MatthewSweet100Fun.jpg"
    },
    {
      title: "Senses Working Overtime",
      artist: "XTC",
      album: "English Settlement",
      year: 1982,
      art: "https://upload.wikimedia.org/wikipedia/en/9/96/XTC_English_Settlement.jpg"
    },
    {
      title: "Breathing",
      artist: "Kate Bush",
      album: "Never for Ever",
      year: 1980,
      art: "https://upload.wikimedia.org/wikipedia/en/b/bb/Kate_Bush_-_Never_for_Ever.jpg"
    },
    {
      title: "Why Does It Have To Rain on Sunday??",
      artist: "Bob McGrath",
      album: "Bob McGrath from Sesame Street",
      year: 1970,
      art: "https://cdn2.dustygroove.com/images/products/m/mcgrat_bob~_bobmcgrat_101b.jpg"
    },
    {
      title: "Getting Away with It (All Messed Up)",
      artist: "James",
      album: "Pleased to Meet You",
      year: 2001,
      art: "https://upload.wikimedia.org/wikipedia/en/2/2a/JamesPleasedToMeetYou.jpg"
    },
    {
      title: "Renaissance Affair",
      artist: "Hooverphonic",
      album: "Blue Wonder Power Milk",
      year: 1998,
      art: "https://upload.wikimedia.org/wikipedia/en/1/17/Hooverphonic-Blue_Wonder_Power_Milk.jpg"
    },
    {
      title: "I Ain't Good Looking (But I'm Mighty Sweet)",
      artist: "George Lindsey",
      album: "Goober Sings!",
      year: 1968,
      art: "https://www.dustygroove.com/images/products/l/lindse_geor_goobersin_101b.jpg"
    },
    {
      title: "White Nights",
      artist: "Oh Land",
      album: "Oh Land",
      year: 2011,
      art: "https://upload.wikimedia.org/wikipedia/en/6/68/Oh_Land_%28album%29.png"
    },
    {
      title: "I Ain't Gonna Kiss You",
      artist: "Dora Hall",
      album: "Dora Hall Sings Top Teen Tunes",
      year: 1964,
      art: "https://4.bp.blogspot.com/-IWzU36Zy9ac/WkFca0B2LII/AAAAAAAAq1g/2NGPNY8h3cMNHVFAcKVThiUGS_X9qgq5QCLcBGAs/s1600/dora%2B1.jpg"
    },
    {
      title: "They Don't Know",
      artist: "Tracey Ullman",
      album: "You Broke My Heart in 17 Places",
      year: 1983,
      art: "https://upload.wikimedia.org/wikipedia/en/b/be/Tracey17places.jpg"
    }
  ];
  return result;
}
