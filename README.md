## mootook.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/44530cec-458d-489c-ab01-782b6112c623/deploy-status)](https://app.netlify.com/sites/mootookdev/deploys)

## Project Setup

- Node >= v16
- VuePress
## Docs

- [VuePress](https://vuepress2.netlify.app/)

## Issues

- [Using Sass Vars](https://github.com/vuejs/vuepress/issues/2148)
- [Extend Markdown](https://stackoverflow.com/questions/55046233/how-to-change-content-of-vuepress-page-via-plugin)


### Notes/Roadmap

The lists seen for /projects and /notes are dynamically generated vie the `onPrepared` hook in VuePress's config.
This means that once a new article is added to notes or projects, it'll be automatically create an entry in the temp json file
that `ArticleList` component reads from, extracting necessary frontmatter data and parsed/cleaned content for the blurb's description.

This pipeline thus opens up the opportunity to filter by timestamp, add tags, search as there's a central directory, and it's easy to traverse.

Todo:
- [x] Trim the stored page data in the temp/json object