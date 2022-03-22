<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <router-view />
    <Footer />
  </main>
</template>

<script>
import TunesDataMixin from './mixins/TunesDataMixin'

export default {
  mixins: [TunesDataMixin],
  props: ['tunesData'],
  data() {
    return {
      tunes: [],
      audioService: undefined,
    }
  },
  methods: {
    parseTunesData() {
      if (!this.tunesData) return
      this.tunesData.forEach((tuneData) => {
        const tune = this.TunesData_parseTuneData(tuneData)
        tunes.push(tune)
      })
    },
  },
  mounted() {
    //
    //this.parseTunesData();
  },
  watch: {
    tunesData: {
      immediate: true,
      handler() {
        this.parseTunesData();
      }
    }
  }
}
</script>
