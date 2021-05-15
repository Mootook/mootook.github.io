const path = require('path')
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions, WebpackBundlerOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions, WebpackBundlerOptions>({
  lang: 'en-US',
  title: 'mootook',
  description: '',
  alias: { '@': path.resolve(__dirname, '../../src'), "@styles": path.resolve(__dirname, './styles') },
  themeConfig: {
    navbar: [
      { text: '/notes', link: '/notes' },
      { text: '/projects', link: '/projects' },
      { text: '/about', link: '/about' }
    ],
    contributors: false,
    lastUpdated: false
  },
  bundlerConfig: {
    scss: {
      // bundle sass for components
      additionalData: `@use "@styles/palette.scss" as *;`
    }
  }
})