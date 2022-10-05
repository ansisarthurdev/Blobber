import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

//icons
import { NewMessage } from '@styled-icons/entypo/NewMessage'
import { Search } from '@styled-icons/boxicons-regular/Search'
import { Chat } from '@styled-icons/bootstrap/Chat'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

import { selectUser, selectUserData, setSelectedChat } from '../app/appSlice'
import { useSelector, useDispatch } from 'react-redux'

//firebase
import { collection, addDoc, doc, updateDoc, arrayUnion, serverTimestamp, query, where, getDocs } from "firebase/firestore"
import { db } from '../app/firebase'
import moment from 'moment'


const MessageList = () => {

  const user = useSelector(selectUser);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const [newMsg, openNewMsg] = useState(false); //new conversation modal
  const [chatType, setChatType] = useState(null); //chat type for new conversation
  const [groupChatName, setGroupChatName] = useState(); //group chat name
  const [groupChatsState, setGroupChats] = useState([]); //group chats from firestore

  const closeModalMessage = () => {
    openNewMsg(false);
    setChatType(null);
    setGroupChatName();
  }

  const createGroupChat = async () => {
    if(groupChatName?.length > 4){
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "groupChats"), {
        name: groupChatName,
        participants: [user?.uid],
        groupImage: 'https://previews.123rf.com/images/blasko/blasko1508/blasko150800096/43646532-green-ribbon-letter-b-symbol-logo-design.jpg',
        admins: [user?.uid],
        timestamp: serverTimestamp(),
        type: 'group'
      });

      const groupRef = doc(db, 'groupChats', docRef.id);
      await updateDoc(groupRef, {
        uid: docRef.id
      })

      const userRef = doc(db, 'users', user?.uid);
      await updateDoc(userRef, {
        groupChats: arrayUnion(docRef.id)
      });

      closeModalMessage();
    }
  }

  const getChats = async () => {
    //get group chats
    if(userData?.groupChats){
      setGroupChats([]);
      /*const groupChats = Object.values(userData?.groupChats);

      for(let i=0; i < groupChats.length; i++){
        const unsub = onSnapshot(doc(db, 'groupChats', groupChats[i]), (doc) => {
          setGroupChats(prev => [...prev, doc.data()])
        });

        if(i === groupChats?.length){
          return unsub;
        }
      }*/

      const q = query(collection(db, 'groupChats'), where("participants", "array-contains", user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setGroupChats(prev => [...prev, doc.data()]);
      });
    }
  }

  const openChat = (group) => {
    dispatch(setSelectedChat(group))
  }

  useEffect(() => {
    if(userData){
      getChats();
    }

    //eslint-disable-next-line
  }, [userData, ])

  return (
    <Wrapper>
      <MessageTop>
        <div className='top'>
          <h2 style={{userSelect: 'none'}}>Messages</h2>
          <NewMessage className='icon' onClick={() => openNewMsg(true)} />
        </div>

        <div className='bottom'>
          <Search className='icon' />
          <input type='text' placeholder='Search...' />
        </div>
      </MessageTop>

      {/* for new users */}
      {!userData?.groupChats && !userData?.privateChats && <>
        <MessageBottom>
        <p style={{userSelect: 'none'}}><Chat className='icon'/> Welcome To blobber</p>

        <Messages>
          <div className='messages-container'>
          <Message>
            <div className='left'>
              <img src='https://previews.123rf.com/images/blasko/blasko1508/blasko150800096/43646532-green-ribbon-letter-b-symbol-logo-design.jpg' alt=''/>
            </div>
            
            <div className='right'>
              <div className='msg-top'>
                <h3 className='msg-user'>blobber developer</h3>
              </div>
              <div className='msg-bottom'>
                <p className='msg-preview'>Great to see you!</p>
              </div>
            </div>
          </Message>                      
          </div>
        </Messages>
        </MessageBottom>
      </>}


      {/* If user has group chats but not private chats */}
      {userData?.groupChats && !userData?.privateChats && <>
        <MessageBottom style={{height: '80%'}}>
        <p style={{userSelect: 'none'}}><Chat className='icon'/> Group Messages</p>

        <Messages>
          <div className='messages-container'>
          {groupChatsState?.map(group => (
            <Message key={group?.uid} onClick={() => openChat(group)}>
            <div className='left'>
              <img src={group?.groupImage} alt=''/>
            </div>
            
            <div className='right'>
              <div className='msg-top'>
                <h3 className='msg-user'>{group?.name}</h3>
                {group?.lastMessage && <p className='msg-time'>{moment(new Date(group?.timestamp?.toMillis())).format("h:mm a")}</p>}
              </div>
              <div className='msg-bottom'>
                {group?.lastMessage ? <p className='msg-preview'>{group?.lastMessage}</p> : <p className='msg-preview'>Empty conversation</p>}
              </div>
            </div>
            </Message> 
          ))
          }                    
          </div>
        </Messages>
        </MessageBottom>
      </>}

      {/* If user has private chats but not group messages */}
      {!userData?.groupChats && userData?.privateChats && <>
        <MessageBottom>
        <p style={{userSelect: 'none'}}><Chat className='icon'/> Private Chats</p>

        <Messages>
          <div className='messages-container'>
          <Message>
            <div className='left'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt=''/>
            </div>
            
            <div className='right'>
              <div className='msg-top'>
                <h3 className='msg-user'>ansisarthurfsdlkjfslkdjfskljdfds</h3>
                <p className='msg-time'>21:39</p>
              </div>
              <div className='msg-bottom'>
                <p className='msg-preview'>fdsssssssfasdfdfsdfsdfsdfsdfsfsdfds</p>
              </div>
            </div>
          </Message>                      
          </div>
        </Messages>
        </MessageBottom>
      </>}
      
      {/* If user has both */}
      {userData?.groupChats && userData?.privateChats && <>
        <MessageBottom>
        <p style={{userSelect: 'none'}}><Chat className='icon'/> Private Messages</p>

        <Messages>
          <div className='messages-container'>
          <Message>
            <div className='left'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt=''/>
            </div>
            
            <div className='right'>
              <div className='msg-top'>
                <h3 className='msg-user'>ansisarthurfsdlkjfslkdjfskljdfds</h3>
                <p className='msg-time'>21:39</p>
              </div>
              <div className='msg-bottom'>
                <p className='msg-preview'>fdsssssssfasdfdfsdfsdfsdfsdfsfsdfds</p>
              </div>
            </div>
          </Message>                      
          </div>
        </Messages>
        </MessageBottom>
      </>}

      {newMsg && 
          <>
          <BackgroundFader />
          <ModalMessage>
            <h3>New Message</h3>
            <div style={{display: 'flex', padding: 20}}>
            <div className='bar' style={{background: chatType === 'private' && 'var(--light-grey)'}} onClick={() => setChatType('private')}>Private Chat</div>
            <div className='bar' style={{background: chatType === 'group' && 'var(--light-grey)'}} onClick={() => setChatType('group')}>Group Chat</div>
            </div>

            {chatType !== null && <>
            <div className='chat-creation'>
              {chatType === 'group' && <p>Group name should be at least 5 characters.</p>}
              <div className='input-container'>
                {chatType === 'group' && <input type='text' placeholder='Type your group name' name={groupChatName} onChange={e => setGroupChatName(e.target.value)}/>}
                {chatType === 'private' && <input type='text' placeholder='Search user' />}
              </div>
                
                {chatType === 'group' && <div className='creation-button' onClick={() => createGroupChat()}>Create</div>}

            </div>
            </>}

            <CloseOutline className='icon-close' onClick={() => closeModalMessage()}/>
          </ModalMessage>
          </>
          }
    </Wrapper>
  )
}

