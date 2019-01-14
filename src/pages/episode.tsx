import React from 'react'
import { withRouteData } from 'react-static'
import { Link } from '@reach/router'

import { Episode } from '../types'
export default withRouteData(({ contents }: { contents: Episode[] }) => (
  <div>
    <h1>It's pod time.</h1>
    <br />
    All Episodes:
    <ul>
      {contents.map(content => (
        <li key={content.slug}>
          <Link to={`/episode/${content.slug}`}>
            {content.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))