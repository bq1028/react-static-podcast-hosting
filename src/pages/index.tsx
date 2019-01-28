import React from 'react'
import { withSiteData } from 'react-static'
// import { Link } from '@reach/router'
import { Episode } from '../types'
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

export default withSiteData(({ contents }: { contents: Episode[] }) => {
  const [selected, setSelected] = React.useState(contents[0])

  return (
    <>
      <Header />
      <Main>
        <Player
          show={{
            number: 2,
            displayNumber: '2',
            title: 'ittle',
            url: 'urTHIS IS A URLl',
          }}
        />
        <ShowList contents={contents} setSelected={setSelected} />
        <ShowNotes selected={selected} />
      </Main>
      <Footer />
    </>
  )
})
