import React from 'react'
import styled from 'styled-components'

//components


//icons
import { CloseSquareOutline } from '@styled-icons/evaicons-outline/CloseSquareOutline'
import { TextDescription } from '@styled-icons/fluentui-system-regular/TextDescription'
import { Users } from '@styled-icons/heroicons-solid/Users'
import { CameraVideo } from '@styled-icons/bootstrap/CameraVideo'
import { Chat } from '@styled-icons/bootstrap/Chat'
import { FileMedia } from '@styled-icons/octicons/FileMedia'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { openChatInfo, selectChatInfo } from '../app/appSlice'

const ChatInfo = () => {

  const dispatch = useDispatch();
  const chatInfoContainerState = useSelector(selectChatInfo);

  return (
    <Wrapper style={{width: chatInfoContainerState ? '20%' : 0, display: chatInfoContainerState ? 'block' : 'none'}}>
        <ChatInformation>
          <h3>ansisarthurdev hub</h3>
          <CloseSquareOutline onClick={() => dispatch(openChatInfo(false))} className='icon' />
        </ChatInformation>

        <Category><p><TextDescription className='icon' /> DESCRIPTION</p></Category>
        <p className='description'>Blobber developer hub description</p>

        <Category><p><Users className='icon' /> Members (5)</p> <a href='/'>Show All</a></Category>

        <MembersList>
          <div className='member'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' />
              <p>ansisarthurdev</p>
            </div>

            <div>
              <CameraVideo className='icon' />
              <Chat className='icon' />
            </div>
          </div>

          <div className='member'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' />
              <p>ansisarthurdev</p>
            </div>

            <div>
              <CameraVideo className='icon' />
              <Chat className='icon' />
            </div>
          </div>

          <div className='member'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' />
              <p>ansisarthurdev</p>
            </div>

            <div>
              <CameraVideo className='icon' />
              <Chat className='icon' />
            </div>
          </div>

          <div className='member'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU' alt='' />
              <p>ansisarthurdev</p>
            </div>

            <div>
              <CameraVideo className='icon' />
              <Chat className='icon' />
            </div>
          </div>
        </MembersList>

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
    </Wrapper>
  )
}

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
`

export default ChatInfo