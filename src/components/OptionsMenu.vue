<template>
  <Menu as="div" class="position-relative flex items-center">
    <MenuButton class="" @click="toggleMenu">
      <div v-if="!open" class="i-tabler-dots" />
      <div v-else class="i-tabler-x" />
    </MenuButton>
    <MenuItems v-show="open" static as="div" class="menu-items w-35 position-absolute bottom-10 right-0 border-1 border-black text-white dark:text-black dark:border-white shadow rounded-6px p-2 dark:bg-gray-300 bg-gray-700">
      <!-- Chords -->
      <MenuItem @click="toggleChords">
        <div class="flex items-center flex-shrink-0">
          <!--  -->
          <div v-if="!playChords" class="i-tabler-square" />
          <div v-else class="i-tabler-square-check" />
          <label class="mx-1 text-xs">Play Chords</label>
        </div>
      </MenuItem>
      <!-- Tablature -->
      <MenuItem @click="toggleTabs">
        <div class="flex items-center">
          <!--  -->
          <div v-if="!showTabs" class="i-tabler-square" />
          <div v-else class="i-tabler-square-check" />
          <label class="mx-1 text-xs">Show Tabs</label>
        </div>
      </MenuItem>
      <!-- Instrument -->
      <MenuItem as="template">
        <div class="mt-2 text-xs">
          Lead Instrument
          <div class="p-2 rounded border-1">
            <!-- <button class="flex items-center" @click="setInstrument('FIDDLE')">
              <div v-if="instrument === 'FIDDLE'" class="i-tabler-circle-dot" />
              <div v-else class="i-tabler-circle" />
              <label class="mx-1 text-xs">Fiddle</label>
            </button> -->
            <button class="flex items-center" @click="setInstrument('PIANO')">
              <div v-if="instrument === 'PIANO'" class="i-tabler-circle-dot" />
              <div v-else class="i-tabler-circle" />
              <label class="mx-1 text-xs">Piano</label>
            </button>
            <button class="flex items-center" @click="setInstrument('ACCORDION')">
              <div v-if="instrument === 'ACCORDION'" class="i-tabler-circle-dot" />
              <div v-else class="i-tabler-circle" />
              <label class="mx-1 text-xs">Accordion</label>
            </button>
            <button class="flex items-center" @click="setInstrument('FLUTE')">
              <div v-if="instrument === 'FLUTE'" class="i-tabler-circle-dot" />
              <div v-else class="i-tabler-circle" />
              <label class="mx-1 text-xs">Flute</label>
            </button>
            <button class="flex items-center" @click="setInstrument('BANJO')">
              <div v-if="instrument === 'BANJO'" class="i-tabler-circle-dot" />
              <div v-else class="i-tabler-circle" />
              <label class="mx-1 text-xs">Banjo</label>
            </button>
          </div>
        </div>
      </MenuItem>
      <!-- Transpose -->
      <MenuItem as="template">
        <div class="flex items-center text-xs mt-2">
          <label class="">Transpose</label>
          <input v-model="transpose" type="number" max="12" min="-12" class="ms-auto rounded w-48px p-2px ps-6px border-1 bg-transparent">
        </div>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  name: 'OptionsMenu',
  components: { Menu, MenuButton, MenuItem, MenuItems },
  inject: ['context'],
  data() {
    return {
      open: false,
      transpose: 0,
    }
  },
  computed: {
    playChords() { return !!this.context?.settings?.enableChords },
    showTabs() { return !!this.context?.settings?.showTabs },
    instrument() { return this.context?.settings?.instrument },
  },
  watch: {
    transpose(val) {
      this.$bus.emit('setTranspose', val)
    },
  },
  methods: {
    toggleChords() {
      this.$bus.emit('toggleChords')
    },
    toggleTabs() {
      this.$bus.emit('toggleTabs')
    },
    toggleMenu() {
      this.open = !this.open
    },
    setInstrument(instrument) {
      this.$bus.emit('setInstrument', instrument)
    },
  },
}
</script>
