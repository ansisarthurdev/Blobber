import React, { useState } from 'react'
import styled from 'styled-components'

//icons
import { HomeHeart } from '@styled-icons/boxicons-regular/HomeHeart'
import { VideoChat } from '@styled-icons/fluentui-system-regular/VideoChat'
import { Calendar } from '@styled-icons/bootstrap/Calendar'
import { Chat } from '@styled-icons/bootstrap/Chat'
import { People } from '@styled-icons/bootstrap/People'
import { BellOutline } from '@styled-icons/evaicons-outline/BellOutline'
import { SettingsOutline } from '@styled-icons/evaicons-outline/SettingsOutline'
import { LogOut } from '@styled-icons/ionicons-outline/LogOut'
import { Profile } from '@styled-icons/icomoon/Profile'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

const NavigationBar = () => {

  const [settings, openSettings] = useState(false);

  return (
    <Wrapper>
      <h3 className='logo'>blobber.</h3>

      <div className='navigation'>
        <div className='navigation-top'>
          <NavigationItem>
            <div className='active-bar active' />
            <HomeHeart className='icon active'/>
          </NavigationItem>

          <NavigationItem>
            <div className='active-bar' />
            <VideoChat className='icon'/>
          </NavigationItem>

          <NavigationItem>
            <div className='active-bar' />
            <Calendar className='icon'/>
          </NavigationItem>

          <NavigationItem>
            <div className='active-bar' />
            <Chat className='icon'/>
          </NavigationItem>

          <NavigationItem>
            <div className='active-bar' />
            <People className='icon'/>
          </NavigationItem>
        </div>

        <div className='navigation-bottom'>      
          <NavigationItem>
            <div className='active-bar' />
            <BellOutline className='icon'/>
          </NavigationItem>

          <NavigationItem onClick={() => openSettings(true)}>
            <div className='active-bar' />
            <SettingsOutline className='icon'/>
          </NavigationItem>

          <UserAvatar>
            <img alt='' src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKpiFXNibuHIcJpUpot_YgS55ywsPHhSiEA&usqp=CAU`}/>
          </UserAvatar>

          {settings && 
          <>
          <BackgroundFader />
          <ModalSettings>
            <h3>Settings</h3>
            <div style={{display: 'flex', padding: 20}}>
            <div className='bar'><LogOut className='icon' />Logout</div>
            <div className='bar'><Profile className='icon' />Edit Profile</div>
            </div>

            <CloseOutline className='icon-close' onClick={() => openSettings(false)}/>
          </ModalSettings>
          </>
          }
          
        </div>
      </div>
    </Wrapper>
  )
}

const BackgroundFader = styled.div`
position: absolute;
z-index: 90;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #1b1b1b80;
`

const ModalSettings = styled.div`
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
  padding: 20px;
}
`

const UserAvatar = styled.div`
width: 80%;
margin: 0 auto;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
padding-top: 20px;
border-top: 2px solid var(--grey);

img {
  height: 24px;
  width: 24px;
  object-fit: contain;
  border-radius: 5px;
}
`

const NavigationItem = styled.div`
cursor: pointer;
width: 100%;
text-align: center;
padding: 10px 0;
position: relative;
margin-bottom: 1rem;
transition: .3s ease-out;
position: relative;

:hover {
  background: #268c6126;

  .active-bar {
    opacity: 1;
  }
}

.icon {
  color: var(--light-grey);
  width: 16px;
}

.active-bar {
  height: 100%;
  width: 4px;
  background: var(--green);
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: .3s ease-out;
}

.active {
  opacity: 1;
  color: var(--green);
}
`

const Wrapper = styled.div`
width: 8%;
min-width: 100px;
background: var(--dark-grey);
height: 100vh;

.navigation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
}

.logo {
  color: white;
  font-size: .9rem;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
`

export default NavigationBar