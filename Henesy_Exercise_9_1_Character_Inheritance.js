/*****************************************************************************/
// CLASSES
/*****************************************************************************/
class Character
{
  constructor(name, age, fave_song)
  {
    this._name = name;
    this._age = age;
    this._fave_song = fave_song;
  }

  age()
  {
    return this._age;
  }

  name()
  {
    return this._name;
  }

  fave_song()
  {
    return this._fave_song
  }

  type()
  {
    return this.constructor.name;
  }

  sayMyName()
  {
    return `My name is ${this.name()}. I am a ${this.type()}! My favourite song is "${this.fave_song()}."`;
  }

  compareAges(other_char)
  {
    if (this.age() < other_char.age())
    {
      return `${this.name()} the ${this.type()} is younger than ${other_char.name()} the ${other_char.type()}.`;
    } else if (this.age() === other_char.age()) {
      return `${this.name()} the ${this.type()} is the same age as ${other_char.name()} the ${other_char.type()}.`;
    } else {
      return `${this.name()} the ${this.type()} is older than ${other_char.name()} the ${other_char.type()}.`;
    }
  }
}

class Wizard extends Character
{
  constructor(name, age, fave_song, hat_color)
  {
    super(name, age, fave_song);
    this._hat_color = hat_color;
  }

  hat_color()
  {
    return this._hat_color;
  }

  cast_spell()
  {
    return `${this.name()} the ${this.type()} has cast a musical spell upon the land!`;
  }

  say_hat_color()
  {
    return `${this.name()} has a pointy ${this.hat_color()} hat.`
  }
}

class Bard extends Character
{
  constructor (name, age, fave_song, instrument)
  {
      super(name, age, fave_song);
      this._instrument = instrument;
  }

  instrument()
  {
    return this._instrument;
  }

  play_instrument()
  {
    return `${this.name()} the ${this.type()} has started to play the ${this.instrument()}!`;
  }

  play_song(song)
  {
    return `${this.name()} the ${this.type()} has started to play "${song}" on the ${this.instrument()}!`;
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
  let wizard1 = new Wizard("Brian Epstein", 29, "The Art of Dying", "black");
  let wizard2 = new Wizard("George Martin", 38, "Right Said Fred", "blue");
  let wizards = [wizard1, wizard2];

  let bard1 = new Bard("John Lennon", 23, "You Make Me Dizzy Miss Lizzie", "Rhythm Guitar");
  let bard2 = new Bard("Paul McCartney", 21, "It's So Easy", "Bass Guitar");
  let bard3 = new Bard("George Harrison", 20, "Everybody's Trying to be My Baby", "Lead Guitar");
  let bard4 = new Bard("Ringo Starr", 23, "South of the Border", "Drums");
  let bards = [bard1, bard2, bard3, bard4];

  let fan1 = new Character("Cynthia Twist", 25, "All I've Got to Do", "Fan");
  let fan2 = new Character("Jane Asher", 18, "Here, There, and Everywhere", "Fan");
  let fan3 = new Character("Patti Boyd", 20, "I Need You", "Fan");
  let fan4 = new Character("Mary Cox", 18, "Maureen is a Champ", "Fan");
  let fans = [fan1, fan2, fan3, fan4];

  let all_chars = wizards.concat(bards).concat(fans);

  console.log("NAMES, TYPES, AND FAVORITE SONGS OF ALL CHARACTERS::");
  for (let i of all_chars)
  {
    console.log(i.sayMyName());
  }
  console.log("---------------------------------------------");

  console.log("AGE COMPARISONS OF ALL CHARACTER TYPES::");
  for (let i in all_chars)
  {
    if (all_chars[parseInt(i)+1])
    {
      console.log(all_chars[i].compareAges(all_chars[parseInt(i)+1]));
    }
  }
  console.log("---------------------------------------------");

  console.log("SPECIAL POWERS::");
  for (let i of all_chars)
  {
    console.log(get_character_powers(i));
  }
  console.log("---------------------------------------------");

  console.log("INTENTIONAL ERROR::");
  try
  {
    for (let i of all_chars)
    {
      if (i.type() === "Character")
      {
        console.log(i.cast_spell());
        console.log(i.play_instrument());
      }
    }
  }
  catch(e)
  {
    console.error(`Oops! An error has occurred!\nError message: ${e.message}`);
  }
}
/*****************************************************************************/
/* HELPER FUNCTIONS                                                          */
/*****************************************************************************/
function get_character_powers(char)
{
  switch (char.type())
  {
    case "Wizard":
      return char.cast_spell();
      break;
    case "Bard":
      return char.play_song("Hey, Bulldog");
      break;
    default:
      return `Sorry!! ${char.name()} has no special powers.`;
  }
}
