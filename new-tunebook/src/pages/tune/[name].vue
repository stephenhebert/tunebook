<script lang="ts">
export default {
  name: 'Tune',
  inject: ['tunes'],
  props: ['name'],
  computed: {
    tune() {
      return this.tunes[this.name]
    },
  },
  watch: {
    tune(tune) {
      this.select(tune)
    },
  },
  mounted() {
    this.select(this.tune)
  },
  methods: {
    select(tune) {
      this.$bus.emit('selectTune', tune)
    },
  },
}
</script>

<template>
  <TuneDisplay />
</template>
