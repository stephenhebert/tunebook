<template>
  <div class="synth-controller flex flex-row">
    <div ref="audio" class="synth-controller flex-grow" />
    <OptionsMenu />
  </div>
</template>

<script>
import abcjs from 'abcjs'

const controlOptions = {
  displayLoop: true,
  displayRestart: true,
  displayPlay: true,
  displayProgress: true,
  displayWarp: true,
  displayClock: true,
}

const INSTRUMENTS = {
  PIANO: 0,
  ACCORDION: 21,
  FLUTE: 73,
  BANJO: 105,
  FIDDLE: 110,
}

function CursorControl() {
  this.onStart = function() {
    const svg = document.querySelector('.notation svg')
  }
  this.beatSubdivisions = 2
  this.onEvent = function(ev) {
    if (ev.measureStart && ev.left === null) return // this was the second part of a tie across a measure line. Just ignore it.

    const lastSelection = document.querySelectorAll('.notation svg .highlight')
    for (let k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove('highlight')

    for (let i = 0; i < ev.elements.length; i++) {
      const note = ev.elements[i]
      for (let j = 0; j < note.length; j++)
        note[j].classList.add('highlight')
    }
  }
  this.onFinished = function() {
    const els = document.querySelectorAll('svg .highlight')
    for (let i = 0; i < els.length; i++)
      els[i].classList.remove('highlight')
  }
}

export default {
  name: 'SynthController',
  inject: ['context'],
  data() {
    return {
      synthControl: undefined,
      midiBuffer: undefined,
      audioContext: undefined,
      cursorControl: new CursorControl(),
      oldBuffers: {
        synthControl: [],
        midiBuffer: [],
        audioContext: [],
      },
    }
  },
  computed: {
    renderedTune() {
      return this.context?.renderedTune
    },
    instrument() {
      return this.context?.settings?.instrument
    },
    enableChords() {
      return this.context?.settings?.enableChords
    },
  },
  watch: {
    renderedTune() {
      this.init(true)
    },
    instrument() {
      this.init(true)
    },
    enableChords() {
      this.init(true)
    },
  },
  mounted() {
    // this.initBeforeUserAction()
    this.$bus.emit('setSynthController', this)

    this.init()
    // this.setBrowserSupport()
    // this.initializeSynth()

    this.$bus.on('seek', async(milliseconds) => {
      console.log('seek')
      await this.init(true)
      const timer = this.synthControl.timer
      const totalMilliseconds = timer.lastMoment
      const percent = milliseconds[0] / totalMilliseconds
      // const percent = milliseconds[0] / milliseconds[1]
      // this.synthControl.midiBuffer.stop()
      this.synthControl.setProgress(percent)
      this.synthControl.midiBuffer.seek(percent)
      this.synthControl.play()
      // this.midiBuffer.seek(percent)
      // this.midiBuffer.seek(seconds, 'seconds')
      // this.synthController.
      // console.log(this.context.synthController)
    })
  },
  methods: {
    setBrowserSupport() {
      this.$bus.emit('setBrowserSupport', abcjs.synth.supportsAudio())
    },
    init(userAction = false) {
      return new Promise((resolve) => {
        if (this.synthControl) this.synthControl.pause()

        // this function does not require user gesture to start
        window.AudioContext
          = window.AudioContext
          || window.webkitAudioContext
          || navigator.mozAudioContext
          || navigator.msAudioContext

        // if (!this.synthControl) {
        this.synthControl = new abcjs.synth.SynthController()
        this.synthControl.load(this.$refs.audio, this.cursorControl, controlOptions)
        // }
        // this.synthControl.disable(true)

        this.setBrowserSupport()
        this.audioContext = abcjs.synth.activeAudioContext() || new window.AudioContext()
        if (!this.renderedTune) return
        const tune = { ...this.renderedTune[0] }
        if (!tune) return
        // if (this.synthControl?.midiBuffer)
        //   this.synthControl.midiBuffer.stop()
        if (this.midiBuffer)
          this.midiBuffer.stop()
        else
          this.midiBuffer = new abcjs.synth.CreateSynth()
        this.midiBuffer
          .init({
            visualObj: tune,
            // millisecondsPerMeasure: 800,
          })
          .then(() => {
            this.synthControl.setTune(tune, userAction, {
              chordsOff: !this.context?.settings?.enableChords,
              program: INSTRUMENTS[this.instrument],
            }).then(() => {
              // console.log('Audio successfully loaded')
              resolve()
            })
          })
      })
    },
  },
}

// var visualOptions = {  };
// var visualObj = abcjs.renderAbc("paper", abcString, visualOptions);

// document.querySelector(".activate-audio").addEventListener("click", activate);
// function activate() {
//     if (abcjs.synth.supportsAudio()) {
//         var controlOptions = {
//             displayLoop: true,
//             displayRestart: true,
//             displayPlay: true,
//             displayProgress: true,
//             displayWarp: true,
//             displayClock: true
//         };
//         var synthControl = new abcjs.synth.SynthController();
//         synthControl.load("#audio", null, controlOptions);
//         synthControl.disable(true);
//         var midiBuffer = new abcjs.synth.CreateSynth();
//         midiBuffer.init({
//             visualObj: visualObj[0],
//             millisecondsPerMeasure: 800,
//             chordsOff: true,
//             options: {

//             }

//         }).then(function () {
//             synthControl.setTune(visualObj[0], true).then(function (response) {
//             document.querySelector(".abcjs-inline-audio").classList.remove("disabled");
//             })
//         });
//     } else {
//         console.log("audio is not supported on this browser");
//     };
// }
</script>

<style lang="scss">
.synth-controller {
  .abcjs-midi-tempo {
    color: black;
  }

  .abcjs-inline-audio {
    /* @apply bg-gray-700 */
    background-color: inherit;
  }
}
</style>
