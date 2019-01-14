import React from 'react'
import { withSiteData } from 'react-static'

import { Episode } from '../types'

export default withSiteData(({ contents }: { contents: Episode[] }) => (
  <div style={{ textAlign: 'center' }}>
    <h1>React-Static Podcast</h1>
    <p>make a podcast site and RSS feed with React-Static and Netlify</p>
    <p>
      <a href="https://twitter.com/swyx">Report issues here</a>
      <a href="https://github.com/sw-yx/react-static-podcast-hosting">
        Fork and contrbute here
      </a>
    </p>
    <ul>
      {contents.map(({ slug, frontmatter }) => (
        <li key={slug}>{frontmatter.title}</li>
      ))}
    </ul>
  </div>
))
