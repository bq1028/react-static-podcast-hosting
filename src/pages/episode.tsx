import React from 'react'

// export default function() {
//   return (
//     <div>
//       <h1>It's pod time.</h1>
//       <br />
//       All Episodes:
//     </div>
//   )
// }

import { withSiteData } from 'react-static'
import { Episode, EpisodeFrontMatter } from 'podcats'
import Header from '@src/components/Header'
import Player from '@src/components/Player'
import Footer from '@src/components/Footer'
import ShowList from '@src/components/ShowList'
import ShowNotes from '@src/components/ShowNotes'
import styled from 'styled-components'

const Main = styled('main')`
  background: #fff;
  display: flex;
  flex-wrap: wrap;
`

type Props = { frontmatters: EpisodeFrontMatter[]; mostRecentEpisode: Episode }
export default withSiteData(({ frontmatters, mostRecentEpisode }: Props) => {
  return (
    <>
      <Header />
      <Main>
        <Player mostRecentEpisode={mostRecentEpisode} />
        <ShowList frontmatters={frontmatters} />
        <ShowNotes mostRecentEpisode={mostRecentEpisode} />
      </Main>
      <Footer />
    </>
  )
})
