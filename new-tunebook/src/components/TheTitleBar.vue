<template>
  <div class="title-bar border-b-4 border-gray-300 dark:border-gray-700 p-2 flex flex-row shadow items-center">
    <button v-if="!isMenuVisible" class="i-mdi-menu text-xl mr-2" />
    <button v-else class="i-mdi-close text-xl mr-2" />
    <div class="font-serif text-xl">
      Steve's Fiddle Tunes 🎻🪕
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTitleBar',
  props: ['isMenuVisible'],
}
</script>
