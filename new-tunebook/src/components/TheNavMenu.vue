<template>
  <div
    class="the-nav-menu h-100% border-r-4 border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-hex-121212 z-1000"
    :class="{'open': open, 'closed': !open}"
  >
    <!--  -->
    <div v-for="letter in tunesByLetter" :key="letter[0]">
      <div>{{ letter[0] }}</div>
      <div v-for="tune in letter[1]" :key="getFirstLetter(tune.title)">
        {{ getValue(tune.title) }}
      </div>
    </div>
  </div>
</template>

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
