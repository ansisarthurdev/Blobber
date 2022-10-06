import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

//icons
import { CloseSquareOutline } from '@styled-icons/evaicons-outline/CloseSquareOutline'
import { TextDescription } from '@styled-icons/fluentui-system-regular/TextDescription'
import { Users } from '@styled-icons/heroicons-solid/Users'
import { CameraVideo } from '@styled-icons/bootstrap/CameraVideo'
import { Chat } from '@styled-icons/bootstrap/Chat'
import { FileMedia } from '@styled-icons/octicons/FileMedia'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { openChatInfo, selectChatInfo, selectedChat, selectUserData } from '../app/appSlice'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../app/firebase'

const ChatInfo = () => {

  const dispatch = useDispatch();
  const chatInfoContainerState = useSelector(selectChatInfo);
  const chat = useSelector(selectedChat);
  const userData = useSelector(selectUserData);

  const [description, setDescription] = useState('');
  const [descriptionModal, openDescriptionModal] = useState(false);

  const [members, setMembers] = useState([]);

  const [inviteUserModal, openInviteUserModal] = useState(false);

  const updateGroup = async () => {
    const docRef = doc(db, 'groupChats', chat?.uid);
    await updateDoc(docRef, {
      description: description
    });

    openDescriptionModal(false);
  }

  const getMembers = async () => {
    setMembers([]);

    for(let i=0; i < chat?.participants?.length; i++){
      const docRef = doc(db, 'users', chat?.participants[i]);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMembers(prev => [...prev, docSnap.data()])
      } else {
        console.log("No such document!");
      }
    }
  }

  useEffect(() => {
    //set description. we are doing this way, because on chat creation description is not set.
    setDescription(chat?.description);

    chat && getMembers();
    //eslint-disable-next-line
  }, [chat])

  return (
    <Wrapper style={{width: chatInfoContainerState ? '20%' : 0, display: chatInfoContainerState ? 'block' : 'none'}}>
        <ChatInformation>
          <h3>{chat?.name}</h3>
          <CloseSquareOutline onClick={() => dispatch(openChatInfo(false))} className='icon' />
        </ChatInformation>

        <Category><p><TextDescription className='icon' />DESCRIPTION</p></Category>
        <p className='description'>{description ? description : 'No description available.'}</p>
        {chat?.admins === userData?.uid && <div className='button' onClick={() => openDescriptionModal(true)}>Edit Group</div>}

        <Category><p><Users className='icon' /> Members ({chat?.participants?.length})</p> <a href='/'>Show All</a></Category>

        <MembersList>
          {members?.map(member => (
            <div className='member'>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={member?.userImage} alt='' />
                <p>{member?.userDisplayName}</p>
              </div>

              <div>
                <CameraVideo className='icon' />
                <Chat className='icon' />
              </div>
            </div>
          ))}
        </MembersList>

        <div className='button' onClick={() => { openInviteUserModal(true);}}>Invite</div>

        <Category><p><FileMedia className='icon' /> Media (6)</p> <a href='/'>Show All</a></Category>

        <MediaList>
          <p className='images-left'>10+</p>
          <img src='https://images.unsplash.com/photo-1664566486105-e12113484784?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80' alt='' />
          <img src='https://images.unsplash.com/photo-1664539545134-7017e0173232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' alt='' />
          <img src='https://images.unsplash.com/photo-1657299156261-4ce1d0a2cf5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' alt='' />
          <img src='https://images.unsplash.com/photo-1664566486105-e12113484784?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80' alt='' />
          <img src='https://images.unsplash.com/photo-1664539545134-7017e0173232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' alt='' />
          <img src='https://images.unsplash.com/photo-1657299156261-4ce1d0a2cf5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' alt='' />
        </MediaList>


        {/* Modals */}
        {descriptionModal &&
          <>
          <BackgroundFader />
          <ModalDescription>
            <h3>Edit group</h3>

            <div className='modal-content'>
              {chat?.type === 'group' && <img src={chat?.groupImage} alt='' />}
              <div className='input-container'>
                <input type='text' placeholder={description ? description : `${chat?.name} description`} value={description} onChange={e => setDescription(e.target.value)} />
              </div>
                <div className='creation-button' onClick={() => updateGroup()}>Edit</div>
            </div>

            <CloseOutline className='icon-close' onClick={() => openDescriptionModal(false)}/>
          </ModalDescription>
          </>
          }

        {inviteUserModal &&
          <>
          <BackgroundFader />
          <ModalDescription>
            <h3>Invite more people to {chat?.name} group!</h3>

            <div className='modal-content'>
              {chat?.type === 'group' && <img src={chat?.groupImage} alt='' style={{userSelect: 'none'}}/>}
              <p className='link'>localhost:3000/invite/{chat?.uid}</p>
              <p style={{userSelect: 'none'}}>Send this link to your friends to join the group conversation!</p>
            </div>

            <CloseOutline className='icon-close' onClick={() => openInviteUserModal(false)}/>
          </ModalDescription>
          </>
          }
    </Wrapper>
  )
}

const ModalDescription = styled.div`
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

.link {
  background: var(--green);
  padding: 10px;
}

img {
  width: 50px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 50%;  
  transform: translateX(-50%);
}

.icon-close {
  width: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.icon {
  width: 24px;
  margin-right: 10px;
}

h3 {
  padding: 0px 20px 20px 20px;
  margin-top: 20px;
  user-select: none;
}

.modal-content {
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

const MediaList = styled.div`
padding: 0 20px;
display: flex;
flex-wrap: wrap;
gap: 5px;
position: relative;

p {
  color: white;
  position: absolute;
  bottom: 24px;
  right: 40px;
  z-index: 100;
  text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
  user-select: none;
}

img {
  display: flex;
  flex: 1;
  min-width: 30%;
  height: 70px;
  object-fit: cover;
  cursor: pointer;
  overflow: hidden;

  :nth-last-child(1){
    filter: blur(1px);
  }
}
`

const MembersList = styled.div`
padding: 0 20px;

.member {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  p {
    font-size: .8rem;
    color: white;
  }

  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 10px;
  }

  .icon {
    width: 18px;
    color: var(--light-grey);
    transition: .3s ease-out;
    cursor: pointer;

    :hover {
      opacity: .7;
      transform: scale(1.1);
    }

    :nth-child(1){
      margin-right: 10px;
    }
  }
}
`

const Category = styled.h4`
padding: 10px 20px 0 20px;
color: var(--light-grey);
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 0 10px 0;

a {
  color: var(--dark-green);
  font-size: .6rem;
  transition: .3s ease-out;

  :hover {
    opacity: .6;
  }
}

p {
  font-size: .6rem;
}

.icon {
  width: 14px;
  margin-right: 5px;
}


`

const ChatInformation = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;

h3 {
  color: white;
  font-size: .8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
}

.icon {
  width: 24px;
  color: var(--light-grey);
  transition: .3s ease-out;
  cursor: pointer;

  :hover {
    opacity: .7;
    transform: scale(1.1);
  }
}
`

const Wrapper = styled.div`
background: var(--grey);
transition: .3s ease-out;

.description {
  padding: 0 20px;
  font-size: .7rem;
  color: var(--light-grey);
  margin-bottom: 20px;
}

.button  {
  font-size: .7rem;
  background: var(--green);
  margin: 0 10px;
  padding: 10px;
  text-align: center; 
  cursor: pointer;
  transition: .3s ease-out;

  :hover {
    background: var(--light-grey);
    color: white;
  }
}
`

export default ChatInfo