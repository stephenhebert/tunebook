<template>
  <div class="tune">
    <div ref="render" class="notation" />
  </div>
</template>

<script>
import abcjs from 'abcjs'
import TunesDataMixin from '../mixins/TunesDataMixin'

export default {
  name: 'TuneDisplay',
  mixins: [TunesDataMixin],
  inject: ['context'],
  data() {
    return {
      abcjs,
    }
  },
  computed: {
    tune() { return this.context?.selectedTune },
    transformedAbc() {
      return this.transformAbc(this.tune.abc)
    },
  },
  watch: {
    tune() {
      this.renderTune()
    },
  },
  mounted() {
    this.renderTune()
    this.$bus.emit('setNotationContainer', this.$refs.render)

    // for (let i = 0; i < 129; i++)
    //   console.log(`${i}: ${abcjs.synth.instrumentIndexToName[i]}`)
  },
  methods: {
    renderTune() {
      if (!this.tune || !this.$refs?.render) return
      const renderedTune = abcjs.renderAbc(this.$refs.render, this.transformedAbc, {
        add_classes: true,
        responsive: 'resize',
        // click listener
        clickListener: this.seekTo,
        // visual transpose
        visualTranspose: this?.context?.settings?.transpose,
      })
      this.$bus.emit('setRenderedTune', renderedTune)
    },
    transformAbc(abc) {
      const keysToHide = ['title', 'type', 'quantize', 'notes']
      const regexesToReplace = this.TuneData_getMetaFieldRegexesByKeys(...keysToHide)
      regexesToReplace.forEach((regex) => {
        abc = abc.replace(regex, '').replace('\n\n', '\n')
      })
      return abc
    },
    seekTo(abcElem) {
      const currentMilliseconds = abcElem.currentTrackMilliseconds
      this.$bus.emit('seek', currentMilliseconds)
    },
  },
}
</script>

<style scoped lang="scss">

.notation {

  :deep(.highlight) {
    fill: #0a9ecc;
  }

  :deep(.abcjs-note_selected) {
    fill: inherit;
  }

}
</style>
