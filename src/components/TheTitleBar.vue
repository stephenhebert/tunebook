<template>
  <div class="title-bar border-b-4 border-gray-300 bg-white dark:border-gray-700 dark:bg-hex-121212 p-2 flex flex-row shadow items-center fixed w-full z-10">
    <button
      class="text-xl mr-2"
      :class="{'i-mdi-menu': !isMenuOpen, 'i-mdi-close': isMenuOpen}"
      @click="toggleNavMenu"
    />
    <div class="font-serif text-xl">
      Steve's Fiddle Tunes 🎻🪕
    </div>
    <button class="icon-btn !outline-none ml-auto" @click="toggleDark()">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>
  </div>
</template>

<script setup>
import { isDark, toggleDark } from '~/composables'

</script>

<script>

export default {
  name: 'TheTitleBar',
  props: ['isMenuOpen'],
  emits: ['toggle-nav-menu'],
  methods: {
    toggleNavMenu() { this.$emit('toggle-nav-menu') },
  },
}
</script>
