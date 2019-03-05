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

  sayMyName()
  {
    return `My name is ${this.name()}, and my favourite song is "${this.fave_song()}."`;
  }

  compareAges(other_char)
  {
    if (this.age() < other_char.age())
    {
      return `${this.name()} is younger than ${other_char.name()}.`;
    } else if (this.age() === other_char.age()) {
      return `${this.name()} is the same age as ${other_char.name()}.`;
    } else {
      return `${this.name()} is older than ${other_char.name()}.`;
    }
  }
}

let beatle1 = new Character("John", 23, "You Make Me Dizzy Miss Lizzie");
let beatle2 = new Character("Paul", 21, "It's So Easy");
let beatle3 = new Character("George", 20, "Everybody's Trying to be My Baby");
let beatle4 = new Character("Ringo", 23, "South of the Border");
let chars = [beatle1, beatle2, beatle3, beatle4];

// Say a little something about each character.
for (i of chars)
{
  console.log(i.sayMyName());
}
console.log("---------------------------------------------");

// Compare ages of characters.
for (i in chars)
{
  if (chars[parseInt(i)+1])
  {
    console.log(chars[i].compareAges(chars[parseInt(i)+1]));
  }
}
