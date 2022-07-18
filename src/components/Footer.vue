<template>
  <div v-if="context?.browserSupportsAudio" class="footer border-t-4 border-gray-300 dark:border-gray-700 shadow bg-hex-121212 color-white z-2000" :class="{ 'show': context?.renderedTune }">
    <SynthController />
  </div>
</template>

<script>
import 'abcjs/abcjs-audio.css'

export default {
  name: 'Footer',
  inject: ['context'],
}
</script>

<style scoped lang="scss">
.footer {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  padding: 5px 10px;
  //background-color: #ccc;

  transition-timing-function: ease-in-out;
  transition-duration: .3s;
  transition-property: margin-bottom;

  &.show {
    margin-bottom: 0;
  }

  &:not(.show) {
    margin-bottom: -40px;
  }

}
</style>
