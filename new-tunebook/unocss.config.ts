import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  // presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'DM Sans',
    //     serif: 'DM Serif Display',
    //     mono: 'DM Mono',
    //   },
    // }),
  ],
  theme: {
    fontFamily: {
      serif: ['"Source Serif 4"', 'serif'],
      sans: ['"Open Sans"', 'sans-serif'],
    },
    breakpoints: {
      xs: '319.75px',
      sm: '575.75px',
      md: '767.75px',
      lg: '991.75px',
      xl: '1199.75px',
      xxl: '1399.75px',
    },
  },
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
