import React from 'react'
import styled from 'styled-components'

const HRDiv = styled('div')`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 80px;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
    margin-bottom: 15px;
    border: 3px solid #fff;
    box-shadow: inset 0 0 10px #f00;
  }
  * {
    margin: 0;
  }
`
export default function HeaderRight() {
  // const [Potato, setPotato] = React.useState('potato');
  // React.useEffect(() => {
  //   // do some stuff
  // })
  return (
    <HRDiv>
      <div id="title">
        <h2>YOUR TAGLINE HERE</h2>
      </div>
      <div id="hosts">
        <div>
          <img
            src="https://user-images.githubusercontent.com/35976578/39973926-0f34b514-56f3-11e8-9c4e-59547fedb719.jpg"
            alt="swyx"
          />
          <h3>swyx</h3>
          <a
            target="_blank"
            href="https://twitter.com/swyx"
            rel="noopener noreferrer"
          >
            @swyx
          </a>
          <p>Infinite Builder</p>
        </div>
      </div>
    </HRDiv>
  )
}
