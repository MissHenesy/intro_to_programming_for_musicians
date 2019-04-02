/*
Write a function that takes one argument, a number.

In that function, write to the console ( console.log ):
  TRUE if the number passed to the function is equal to your age
  LOW if the number passed in is less than your age
  HIGH if the number passed in is greater than your age

Outside of this function, write a loop that calls your
function for every number from 1 to 100.

Run this code directly in the browser console and observe the output.
You've now reviewed functions, IF/THEN statements, and loops.
*/
let i = 0;
while (i < 100)
{
  console.log(num_handler(i))
  i++;
}

function num_handler(num_input)
{
	let my_age = 52;
  let result;

  switch (true)
  {
    case num_input === my_age:
      result = "TRUE";
      break;
    case num_input < my_age:
      result = "LOW";
      break;
    case num_input > my_age:
      result = "HIGH";
      break;
  }
	return result;
}
//**************************************************************************
// NOTES ON LEARNING ChucK
//**************************************************************************
// Notes on using ChucK with scales can be found at:
//   http://wiki.cs.princeton.edu/index.php/ChucKing_Scores
// How to use a swell:
//   https://apprize.info/programming/chuck/9.html
// Example of how to play a melody with some cool delay/echo/reverb effects
//   https://chuck.cs.princeton.edu/doc/examples/stk/rhodey.ck

//------------------------------------------------------------------------
// FROM LESSON 11 -- HAPPY BIRTHDAY
// Key Signature: DMaj
//------------------------------------------------------------------------
/*
class Note
{
    // pre-constructor, run every time an instance is created
    SinOsc o => Envelope e => dac;
    500::ms => dur tempo;

    fun void quarter(int m)
    {
        SinOsc lfo => blackhole;
        9 => lfo.freq;

        Std.mtof(m) => o.freq;
        e.keyOn();
        tempo => now;
        (lfo.last() * 10) + m => o.freq;
        e.keyOff();
    }
}


Note n;

/Note n;
//happy birthday to you
n.quarter(57);
n.quarter(59);
n.quarter(57);
n.quarter(62);
n.quarter(61);
n.quarter(61);

//happy birthday to you
n.quarter(57);
n.quarter(59);
n.quarter(57);
n.quarter(64);
n.quarter(62);
n.quarter(62);

//happy birthday dear Beyonce
n.quarter(57);
n.quarter(69);
n.quarter(66);
n.quarter(62);
n.quarter(61);
n.quarter(59);
n.quarter(59);

// happy birthday to youuuuu
n.quarter(67);
n.quarter(67);
n.quarter(66);
n.quarter(62);
n.quarter(64);
n.quarter(62);

//------------------------------------------------------------------------
// FROM LESSON 11: TALK INTO THE MIC!
// take me to your leader (talk into the mic)
// gewang, prc
//------------------------------------------------------------------------
// our patch - feedforward part
adc => Gain g => DelayL d => dac;
adc => Gain g2 => dac;
// feedback
d => Gain g3 => d;

// set parameters
15::ms => d.delay;
0.05 => g.gain;
0.05 => g2.gain;
0.95 => g3.gain;

// time loop
while( true ) 100::ms => now;
*/

//----------------------------------------------------------------------------
// SOME FUN CHUCK TECHNIQUES FROM APPRIZE.INFO
// https://apprize.info/programming/chuck/9.html
//
// EXAMPLE 1:: THREE OSCILLATORS IN STEREO
//----------------------------------------------------------------------------

/*
// Three oscillators in stereo
SqrOsc s => dac.left;
SqrOsc t => dac;
SqrOsc u => dac.right;

// Set gains so we don't overload the dac
0.4 => s.gain => t.gain => u.gain;

// functions for octave and fifth
fun float octave( float originalFreq )
{
    return 2.0*originalFreq;
}

fun float fifth( float originalFreq )
{
    return 1.5*originalFreq;
}

// Main program
for ( 100 => float freq; freq < 500; 0.5 +=> freq )
{
    freq => s.freq;
    octave(freq) => t.freq;
    fifth(freq) => u.freq;
    <<< s.freq(), t.freq(), u.freq() >>>;
    10::ms => now;
}
*/
//----------------------------------------------------------------------------
// EXAMPLE 2:: A SWELL FUNCTION TO SWELL EACH NOTE UP/DOWN WHEN IT IS PLAYED
//----------------------------------------------------------------------------
/*
// Swell function, operates on any type of Ugen
fun void swell(UGen osc, float begin, float end, float step)
{
    float val;
    // swell up volume
    for (begin => val; val < end; step +=> val)
    {
        val => osc.gain;
        0.01::second => now;
    }

    // swell down volume
    while ( val > begin )
    {
        val => osc.gain;
        step -=> val;
        0.01::second => now;
    }
}

// Main program -- our sound "patch"
TriOsc tri => dac;

// Global array of notes to play
[60,62,63,65,63,65,65,58,57,56] @=> int notes[];

// Swell through all notes
for ( 0 => int i; i < notes.cap(); i++ )
{
    Std.mtof(notes[i]) => tri.freq;
    swell(tri,0.2,1.0,0.01);
}
*/
