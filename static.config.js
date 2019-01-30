import axios from 'axios'
import path from 'path'
import { mkDir, mkFile } from './fs'
const fs = require('fs')
import { buildFeed, grabContents } from 'podcats'

/// config
const myURL = 'https://reactstaticpodcast.netlify.com'
const ghURL = 'https://github.com/sw-yx/react-static-podcast-hosting'
const rss = myURL + '/rss/index.xml'
const itURL =
  'httpi://itunes.apple.com/ca/podcast/syntax-tasty-web-development-treats/id1253186678?mt=2'
const netlifyURL = 'https://app.netlify.com/sites/reactstaticpodcast'
const contentFolder = 'content'
const author = {
  name: 'REACTSTATICPODCAST_AUTHOR_NAME',
  email: 'REACTSTATICPODCAST_AUTHOR_EMAIL@foo.com',
  link: 'https://REACTSTATICPODCAST_AUTHOR_LINK.com',
}
const feedOptions = {
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
}
const iTunesChannelFields = {
  // itunes options
  summary: 'REACTSTATICPODCAST_SUMMARY_HERE',
  author: author.name,
  keywords: ['Technology'],
  categories: [
    { cat: 'Technology' },
    { cat: 'Technology', child: 'Tech News' },
  ],
  image: 'https://placekitten.com/g/1400/1400', // TODO: itunes cover art. you should customise this!
  explicit: false,
  owner: author,
  type: 'episodic',
}

// preprocessing'
const filenames = fs.readdirSync(contentFolder).reverse() // reverse chron
const filepaths = filenames.map(file =>
  path.join(process.cwd(), contentFolder, file),
)
const contents = grabContents(filepaths, myURL)
const frontmatters = contents.map(c => c.frontmatter)
mkDir('/public/rss/')

// generate HTML
export default {
  plugins: ['react-static-plugin-typescript'],
  entry: path.join(__dirname, 'src', 'index.tsx'),

  getSiteData: async () => {
    // generate RSS
    let feed = await buildFeed(
      contents,
      myURL,
      author,
      feedOptions,
      iTunesChannelFields,
    )
    mkFile('/public/rss/index.xml', feed.rss2())
    return {
      title: 'React Static',
      rss,
      frontmatters,
      ghURL,
      myURL,
      mostRecentEpisode: contents[0], // necessary evil to show on '/'
      subscribeLinks: [
        { type: 'iTunes', url: itURL },
        { type: 'RSS', url: rss },
        { type: 'GitHub', url: ghURL },
        { type: 'Netlify', url: netlifyURL },
      ],
    }
  },
  getRoutes: async () => {
    return [
      {
        path: 'episode',
        getData: () => ({
          contents,
        }),
        children: contents.map(content => ({
          path: `/${content.frontmatter.slug}`,
          component: 'src/pages/episode',
          getData: () => ({
            content,
            myURL,
          }),
        })),
      },
    ]
  },
}

function safeJoin(a, b) {
  /** strip starting/leading slashes and only use our own */
  let a1 = a.slice(-1) === '/' ? a.slice(0, a.length - 1) : a
  let b1 = b.slice(0) === '/' ? b.slice(1) : b
  return `${a1}/${b1}`
}
