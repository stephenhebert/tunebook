# tunebook todo


menu
	add close button
	use default bootstrap nav toggle 
	
styles
	add built in
	
message
	last updated date
	built with abcjs by paul rosen

refactor
    use es6 classes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    debug in safari

misc improvements
 . play without backing chords (select: chords + melody, only melody, only chords)
 . show variations 
 . transpose is cut off in portrait mode on phone
 . audio sync issues on mac (try synth mode or download midi)

----


## GENERAL
* fonts

## TITLE BAR
* add icon logo

## NAV BAR 
* [x] add tag filter (it's kind of ugly) 
* [x] reveal pattern instead of obscuring
* add close button

## DEFAULT PAGE
* add logo
* "start here" arrow 
    
## REFACTOR
* [x] refactor tunes into custom class 
    * make it object oriented (tunelist.whatever(), tune.whatever())
    * process JSON data and load into constructors, turn variations into arrays in tune objects 
* remove jQuery
* simplify css
  
## BUGS
* nav menu doesn't work on mobile (refactor jquery?)
  
## Q
* js to load custom objects on start? 

## ABC
* notes
* variations
* decorations (before the note, maybe)
    * ~       Irish roll
    * M       lowermordent
    * P       uppermordent
    * bowings (vAuBvA)
    * T       trill
    * u       up-bow
    * v       down-bow