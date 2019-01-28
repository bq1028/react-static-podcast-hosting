import React from 'react'
import { Episode } from '../types'
import { Link } from '@reach/router'
import styled from 'styled-components'

const LI = styled('li')`
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  border-left: 10px solid #e4e4e4;
  background: #f9f9f9;
  position: relative;
  display: flex;
  a {
    flex: 1 1 auto;
    padding: 10px;
  }
  .playbutton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    flex-shrink: 0;
    padding: 1rem;
    button {
      background: none;
      border: 0;
      outline-color: #f1c15d;
    }
  }
  strong {
    color: #1d1d1d;
    font-size: 1.25rem;
    margin: 0;
  }
  p {
    text-transform: uppercase;
    margin: 0;
    color: #666;
  }
`
type Props = {
  episode: Episode
}
function ListItem({ episode }: Props) {
  const { slug, frontmatter } = episode
  return (
    <LI>
      <Link to={`/episode/${slug}`}>
        <p>Episode {frontmatter.episode}</p>
        <strong>{frontmatter.title}</strong>
      </Link>
      <div className="playbutton">
        <button type="button" title="play button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
          >
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
          </svg>
        </button>
      </div>
    </LI>
  )
}

const UL = styled('ul')`
  width: 38%;
  display: flex;
  flex-direction: column;
  padding: 0;
`

type MyProps = {
  contents: Episode[]
  setSelected?: Function
}

export default function ShowList({ contents }: MyProps) {
  return (
    <UL>
      {contents.map(episode => (
        <ListItem key={episode.slug} episode={episode} />
      ))}
    </UL>
  )
}
