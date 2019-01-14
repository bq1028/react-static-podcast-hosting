import React from 'react'
import { withSiteData } from 'react-static'

import { Link } from '@reach/router'
import { Episode } from '../types'

export default withSiteData(({ contents }: { contents: Episode[] }) => (
  <div style={{ textAlign: 'center' }}>
    <h1>React-Static Podcast</h1>
    <p>make a podcast site and RSS feed with React-Static and Netlify</p>
    <p>
      <a href="https://twitter.com/swyx">Report issues here</a>
    </p>
    <p>
      <a href="https://github.com/sw-yx/react-static-podcast-hosting">
        Fork and contribute on GitHub
      </a>
    </p>
    <b>Episodes</b>
    <ul>
      {contents.map(({ slug, frontmatter }) => (
        <li key={slug}>
          <Link to={`/episode/${slug}`}>{frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  </div>
))
