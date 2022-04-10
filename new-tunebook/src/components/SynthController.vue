<template>
  <div class="synth-controller flex flex-row">
    <div ref="audio" class="synth-controller flex-grow" />
    <div class="flex items-center">
      <!--  -->
      <label class="text-xs mx-1">Play Chords</label><input
        type="checkbox"
        :checked="playChords"
        @click.prevent="toggleChords"
      >
    </div>
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
    }
  },
  computed: {
    renderedTune() {
      return this.context?.renderedTune
    },
    playChords() {
      return this.context?.settings?.enableChords
    },
  },
  watch: {
    renderedTune() {
      this.load()
    },
    playChords() {
      this.load()
    },
  },
  mounted() {
    // this.initBeforeUserAction()
    this.$bus.emit('setSynthController', this)

    this.load()
    // this.setBrowserSupport()
    // this.initializeSynth()
  },
  methods: {
    load() {
      // if (!this.synthControl) this.initBeforeUserAction()
      // if (this.userAction) this.initOnUserAction()
      this.init()
    },
    setBrowserSupport() {
      this.$bus.emit('setBrowserSupport', abcjs.synth.supportsAudio())
    },
    init() {
      // this function does not require user gesture to start
      window.AudioContext
        = window.AudioContext
        || window.webkitAudioContext
        || navigator.mozAudioContext
        || navigator.msAudioContext

      this.synthControl = new abcjs.synth.SynthController()

      this.synthControl.load(this.$refs.audio, this.cursorControl, controlOptions)
      // this.synthControl.disable(true)

      this.setBrowserSupport()
      this.audioContext = abcjs.synth.activeAudioContext() || new window.AudioContext()
      if (!this.renderedTune) return
      const tune = { ...this.renderedTune[0] }
      if (!tune) return
      if (this.midiBuffer) this.midiBuffer.stop()
      else this.midiBuffer = new abcjs.synth.CreateSynth()
      this.midiBuffer
        .init({
          visualObj: tune,
          millisecondsPerMeasure: 800,
        })
        .then(() => {
          this.synthControl.setTune(tune, undefined, {
            chordsOff: this.context?.settings?.enableChords,
            options: {
              program: 34,
            },
          }).then(() => {
            console.log('Audio successfully loaded')
          })
        })
    },
    toggleChords() {
      this.$bus.emit('toggleChords')
    },
  },
}
// TODO: Pass cursor control
// TODO: click note and jump to point in audio

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
