import { Feed } from './feed'
const fs = require('fs')
const path = require('path')
const markdownIt = require('markdown-it')
const frontmatter = require('front-matter')
const { parse } = require('date-fns')

// build feed is our main function to build a `Feed` object which we
// can then serialize into various formats
// TODO: Customize to your own details
export const buildFeed = (files: string[], myURL: string) => {
  const author = {
    name: 'REACTSTATICPODCAST_AUTHOR_NAME',
    email: 'REACTSTATICPODCAST_AUTHOR_EMAIL@foo.com',
    link: 'https://REACTSTATICPODCAST_AUTHOR_LINK.com',
  }
  let feed = new Feed(
    {
      // blog feed options
      title: 'React Static Podcast',
      description:
        'a podcast feed and blog generator in React and hosted on Netlify',
      link: myURL,
      id: myURL,
      copyright: 'copyright REACTSTATICPODCAST_YOURNAMEHERE',
      feedLinks: {
        atom: safeJoin(myURL, 'atom.xml'),
        json: safeJoin(myURL, 'feed.json'),
        rss: safeJoin(myURL, 'rss'),
      },
      author,
    },
    {
      // itunes options
      summary: 'REACTSTATICPODCAST_SUMMARY_HERE',
      author: author.name,
      keywords: ['Technology'],
      categories: [
        { cat: 'Technology' },
        { cat: 'Technology', child: 'Developers' },
      ],
      image: 'https://www.fillmurray.com/g/1400/1400', // TODO: itunes cover art. you should customise this!
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
      id: safeJoin(myURL, page),
      link: safeJoin(myURL, fm.mp3URL),
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
        mp3URL: safeJoin(myURL, fm.mp3URL),
        enclosureLength: 999999, // TODO: actually grab this from file
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

function safeJoin(a: string, b: string) {
  /** strip starting/leading slashes and only use our own */
  let a1 = a.slice(-1) === '/' ? a.slice(0, a.length - 1) : a
  let b1 = b.slice(0) === '/' ? b.slice(1) : b
  return `${a1}/${b1}`
}
