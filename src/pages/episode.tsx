import React from 'react'
// // import { Link } from '@reach/router'

// // import { Episode } from '../types'
// // import Header from '@src/components/Header'
// // import { withRouteData } from 'react-static'
// // export default withRouteData(({ contents }: { contents: Episode[] }) => (
// //   <>
// //     <Header />
// //     <h1>It's pod time.</h1>
// //     <br />
// //     All Episodes:
// //     <ul>
// //       {contents.map(content => (
// //         <li key={content.slug}>
// //           <Link to={`/episode/${content.slug}`}>
// //             {content.frontmatter.title}
// //           </Link>
// //         </li>
// //       ))}
// //     </ul>
// //   </>
// // ))

// export default function() {
//   return (
//     <div>
//       <h1>It's pod time.</h1>
//       <br />
//       All Episodes:
//     </div>
//   )
// }

import { withSiteData, RouteData } from 'react-static'
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

type Props = { contents: Episode[]; mostRecentEpisode: Episode }
export default withSiteData(({ contents, mostRecentEpisode }: Props) => {
  return (
    <RouteData>
      {({ content }) => (
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
            <ShowList contents={contents} />
            <ShowNotes />
          </Main>
          <Footer />
        </>
      )}
    </RouteData>
  )
})
