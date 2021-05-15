const path = require('path')
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions, WebpackBundlerOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions, WebpackBundlerOptions>({
  lang: 'en-US',
  title: 'mootook',
  description: '',
  alias: { '@': path.resolve(__dirname, '../../src') },
  themeConfig: {
    navbar: [
      { text: 'Blog', link: '/blog' },
      { text: 'Projects', link: '/projects' }
    ]
  }
})