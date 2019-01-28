import React from 'react'
import { Episode } from '../types'
import { withRouteData } from 'react-static'
import styled from 'styled-components'

const SNDiv = styled('div')`
  width: 62%;
  font-size: 1.25rem;
  padding: 2rem;
  h2 {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 1rem;
  }
`

function NotesBar() {
  return (
    <>
      <p>THIS IS A BAR FOR DOWNLOAD BUTTONS</p>
      {/* <button className="button" type="button">
        <span class="icon">🎵</span> Play Episode 108
      </button>
      <a
        class="button"
        download=""
        href="https://traffic.libsyn.com/syntax/Syntax108.mp3"
      >
        <span class="icon">👇</span> Download Show
      </a>
      <a
        class="button"
        href="https://github.com/wesbos/Syntax/edit/master/shows/108 - Potluck.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="icon">✏️</span> Edit Show Notes
      </a> */}
    </>
  )
}

export default withRouteData(
  ({ content }: { content: Episode }) =>
    void console.log(content) ||
    (!content ? (
      'no content'
    ) : (
      <SNDiv>
        <p className="show__date">{content.frontmatter.date}</p>
        <h2>{content.frontmatter.title}</h2>
        <NotesBar />
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      </SNDiv>
    )),
)
