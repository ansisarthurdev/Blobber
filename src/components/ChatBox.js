import React, { useEffect } from 'react'
import styled from 'styled-components'

//icons
import { CameraVideo } from '@styled-icons/bootstrap/CameraVideo'
import { Call } from '@styled-icons/fluentui-system-regular/Call'
import { MoreCircle } from '@styled-icons/fluentui-system-regular/MoreCircle'
import { Send } from '@styled-icons/boxicons-solid/Send'
import { FileImage } from '@styled-icons/boxicons-solid/FileImage'

//redux
import { openChatInfo, selectChatInfo } from '../app/appSlice'
import { useDispatch, useSelector } from 'react-redux'

import { motion } from 'framer-motion/dist/framer-motion'

const ChatBox = () => {

  const dispatch = useDispatch();
  const chatInfoContainerState = useSelector(selectChatInfo);

  //scroll down automatically.
  useEffect(() => {
    let chatContent = document.getElementById('chat-content');
    chatContent.scrollTop = chatContent.scrollHeight;
  }, [])

  return (
    <Wrapper style={{width: chatInfoContainerState ? '52%' : '72%'}}>
      <ChatInfo>
        <div className='chat-info'> 
          <div style={{marginRight: 10}}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' />
          </div>
          <div>
            <p className='name'>ansisarthurdev hub</p>
            <p className='members'>12 members, 5 online</p>
          </div>
        </div>

        <div className='chat-options'>
          <CameraVideo className='icon' />
          <Call className='icon' />
          <MoreCircle className='icon' onClick={() => dispatch(openChatInfo(true))}/>
        </div>
      </ChatInfo>
      
      <ChatContent id='chat-content'>
        <Message className='received'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>ansisarthurdev</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <p className='message'>I should go to sleep...</p>
          </div>
        </Message>

        <Message className='sent'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>You</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <p className='message'>I should go to sleep...</p>
          </div>
        </Message>

        <Message className='sent'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>You</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <p className='message'>I should go to sleep...</p>
          </div>
        </Message>

        <Message className='received'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>ansisarthurdev</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <p className='message'>I should go to sleep...</p>
          </div>
        </Message>

        <Message className='sent'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>You</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <p className='message'>Chat I guess is done, sleep...</p>
          </div>
        </Message>

        <Message className='sent'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>You</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <p className='message'>Sleep sleep sleep</p>
          </div>
        </Message>

        <Message className='received'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>ansisarthurdev</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <p className='message'>images display?</p>
          </div>
        </Message>

        <Message className='sent'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>ansisarthurdev</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <img className='message-image' src='https://images.unsplash.com/photo-1657299143333-4a56a5519651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80' alt=''/>
          </div>
        </Message>

        <motion.div
          initial={{ opacity: 0, duration: 1, delay: 2 }}
          whileInView={{ opacity: 1 }}
        >
        <Message className='received'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>ansisarthurdev</h3>
              <p className='time-sent'>02:21</p>
            </div>

            <img className='message-image' src='https://images.unsplash.com/photo-1664553118375-8dcc9eda394b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80' alt=''/>
          </div>
        </Message>
        </motion.div>
      </ChatContent>

      <ChatMessage>
        <div className='input-box'>
          <input type='text' placeholder='Your message...'/>
        </div>
        
        <div className='icons'>
          <Send className='icon' />
          <FileImage className='icon' />
        </div>
      </ChatMessage>
    </Wrapper>
  )
}

const Message = styled.div`
display: flex;
padding-top: 10px;
max-width: 80%;
margin-bottom: 20px;

:nth-last-child(1){
  margin-bottom: 30vh;
}

@media(min-height: 1000px){
  :nth-last-child(1){
    margin-bottom: 20vh;
  }
}

@media(min-height: 1350px){
  :nth-last-child(1){
    margin-bottom: 15vh;
  }
}

.message-info {
  display: flex;
  align-items: center;

  .sender {
    color: white;
    font-size: .7rem;
    margin-right: 10px;
  }

  .time-sent {
    color: var(--light-grey);
    font-size: .6rem;
  }
}

.message {
  font-size: .8rem;
  color: #c3c3c5;
  background: #35373B;
  padding: 10px;
  margin-top: 10px;
}

.message-image {
  height: 150px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-left: 0;
  position: relative;
  top: 10px;
}

img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 10px;
  user-select: none;
}
`

const ChatContent = styled.div`
border-left: 1px solid var(--light-grey);
border-right: 1px solid var(--light-grey);
padding: 0px 20px;
display: flex;
flex-direction: column;
height: 100%;
position: absolute;
overflow-y: scroll;
width: calc(100% - 42px);

::-webkit-scrollbar {
  display: none;
}

.received {
  .message {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;  
  }
}

.sent {
  align-self: self-end;
  flex-direction: row-reverse;

  .message-info {
    flex-direction: row-reverse;

    .sender {
      margin: 0 0 0 10px;
    }
  }

  img {
    margin: 0 0 0 10px;
  }

  .message {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    background: var(--green);
    color: white;
  }
}
`

const ChatMessage = styled.div`
background: var(--grey);
position: absolute;
bottom: 0;
width: calc(100% - 2px);
display: flex;
justify-content: center;
border-left: 1px solid var(--light-grey);
border-right: 1px solid var(--light-grey);

.icons {
  position: absolute;
  right: 40px;
  top: 32px;  

  .icon {
    width: 18px;
    height: 18px;
    color: var(--green);
    margin-right: 10px;
    cursor: pointer;
    transition: .3s ease-out;

    :hover {
      transform: scale(1.1);
    }
  }
}

.input-box {
  width: 90%;
  margin: 20px 0;
  border-radius: 10px;
  background: #35373B;
  height: 30px;
  padding: 12px 0 6px 0;
}

input {
  width: 85%;
  font-size: .8rem;
  outline: none;
  border: none;
  color: white;
  padding: 0px 15px;
  background: none;
}
`

const ChatInfo = styled.div`
display: flex;
color: white;
background: var(--grey);
border-left: 1px solid var(--light-grey);
border-right: 1px solid var(--light-grey);
padding: 10px 15px;
align-items: center;
justify-content: space-between;

.chat-info {
display: flex;
align-items: center;

.members {
font-size: .7rem;
color: gray;
}
}

.chat-options {
  
  .icon {
    width: 18px;
    height: 18px;
    cursor: pointer;
    color: gray;
    margin-right: 5px;
    transition: .3s ease-out;

    :hover {
      opacity: .7;
      transform: scale(1.1);
    }
  }
}

img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  border-radius: 50%;
}
`

const Wrapper = styled.div`
background: var(--dark-grey);
position: relative;
transition: .3s ease-out;
`

export default ChatBox