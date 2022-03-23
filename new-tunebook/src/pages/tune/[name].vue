<script setup lang="ts">
const props = defineProps<{ name: string }>()
</script>

<script lang="ts">
export default {
  name: 'Tune',
  inject: ['tunes'],
}
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Tune: {{ tunes[name].title.join('') }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>
  </div>
</template>
