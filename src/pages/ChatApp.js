import React from 'react'
import styled from 'styled-components'

//components
import NavigationBar from '../components/NavigationBar'
import MessageList from '../components/MessageList'
import ChatBox from '../components/ChatBox'
import ChatInfo from '../components/ChatInfo'


const ChatApp = () => {
  return (
    <Wrapper>
        <NavigationBar />
        <MessageList />
        <ChatBox />
        <ChatInfo />
    </Wrapper>
  )
}

const Wrapper = styled.div`
display: flex;
`

export default ChatApp