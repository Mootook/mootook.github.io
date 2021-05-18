import { Directory, Blurb } from '@shared/types'
import type { Page } from 'vuepress'

/**
 * How many sentences to keep for the blurb entry
 * from the file article/page?
 */
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
 */
const parseDescription = (content: string): string => {
  const cleaned = cleanMarkdown(content)
  const sentences = cleaned.match( /[^\.!\?]+[\.!\?]+/g )
  if (sentences && sentences.length > 0) {
    const truncated = sentences.slice(0, SENTENCE_COUNT)
    return truncated.join(' ')
  }
  return ''
}

/**
 * Create Blurb object for props.
 */
const blurbFromPage = (p: Page): Blurb => ({
  title: p.title,
  date: p.frontmatter.date as string,
  link: p.path,
  description: parseDescription(p.content)
})

/**
 * Get all the children posts for a category
 */
const listChildren = (category: string, pages: Page[]): Blurb[] => {
  return pages
    .filter(p => parseCategory(p) === category)
    .filter(p => !p.frontmatter.isDirectory)
    .map(p => blurbFromPage(p))
}

/**
 * Get the category from its filepath
 */
const parseCategory = (p: Page) => {
  const fp = p.filePathRelative
  if (fp) {
    return fp.split('/')[0]
  }
  return ''
}

/**
 *
 */
const isDirectory = (p: Page) => !!(p.frontmatter.isDirectory)

/**
 * Writes a temporary json file
 * with a directory for client side props, functionality
 */
export const generateDirectory = (pages: Page[]) => {
  const directories = pages.filter(p => isDirectory(p))
  // the temp file object to store
  const ret: Directory = {}
  directories.forEach(d => {
    const category = parseCategory(d)
    const children = listChildren(category, pages)
    ret[category] = children
  })
  return ret
}