const ModalMessage = styled.div`
position: absolute;
color: white;
background: var(--grey);
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 100;
width: 80%;
max-width: 500px;
text-align: center;
padding: 20px;

.icon-close {
  width: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.bar {
  width: 50%;
  transition: .3s ease-out;
  background: transparent;
  cursor: pointer;
  padding: 10px;

  :hover {
    background: var(--light-grey);
  }
}

.icon {
  width: 24px;
  margin-right: 10px;
}

h3 {
  padding: 0px 20px 20px 20px;
}

.chat-creation {
  p {
    margin-bottom: 10px;
    font-size: .7rem;
    color: lightgray;
  }

  .input-container {
    width: 100%;
    background: #35373B;

    input {
      width: 100%;
      background: none;
      border: none;
      outline: none;
      padding: 10px;
      font-size: .8rem;
      color: white;

      ::placeholder {
        color: var(--light-grey);
        font-size: .7rem;
      }
    }
  }

  .creation-button {
    margin-top: 10px;
    font-size: .8rem;
    cursor: pointer;
    transition: .3s ease-out;
    padding: 10px;

    :hover {
      background: var(--light-grey);
    }
  }
}
`

const BackgroundFader = styled.div`
position: absolute;
z-index: 90;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #1b1b1b80;
`

const Message = styled.div`
display: flex;
cursor: pointer;
padding: 10px 20px 5px;

:hover {
  background: var(--dark-grey);
}

.right {

  .msg-bottom {

    .msg-preview {
      padding: 0;
      margin: 0;
      padding-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 180px;
      color: #c3c3c5;
    }
  }

  .msg-top {
    display: flex;
    justify-content: space-between;

    .msg-user {
      margin: 0;
      padding: 0;
      font-size: .7rem;
      padding-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 140px;
      color: white;
    }

    .msg-time {
      padding: 0;
      margin: 0;
    }
  }
}

img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
`

const Messages = styled.div`
height: 70%;
position: absolute;

.messages-container {
overflow-y: scroll;
height: 100%;

::-webkit-scrollbar {
  display: none;
}

}

::-webkit-scrollbar {
  display: none;
}
`

const MessageBottom = styled.div`
height: 80%;

p {
  color: white;
  display: flex;
  font-size: .7rem;
  padding: 20px;

  .icon {margin-right: 10px;}
}

.icon {
  width: 16px;
}
`

const MessageTop = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center;

.top {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;

.icon {
  transition: .3s ease-out;

  :hover {
    opacity: .7;
    transform: scale(1.1);
  }
}
}

.bottom {
background: #35373B;
position: relative;
border-radius: 5px;

input {
  background: none;
  border: none;
  width: 80%;
  outline: none;
  padding: 6px 12px 6px 24px;
  font-size: .8rem;
  color: var(--light-grey);

  ::placeholder {
    color: var(--light-grey);
    font-size: .7rem;
  }
}

.icon {
  position: absolute;
  color: var(--light-grey);
  top: 4px;
  left: 3px;
}
}

h2 {
  color: white;
  font-size: 1.4rem;
}

.icon {
  width: 20px;
  color: var(--dark-green);
  cursor: pointer;
}
`

const Wrapper = styled.div`
width: 20%;
min-width: 260px;
background: var(--grey);
border-right: 1px solid var(--light-grey);
`

export default MessageList