const path = require('path')
import { defineUserConfig } from 'vuepress'
import { generateDirectory } from './utils'
import type { DefaultThemeOptions, WebpackBundlerOptions, App } from 'vuepress'

const DIRECTORY_FILE: string = 'directory.json'

export default defineUserConfig<DefaultThemeOptions, WebpackBundlerOptions>({
  lang: 'en-US',
  title: 'mootook',
  description: '',
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@shared': path.resolve(__dirname, './shared'), // types between node, client
    "@styles": path.resolve(__dirname, './styles')
  },
  themeConfig: {
    navbar: [
      { text: '/notes', link: '/notes' },
      { text: '/projects', link: '/projects' },
      { text: '/about', link: '/about' }
    ],
    contributors: false,
    lastUpdated: false
  },
  markdown: {
    code: {
      lineNumbers: false
    }
  },
  bundlerConfig: {
    scss: {
      // bundle sass for components
      additionalData: `@use "@styles/palette.scss" as *;`
    }
  },
  onPrepared: async (app: App) => {
    const directory = generateDirectory(app.pages)
    await app.writeTemp(DIRECTORY_FILE, JSON.stringify(directory))
  }
})