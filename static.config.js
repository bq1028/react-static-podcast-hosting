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
// console.log({ rss })

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
