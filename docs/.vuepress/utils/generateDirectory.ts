import type { Page } from 'vuepress'
import { Directory, Blurb } from '@shared/types'

const SENTENCE_COUNT = 5

/**
 * Purify the content from markdown to get raw
 * text body.
 * 
 * @link {https://www.bigomega.dev/markdown-parser}
 */
const cleanMarkdown = (content: string): string => {
  return content
    .replace(/^### (.*$)/gim, '')
    .replace(/^## (.*$)/gim, '')
    .replace(/^# (.*$)/gim, '')
    .replace(/^\> (.*$)/gim, '')
    .replace(/\*\*(.*)\*\*/gim, '')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "")
    .replace(/\n$/gim, '')
}

/**
 * Get the first few sentences from the article content
 * for the blurb description.
 * @param {string} content
 * @returns {string}
 */
const parseDescription = (content: string) => {
  const cleaned = cleanMarkdown(content)
  const sentences = cleaned.match( /[^\.!\?]+[\.!\?]+/g )
  if (sentences && sentences.length > 0) {
    const truncated = sentences.slice(0, SENTENCE_COUNT)
    // console.log('Sentences: ', truncated)
    return truncated.join(' ')
  }
  return ''
}

/**
 * Create Blurb object for props.
 * @param {Page} p
 * @returns {Blurb}
 */
const blurbFromPage = (p: Page): Blurb => ({
  title: p.title,
  date: p.frontmatter.date as string,
  link: p.path,
  description: parseDescription(p.content)
})

/**
 * 
 * @param {string} category
 * @param {Page[]} pages 
 * @returns {Page[]}
 */
const listChildren = (category: string, pages: Page[]): Blurb[] => {
  return pages
    .filter(p => parseCategory(p) === category)
    .filter(p => !p.frontmatter.isDirectory)
    .map(p => blurbFromPage(p))
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
export const generateDirectory = (pages: Page[]) => {
  const directories = pages.filter(p => isDirectory(p))
  // the temp file object to store
  const ret: Directory = {}
  directories.forEach(d => {
    const category: string = parseCategory(d)
    const children = listChildren(category, pages)
    // to do
    // parse the children objects
    // so that they're not so large...
    ret[category] = children
  })
  return ret
}
