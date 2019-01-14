import React from 'react'
import { withRouteData } from 'react-static'
import { Link } from '@reach/router'

import { Episode } from '../types'
export default withRouteData(
  ({ content }: { content: Episode }) =>
    void console.log(content) || (
      <div>
        <Link to="/">{'<'} Back</Link>
        <br />
        <h3>{content.frontmatter.title}</h3>
        <hr />
        Link to Podcast:{' '}
        <a href={'/' + content.frontmatter.mp3URL}>Download here</a>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      </div>
    ),
)
