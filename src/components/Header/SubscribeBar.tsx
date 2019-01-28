import React from 'react'
import styled from 'styled-components'

const subscribeLinks = [
  {
    type: 'itunes',
    url:
      'https://itunes.apple.com/ca/podcast/syntax-tasty-web-development-treats/id1253186678?mt=2',
  },
  {
    type: 'rss',
    url: 'https://rss',
  },
]

const SubDiv = styled('ul')`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: space-between;

  a {
    color: rgba(0, 0, 0, 0.8);
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.05);
    font-size: 1.5rem;
    padding: 0.7rem 1rem;
    text-align: center;
    border-radius: 3px;
    font-family: sans-serif;
    font-weight: 100;
    transition: all 0.2s;
    display: flex;
    align-items: center;
  }
  .itunes {
    background: linear-gradient(
      to bottom,
      #cd66f6 0%,
      #9a3dd1 80%,
      #8e34c9 100%
    );
  }
  .rss {
    background: linear-gradient(
      to bottom,
      #4366f6 0%,
      #433dd1 80%,
      #4334c9 100%
    );
  }
`
export default function SubscribeBar() {
  return (
    <SubDiv>
      {subscribeLinks.map(link => (
        <li key={link.type}>
          <a
            className={link.type}
            target="_blank"
            href={link.url}
            rel="noopener noreferrer"
          >
            {link.type}
          </a>
        </li>
      ))}
    </SubDiv>
  )
}
