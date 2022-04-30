- [x] main display - current state
- [x] event bus
- [x] play bar
- [x] issues with tune choosing
- [x] add tempo control
- [x] javascript error loading from start
- [x] how did i get around the user gesture / audio context issue in the previous version??
- [x] change selected note color (svg fill)
- [x] highlight note with cursor control
- [x] add chord control
- [x] highlight selected tune in sidebar
- [x] transform ABC 
  - [x] don't display tempo
  - [x] don't display key
  - [x] don't display title
  - [x] don't display notes 
- [x] hanging indent in tune list
- [x] change instrument to something less obnoxious than the piano
- [x] select note to scroll to audio // click listener
- [x] on play new audio, clean up all old audio
- [ ] read #tags from notes field 
- [ ] main display updates
  - [ ] custom title display
  - [ ] key display
    - [ ] with transpose display
- [ ] Controls 
  - [x] fix chord control -- 
    - [x] checkbox
    - [x] reset audio
  - [x] instrument?
  - [x] transpose
  - [x] dropdown menu for other options
  - [ ] tablature
  - [ ] store/load settings in query string
- [x] fix abc parse for fiddler's welcome
- [ ] fix abc tempo -- remove it from display, but still have it affect the midi... maybe render midi separately? 
- [ ] fix tunes with the same name, show variations (eg, [1] [2] [3])
- [ ] tablature is getting cut off ... increase svg viewbox and padding-bottom of .abcjs-container
- [ ] seek resets warp... fix seek with warp ... observe progress bar functionality 
- [ ] publish to github pages - https://stackoverflow.com/questions/15718649/how-to-publish-a-website-made-by-node-js-to-github-pages
  - [ ] manual w/ gh-pages package
  - [ ] automated with github action

- [ ] search / filter bar 

// https://abcnotation.com/wiki/abc:standard:v2.1
// durationInMeasures
// see full synth example: https://raw.githubusercontent.com/paulrosen/abcjs/main/examples/full-synth.html
