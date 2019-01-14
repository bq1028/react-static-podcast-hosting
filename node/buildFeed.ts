import { Feed } from './feed'
const fs = require('fs')
const path = require('path')
const markdownIt = require('markdown-it')
const frontmatter = require('front-matter')
const { parse } = require('date-fns')

// build feed is our main function to build a `Feed` object which we
// can then serialize into various formats
export const buildFeed = (files: string[], myURL: string) => {
  const author = {
    name: 'foo',
    email: 'foo@bar.com',
    link: 'https://twitter.com/swyx',
  }
  let feed = new Feed(
    {
      // blog feed options
      title: 'React Static Podcast',
      description:
        'a podcast feed and blog generator in React and hosted on Netlify',
      link: myURL,
      id: myURL,
      copyright: 'copyrght YourNameHere',
      feedLinks: {
        atom: path.join(myURL, 'atom.xml'),
        json: path.join(myURL, 'feed.json'),
        rss: path.join(myURL, 'rss'),
      },
      author,
    },
    {
      // itunes options
      summary: 'podcast summary here',
      author: author.name,
      keywords: ['Technology'],
      categories: [{ cat: 'Technology' }],
      image: 'https://www.fillmurray.com/g/140/100',
      explicit: false,
      owner: author,
      type: 'episodic',
    },
  )
  files = files.reverse() // reverse chron
  // pages = sortBy(pages, page => get(page, 'data.date'))
  // pages = pages.slice(0, 10) // we only want the last 10 articles to show up in the feed

  //markdownIt is a markdown parser that takes my raw md files and
  //translates them into HTML that we can use in the feed
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
  const contents = files.map(page => {
    const filepath = path.join(process.cwd(), 'content', page)
    let file = fs.readFileSync(filepath, 'utf-8')
    let { attributes: fm, body } = frontmatter(file)
    // handle local links
    body = md.render(body)
    body = body.replace(/src="\//g, `src="${myURL}/`)

    feed.addItem({
      title: fm.title,
      id: path.join(myURL, page),
      link: path.join(myURL, fm.mp3URL),
      date: parse(fm.date),
      content: body,
      author: [author],
      description: body,
      itunes: {
        // image: 'https://via.placeholder.com/350x150',
        duration: 5 * 60,
        // explicit: false,
        // keywords: string[]
        subtitle: fm.description,
        episodeType: fm.episodeType || 'full',
        episode: fm.episode,
        season: fm.season,
        contentEncoded: body,
        mp3URL: path.join(myURL, fm.mp3URL),
        enclosureLength: 999999, // TODO: actually grab this
      },
    })
    return {
      slug: page.split('.')[0], // todo: slugify
      frontmatter: fm,
      body,
    }
  })
  feed.addContributor(author)
  return { feed, contents }
}
