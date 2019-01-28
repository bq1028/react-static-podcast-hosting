import React from 'react'
import styled from 'styled-components'
import HeaderRight from './HeaderRight'
import SubscribeBar from './SubscribeBar'
export default styled(Header)`
  display: flex;
`

const HLDiv = styled('div')`
  width: 70%;
  text-align: center;
  display: grid;
  align-items: center;
  font-size: 1.5rem;
`
const AHeader = styled('header')`
  flex-wrap: wrap;
`
function Header(props: any) {
  return (
    <AHeader {...props}>
      <HLDiv>
        <h1>React Static Podcast Name</h1>
        {/* <img src="https://sw-yx.tinytake.com/media/952085?filename=1548652201152_27-01-2019-19-10-00.png&sub_type=thumbnail_preview&type=attachment&width=282&height=207&&salt=MzI2MjE2OV85NzczMTg5" /> */}
      </HLDiv>
      <HeaderRight />
      <SubscribeBar />
    </AHeader>
  )
}
