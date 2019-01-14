import React from 'react'
import { Root, Routes, withSiteData } from 'react-static'
import { Link } from '@reach/router'

import './app.css'
// import FancyDiv from '@components/FancyDiv'

function App({ rss }: { rss: string }) {
  return (
    <Root>
      <nav>
        <Link to="/">Home</Link>
        {/* <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link> */}
        <a href={rss}>RSS Feed</a>
      </nav>
      {/* <FancyDiv> */}
      <div className="content">
        <Routes />
      </div>
      {/* </FancyDiv> */}
    </Root>
  )
}

export default withSiteData(App)

// tslint:disable-next-line:no-implicit-dependencies
