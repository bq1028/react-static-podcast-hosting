import React from 'react'
import { withRouteData } from 'react-static'
import { Link } from '@reach/router'

import { Episode } from '../types'
export default withRouteData(({ content }: { content: Episode }) => (
  <div>
    <Link to="/">{'<'} Back</Link>
    <br />
    <h3>{content.frontmatter.title}</h3>
    {content.body}
  </div>
))
