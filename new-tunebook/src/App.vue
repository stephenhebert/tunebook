<template>
  <TheTitleBar :is-menu-open="isNavMenuOpen" @toggle-nav-menu="isNavMenuOpen = !isNavMenuOpen" />
  <div class="position-relative h-100%">
    <TheNavMenu :open="isNavMenuOpen" :tunes="tunes" @hide="isNavMenuOpen = false" />
    <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200 w-100%" :class="{'with-nav': isNavMenuOpen}">
      <router-view />
    </main>
    <Footer />
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
      context: this.context,
    }
  },
  props: ['tunesData', 'bus'],
  data() {
    return {
      tunes: [],
      context: {
        selectedTune: undefined,
        renderedTune: undefined,
        notationContainer: undefined,
        browserSupportsAudio: true,
        synthController: undefined,
        userAction: false,
        settings: {
          transpose: 0,
          tabs: false,
          tempoPercent: 100,
          enableChords: true,
        },
      },
      isNavMenuOpen: false,
      audioService: undefined,
    }
  },
  computed: {
    isFooterShown() {
      return !!this.context.renderedTune
    },
  },
  created() {
    this.$bus.on('selectTune', (tune) => {
      this.context.selectedTune = tune
    })

    this.$bus.on('setBrowserSupport', (bool) => {
      this.context.browserSupportsAudio = bool
    })

    this.$bus.on('setRenderedTune', (tuneObj) => {
      this.context.renderedTune = tuneObj
    })

    this.$bus.on('setNotationContainer', (el) => {
      this.context.notationContainer = el
    })

    this.$bus.on('logUserAction', () => {
      this.context.userAction = true
    })

    this.$bus.on('setSynthController', (instance) => {
      this.context.synthController = instance
    })

    this.$bus.on('toggleChords', () => {
      this.context.settings.enableChords = !this.context.settings.enableChords
    })
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

    // TODO: replace with @apply?
    @media (min-width: none) {
      margin-left: 0;
    }
    @media (min-width: 992px) {
      margin-left: 360px;
    }

  }

}
</style>
