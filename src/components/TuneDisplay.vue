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
    transpose() { return this.context?.settings?.transpose },
    tablature() { return this.context?.settings?.showTabs },
  },
  watch: {
    tune() {
      this.renderTune()
    },
    transpose() {
      this.renderTune()
    },
    tablature() {
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

      const tablature = this.tablature ? [{ instrument: 'violin' }] : []

      const renderedTune = abcjs.renderAbc(this.$refs.render, this.transformedAbc, {
        add_classes: true,
        responsive: 'resize',
        // click listener
        clickListener: this.seekTo,
        // visual transpose
        visualTranspose: this?.context?.settings?.transpose,
        tablature,
      })
      this.$bus.emit('setRenderedTune', renderedTune)
    },
    transformAbc(abc) {
      const keysToHide = [
        'title',
        'type',
        // 'quantize',
        'notes',
        'composer',
        'source',
        'transcription',
      ]
      const regexesToReplace = this.TunesData_getMetaFieldRegexStringsByKeys(...keysToHide)
      regexesToReplace.forEach((regex) => {
        abc = abc.replace(new RegExp(`${regex}\n`, 'g'), '')
      })
      return abc
    },
    seekTo(abcElem) {
      if (abcElem.el_type !== 'note') return
      const currentMilliseconds = abcElem.currentTrackMilliseconds
      this.$bus.emit('seek', currentMilliseconds)
    },
  },
}
</script>

<style scoped lang="scss">

.notation {

  :deep(.highlight) {
    // fill: #0a9ecc;
    fill: #60a5fa;
  }

  :deep(.abcjs-note_selected) {
    fill: inherit;
  }

  :deep(.abcjs-staff) {
    opacity: .3;
  }

}
</style>
