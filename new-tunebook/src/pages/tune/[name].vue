<script setup lang="ts">
const props = defineProps<{ name: string }>()
</script>

<script lang="ts">
export default {
  name: 'Tune',
  inject: ['tunes'],
  computed: {
    tune() {
      return this.tunes[this.name]
    },
  },
}
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Tune: {{ tune.title.join('') }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>
  </div>
</template>
