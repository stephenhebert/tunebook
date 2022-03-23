<template>
  <div class="title-bar border-b-4 border-gray-300 dark:border-gray-700 p-2 flex flex-row shadow items-center">
    <button
      class="text-xl mr-2"
      :class="{'i-mdi-menu': !isMenuOpen, 'i-mdi-close': isMenuOpen}"
      @click="toggleNavMenu"
    />
    <div class="font-serif text-xl">
      Steve's Fiddle Tunes 🎻🪕
    </div>
  </div>
</template>

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
