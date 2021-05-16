import type { Page } from 'vuepress'
import { Directory } from '@shared/types'

/**
 * 
 * @param {string} category
 * @param {Page[]} pages 
 * @returns {Page[]}
 */
const listChildren = (category: string, pages: Page[]) => {
  return pages
    .filter(p => parseCategory(p) === category)
    .filter(p => !p.frontmatter.isDirectory)
}

/**
 * 
 * @param {Page} p
 * @returns {string}
 */
const parseCategory = (p: Page) => {
  const fp = p.filePathRelative
  if (fp) {
    return fp.split('/')[0]
  }
  return ''
}

/**
 * @param {Page} p
 * @returns  {boolean}
 */
const isDirectory = (p: Page) => !!(p.frontmatter.isDirectory)


/**
 * @param {Page[]} pages
 * @returns {Directory}
 */
const generateDirectory = (pages: Page[]) => {
  const directories = pages.filter(p => isDirectory(p))
  // the temp file object to store
  const ret: Directory = {}
  directories.forEach(d => {
    const category: string = parseCategory(d)
    const children = listChildren(category, pages)
    ret[category] = children
  })
  return ret
}

export default generateDirectory