import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

//icons
import { CameraVideo } from '@styled-icons/bootstrap/CameraVideo'
import { Call } from '@styled-icons/fluentui-system-regular/Call'
import { MoreCircle } from '@styled-icons/fluentui-system-regular/MoreCircle'
import { Send } from '@styled-icons/boxicons-solid/Send'
import { FileImage } from '@styled-icons/boxicons-solid/FileImage'

//redux
import { openChatInfo, selectChatInfo, selectedChat, selectUser } from '../app/appSlice'
import { useDispatch, useSelector } from 'react-redux'

//firestore
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, doc } from "firebase/firestore"
import { db } from '../app/firebase'
import moment from 'moment'

const ChatBox = () => {

  const dispatch = useDispatch();
  const chatInfoContainerState = useSelector(selectChatInfo);
  const chatInfo = useSelector(selectedChat);
  const user = useSelector(selectUser);

  //chat message input
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const sendMessage = async () => {
    //for groups
    if(message?.length > 0 && chatInfo?.type === 'group'){
      // Add a new document with a generated id.
      await addDoc(collection(db, 'groupChats', chatInfo?.uid, 'messages'), {
        displayName: user?.displayName,
        uid: user?.uid,
        userImage: user?.photoURL,
        message: message,
        messageType: 'text',
        timestamp: serverTimestamp()
      });

      await updateDoc(doc(db, "groupChats", chatInfo?.uid), {lastMessage: message, timestamp: serverTimestamp()});

      setMessage('');
    }
  }

  const getMessages = async () => {
    if(chatInfo?.type === 'group'){
      const unsubscribe = onSnapshot(query(collection(db, 'groupChats', chatInfo?.uid, 'messages'), orderBy('timestamp', 'asc')), (snapshot) => {
        setMessages(snapshot.docs);
      });

      return unsubscribe; 
    }
  }

  //load messages
  useEffect(() => {
    getMessages();

    //eslint-disable-next-line
  }, [chatInfo])

  //send message when enter is pressed too
  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };

    //eslint-disable-next-line
  }, []);

  //scroll down automatically.
  useEffect(() => {
    let chatContent = document.getElementById('chat-content');
    chatContent.scrollTop = chatContent.scrollHeight + 100;
  }, [chatInfo, messages])

  return (
    <Wrapper style={{width: chatInfoContainerState ? '52%' : '72%'}}>
      <ChatInfo>
        <div className='chat-info'> 
          <div style={{marginRight: 10}}>
            {chatInfo?.type === 'group' && <img src={chatInfo?.groupImage} alt='' />}
            
          </div>
          <div>
            {chatInfo?.type === 'group' && <p className='name'>{chatInfo?.name}</p>}
            
            <p className='members'>{chatInfo?.participants?.length} members</p>
          </div>
        </div>

        <div className='chat-options'>
          <CameraVideo className='icon' />
          <Call className='icon' />
          <MoreCircle className='icon' onClick={() => dispatch(openChatInfo(true))}/>
        </div>
      </ChatInfo>
      
      <ChatContent id='chat-content'>
        {/*<Message className='sent'>
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
        </Message>*/}

        {messages?.map(message => (
        <Message className={message?.data().uid === user?.uid ? 'sent' : 'received'}>
          <img src={message?.data().userImage} alt='' className='message-avatar' />
          <div className='message-content'>
            <div className='message-info'>
              <h3 className='sender'>{message?.data().uid === user?.uid ? 'You' : message?.data().displayName}</h3>
              <p className='time-sent'>{moment(new Date(message?.data().timestamp?.toMillis())).fromNow()}</p>
            </div>

            <p className={message?.data().uid === user?.uid ? 'message sent-message' : 'message received-message'}>{message?.data().message}</p>
          </div>
        </Message>
        ))}
      </ChatContent>

      <ChatMessage>
        <div className='input-box'>
          <input type='text' placeholder='Your message...' value={message} onChange={e => setMessage(e.target.value)}/>
        </div>
        
        <div className='icons'>
          <Send className='icon' onClick={() => sendMessage()}/>
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
margin-bottom: 40px;

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
border-right: 1px solid var(--light-grey);
padding: 0px 20px;
display: flex;
flex-direction: column;
height: 100%;
position: absolute;
overflow-y: scroll;
width: calc(100% - 41px);

::-webkit-scrollbar {
  display: none;
}

.received {
  .message {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;  
    left: 60px;
    display: inline-block;
    max-width: 80%;
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
    display: inline-block;
    position: absolute;
    right: 60px;
    max-width: 80%;
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
  margin-right: 2%;

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