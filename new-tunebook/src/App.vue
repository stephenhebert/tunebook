<template>
  <TheTitleBar :is-menu-open="isNavMenuOpen" @toggle-nav-menu="isNavMenuOpen = !isNavMenuOpen" />
  <div class="position-relative h-100%">
    <TheNavMenu :open="isNavMenuOpen" :tunes="tunes" />
    <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200 w-100%" :class="{'with-nav': isNavMenuOpen}">
      <router-view />
      <Footer />
    </main>
  </div>
</template>

<script>
import TunesDataMixin from './mixins/TunesDataMixin'
import TheNavMenu from './components/TheNavMenu.vue'

export default {
  components: { TheNavMenu },
  mixins: [TunesDataMixin],
  provide() {
    return {
      tunes: this.tunes,
    }
  },
  props: ['tunesData'],
  data() {
    return {
      tunes: [],
      isNavMenuOpen: false,
      audioService: undefined,
    }
  },
  mounted() {
    this.getTunes()
  },
  methods: {
    getTunes() {
      if (!this.tunesData)
        return
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

<style scoped lang="scss">
main {
  transition-timing-function: ease-in-out;
  transition-duration: .3s;
  transition-property: margin-left;

  &.with-nav {

    @media (min-width: none) {
      margin-left: 0;
    }

    @media (min-width: 992px) {
      margin-left: 360px;
    }

  }

}
</style>
