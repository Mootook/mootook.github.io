import type { Page } from 'vuepress'
import type { Blurb } from '@/types'

const SENTENCE_COUNT = 5

/**
 * Purify the content from markdown to get raw
 * text body.
 * @param {string} content
 * @returns {string}
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
export const blurbFromPage = (p: Page): Blurb => ({
  title: p.title,
  date: p.frontmatter.date as string,
  link: p.path,
  description: parseDescription(p.content)
})