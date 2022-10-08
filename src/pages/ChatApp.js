import React, { useEffect } from 'react'
import styled from 'styled-components'
import Lottie from "lottie-react"
import nomessages from '../animation/nomessages.json'

//components
import NavigationBar from '../components/NavigationBar'
import MessageList from '../components/MessageList'
import ChatBox from '../components/ChatBox'
import ChatInfo from '../components/ChatInfo'
import Loader from '../components/Loader'

//redux
import { selectUser, selectedChat, setUserData } from '../app/appSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../app/firebase'



const ChatApp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chat = useSelector(selectedChat);

  useEffect(() => {
    if(user){
    //get group messages if they exsists
    const unsub = onSnapshot(doc(db, 'users', user?.uid), (doc) => {
      dispatch(setUserData(doc.data()));
    });

    return unsub;
    }

    //eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if(!user && user !== null){ navigate('/')}
    else {
      const body = document.querySelector('html');
      body.style.overflow = 'hidden';
    }
  }, [user, navigate])

  return (
    <div className='chatApp'>
      {!user ? <Loader /> : <>
        <Wrapper>
            <NavigationBar />
            <MessageList />
            {chat ? <> <ChatBox /> <ChatInfo /> </> : <>
              <div className='no-chat-opened'>
                <Lottie className='chat-animation' animationData={nomessages} loop={true} />
                <p>No conversation selected</p>
              </div>
            </>}
        </Wrapper>
      </>}
    </div>
  )
}

const Wrapper = styled.div`
display: flex;
max-width: 1440px;
margin: 0 auto;
overflow-y: hidden;

.no-chat-opened {
  width: 72%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--light-grey);
  user-select: none;
  overflow: hidden;

  p {
    color: white;
  }
}
`

export default ChatApp