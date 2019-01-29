import axios from 'axios'
import path from 'path'
import { mkDir, mkFile } from './node/fs'
const fs = require('fs')
import { buildFeed } from './node/buildFeed'

/// config
const contentFolder = 'content'

// generate RSS
const episodes = fs.readdirSync(contentFolder)
const myURL = 'https://reactstaticpodcast.netlify.com'
const ghURL = 'https://github.com/sw-yx/react-static-podcast-hosting'
let { feed, contents } = buildFeed(episodes, myURL) // TODO: DO THE REST OF THE CONFIG IN HERE
mkDir('/public/rss/')
mkFile('/public/rss/index.xml', feed.rss2())
const rss = myURL + '/rss/index.xml'
const itURL =
  'httpi://itunes.apple.com/ca/podcast/syntax-tasty-web-development-treats/id1253186678?mt=2'
const netlifyURL = 'https://app.netlify.com/sites/reactstaticpodcast'

// generate HTML
export default {
  plugins: ['react-static-plugin-typescript'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  // paths: {
  //   src: 'client',
  // },
  getSiteData: () => ({
    title: 'React Static',
    rss,
    contents,
    mostRecentEpisode: contents[0],
    ghURL,
    myURL,
    subscribeLinks: [
      { type: 'iTunes', url: itURL },
      { type: 'RSS', url: rss },
      { type: 'GitHub', url: ghURL },
      { type: 'Netlify', url: netlifyURL },
    ],
  }),
  getRoutes: async () => {
    return [
      {
        path: 'episode',
        getData: () => ({
          contents,
        }),
        children: contents.map(content => ({
          path: `/${content.slug}`,
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
