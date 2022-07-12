<template>
  <div
    class="the-nav-menu mb-0 border-r-4 border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-hex-121212 z-1000 bottom-0"
    :class="{'open': open, 'closed': !open, '!bottom-42px': !!context.renderedTune }"
  >
    <!--  -->
    <div v-for="letter in tunesByLetter" :key="letter[0]">
      <div class="fw-semibold text-sm mb-4">
        {{ letter[0] }}
        <template v-for="tune in letter[1]">
          <button
            class="tune-title text-lg font-serif block lt-lg:display-none text-left"
            :class="{'selected': tune.fileName === selectedTune?.fileName }"
            @click="go(tune.index)"
          >
            {{ tune.title }}
          </button>
          <button
            class="tune-title text-lg font-serif block lg:display-none text-left"
            :class="{'selected': tune.fileName === selectedTune?.fileName }"
            @click="goAndHide(tune.index)"
          >
            {{ tune.title }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBus } from '~/composables/'
// const bus = useBus()
const emit = defineEmits(['hide'])
const router = useRouter()
const go = (i) => {
  if (i !== undefined)
    router.push(`/tune/${i}`)
}
const goAndHide = (i) => {
  go(i)
  emit('hide')
}
</script>

<script>
export default {
  name: 'TheNavMenu',
  inject: ['context'],
  props: ['open', 'tunes'],
  computed: {
    tunesByLetter() {
      let tunes = [...this.tunes]
      tunes = tunes
        .map((tune, i) => ({ ...tune, index: i }))
        .reduce((arr, curr) => {
          curr.title.forEach((title) => {
            if (title.startsWith('The ')) title = `${title.slice(4)}, The`
            arr.push({ ...curr, title })
          })
          return arr
        }, [])
        .sort((a, b) => a.title.localeCompare(b.title))
        .reduce((obj, curr) => {
          const firstLetter = this.getFirstLetter(curr.title)
          if (!obj[firstLetter]) obj[firstLetter] = []
          obj[firstLetter].push(curr)
          return obj
        }, {})
      return Object.entries(tunes)
    },
    selectedTune() {
      return this.context?.selectedTune
    },
  },
  methods: {
    getFirstLetter(field) {
      return field.charAt(0).toUpperCase()
    },
  },
}
</script>

<style scoped lang="scss">
.the-nav-menu {

  transition-timing-function: ease-in-out;
  transition-duration: .3s;
  transition-property: left, width, visibility, bottom;
  position: fixed;
  width: 360px;
  top: 50px;

  &.open {
    left: 0;
    visibility: visible;

  }

  &.closed {
    left: -360px;
    width: 0;
    visibility: hidden;
  }

  .tune-title {
    text-indent: -1rem;
    padding-left: 1rem;

    &.selected {
      color: #0a9ecc;
    }
  }

}

</style>
