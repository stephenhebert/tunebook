<template>
  <div class="tune">
    <div ref="render" />
  </div>
</template>

<script>
import abcjs from 'abcjs'

export default {
  name: 'TuneDisplay',
  inject: ['context'],
  data() {
    return {
      abcjs,
    }
  },
  computed: {
    tune() { return this.context?.selectedTune },
  },
  watch: {
    tune() {
      this.renderTune()
    },
  },
  mounted() {
    this.renderTune()
    this.$bus.emit('setNotationContainer', this.$refs.render)
  },
  methods: {
    renderTune() {
      if (!this.tune || !this.$refs?.render) return
      const renderedTune = abcjs.renderAbc(this.$refs.render, this.tune.abc, {
        add_classes: true,
        responsive: 'resize',
        // click listener
        // visual transpose
        visualTranspose: this?.context?.settings?.transpose,
      })
      this.$bus.emit('setRenderedTune', renderedTune)
    },
  },
}
</script>
