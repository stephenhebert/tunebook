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
  mounted() {
    this.getTunes()
  },
  methods: {
    getTunes() {
      if (!this.tunesData) return
      Object.entries(this.tunesData).forEach((tuneFile) => {
        const fileName = tuneFile[0]
        const abc = tuneFile[1]
        const tuneObj = {
          ...this.TunesData_getMeta(abc),
          fileName,
          abc,
        }
        this.tunes.push(tuneObj)
      })
    },
  },
}
</script>
