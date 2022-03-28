<template>
  <div
    class="the-nav-menu h-100% border-r-4 border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-hex-121212 z-1000"
    :class="{'open': open, 'closed': !open}"
  >
    <!--  -->
    <div v-for="letter in tunesByLetter" :key="letter[0]">
      <div class="fw-semibold text-sm mb-4">
        {{ letter[0] }}
        <template v-for="tune in letter[1]" :key="getFirstLetter(tune.title)">
          <button
            class="text-lg font-serif block lt-lg:display-none "
            @click="go(tune.index)"
          >
            {{ getValue(tune.title) }}
          </button>
          <button
            class="text-lg font-serif block lg:display-none"
            @click="goAndHide(tune.index)"
          >
            {{ getValue(tune.title) }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBus } from '~/composables/'
const bus = useBus()
const emit = defineEmits(['hide'])
const router = useRouter()
const go = (i) => {
  bus.emit('logUserAction')
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
  props: ['open', 'tunes'],
  computed: {
    tunesByLetter() {
      let tunes = [...this.tunes]
      tunes = tunes
        .sort((a, b) => a.title.join('').localeCompare(b.title.join('')))
        .reduce((obj, curr, i) => {
          const firstLetter = this.getFirstLetter(curr.title)
          if (!obj[firstLetter]) obj[firstLetter] = []
          obj[firstLetter].push({ ...curr, index: i })
          return obj
        }, {})
      return Object.entries(tunes)
    },
  },
  methods: {
    getValue(field) {
      return field.join('')
    },
    getFirstLetter(field) {
      return this.getValue(field).charAt(0).toUpperCase()
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

  &.open {
    left: 0;
    visibility: visible;
  }

  &.closed {
    //left: -18.75rem;
    left: -360px;
    width: 0;
    visibility: hidden;
  }

}

</style>
