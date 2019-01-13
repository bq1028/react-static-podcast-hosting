import axios from 'axios'
import path from 'path'
const fs = require('fs')
const Feed = require('./node/feed')
const filter = require('lodash/filter')
const sortBy = require('lodash/sortBy')
const forEach = require('lodash/forEach')
const get = require('lodash/get')
const datefns = require('date-fns')
const markdownIt = require('markdown-it')
const frontmatter = require('front-matter')

export default {
  plugins: ['react-static-plugin-typescript'],
  entry: path.join(__dirname, 'client', 'index.tsx'),
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    )
    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'client/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  },
}
