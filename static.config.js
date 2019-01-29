import axios from 'axios'
import path from 'path'
import { mkDir, mkFile } from './node/fs'
const fs = require('fs')
import { buildFeed, grabContents } from './node/buildFeed'

/// config
const myURL = 'https://reactstaticpodcast.netlify.com'
const ghURL = 'https://github.com/sw-yx/react-static-podcast-hosting'
const rss = myURL + '/rss/index.xml'
const itURL =
  'httpi://itunes.apple.com/ca/podcast/syntax-tasty-web-development-treats/id1253186678?mt=2'
const netlifyURL = 'https://app.netlify.com/sites/reactstaticpodcast'
const contentFolder = 'content'

// preprocessing
const episodes = fs.readdirSync(contentFolder).reverse() // reverse chron
const contents = grabContents(episodes, myURL)
const frontmatters = contents.map(c => c.frontmatter)
mkDir('/public/rss/')

// generate HTML
export default {
  plugins: ['react-static-plugin-typescript'],
  entry: path.join(__dirname, 'src', 'index.tsx'),

  getSiteData: async () => {
    // generate RSS
    let feed = await buildFeed(contents, myURL) // USER: DO THE REST OF THE CONFIG IN HERE
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
