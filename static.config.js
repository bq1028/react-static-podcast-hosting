import axios from 'axios'
import path from 'path'
import { mkDir, mkFile } from './node/fs'
const fs = require('fs')
import { buildFeed } from './node/buildFeed'

/// config
const contentFolder = 'content'

// generate RSS
const episodes = fs.readdirSync(contentFolder)
let { feed, contents } = buildFeed(episodes)
mkDir('/public/rss/')
mkFile('/public/rss/index.xml', feed.rss2())

// generate HTML
export default {
  plugins: ['react-static-plugin-typescript'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  // paths: {
  //   src: 'client',
  // },
  getSiteData: () => ({
    title: 'React Static',
    contents,
  }),
  getRoutes: async () => {
    return [
      {
        path: 'episode',
        getData: () => ({
          contents,
        }),
        children: contents.map(content => ({
          path: `/episode/${content.slug}`, // not ideal but ok
          component: 'src/containers/Post',
          getData: () => ({
            content,
          }),
        })),
      },
    ]
  },
}
