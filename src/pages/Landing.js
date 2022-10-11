import React, { useState } from 'react'
import styled from 'styled-components'

import { Link, useNavigate } from 'react-router-dom'

import Lottie from "lottie-react"
import chat from "../animation/chat.json"

//icons
import { ChatDots } from '@styled-icons/bootstrap/ChatDots'
import { Document } from '@styled-icons/fluentui-system-filled/Document'
import { Cloud } from '@styled-icons/bootstrap/Cloud'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import { Google } from '@styled-icons/boxicons-logos/Google'

//firebase
import { useSelector } from 'react-redux'
import { selectUser } from '../app/appSlice'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, db } from '../app/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"

const Landing = () => {
    
    const [popup, setPopup] = useState(false);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const popUpHook = () => {

        const html = document.querySelector('html');

        if(!popup){
            html.style.overflow = 'hidden';
            setPopup(true);
        } else {
            html.style.overflowY = 'scroll';
            setPopup(false);
        }
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
    
          //check if user exists, if not - add to db
          const docRef = doc(db, 'users', user?.uid);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            navigate('/app');
          } else {
            setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              email: user.email,
              userDisplayName: user.displayName,
              userImage: user.photoURL,
            });
            navigate('/app');
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
        });
      }

    return(
        <Wrapper>
            <div className='gradient' />

            <Navigation>
                <div className='nav-left'>
                    <h3>blobber.</h3>

                    <div className='navigation-desktop'>
                        <Link to='/'>Product</Link>
                        <Link to='/'>Pricing</Link>
                        <Link to='/'>Downloads</Link>
                        <Link to='/'>Contact</Link>
                    </div>
                </div>

                <div className='nav-right'>
                    {user ? <Link to='/app' className='log-sgn-btn'>Chat</Link> : <div className='log-sgn-btn' onClick={popUpHook}>Login / Signup</div>}
                </div>
            </Navigation>

            <Welcome>
                <div className='welcome-txt'>
                    <h3>Connect with your mates easily</h3>
                    <p>Chat is a communication application between friends, family and team at the same time wrapped in one user-friendly application</p>

                    <div className='welcome-btns'>
                        <Link to='/' className='welcome-btn'>Learn More</Link>
                        <div className='welcome-btn'>Try it now</div>
                    </div>
                </div>

                <div className='welcome-ani'>
                    <Lottie className='chat-animation' animationData={chat} loop={true} />
                </div>
            </Welcome>
            
            <div className='preview'>
                <AppPreview />
                <img src='/images/preview.png' alt='' />
            </div>
            

            <Motivation>
                <h3>WHY BLOBBER</h3>
                <p>Some of our feature to help your communication</p>

                <div className='motivation-boxes'>
                    <div className='box'>
                        <div className='icon-box'>
                            <ChatDots className='icon' />
                        </div>  
                        <h3>Team Messages</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        <Link to='/'>Learn More</Link>
                    </div>

                    <div className='box'>
                        <div className='icon-box'>
                            <Document className='icon' />
                        </div>  
                        <h3>File Management System</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        <Link to='/'>Learn More</Link>
                    </div>

                    <div className='box'>
                        <div className='icon-box'>
                            <Cloud className='icon' />
                        </div>  
                        <h3>Light and Dark Mode</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        <Link to='/'>Learn More</Link>
                    </div>
                </div>
            </Motivation>


            {popup && 
                <>
                <BackgroundFader />
                <ModalPopup>
                    <h3>Continue with </h3>
                    <div style={{display: 'flex', padding: 20}}>
                    <div className='bar' onClick={signInWithGoogle}><Google className='icon' />Google</div>
                    </div>

                    <CloseOutline className='icon-close' onClick={popUpHook} />
                </ModalPopup>
                </>
            }
            
        </Wrapper>
    )
}

const ModalPopup = styled.div`
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

.bar {
  width: 100%;
  transition: .3s ease-out;
  background: transparent;
  cursor: pointer;
  padding: 10px;

  :hover {
    background: var(--light-grey);
  }
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
  padding: 20px;
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

const Motivation = styled.div`
margin: 120px 0 0 0;
text-align: center;

.motivation-boxes {
    display: flex;
    flex-wrap: wrap;    
    justify-content: center;
    gap: 20px;

    .box {
        max-width: 25%;
        min-width: 200px;
        background: #1f1f1f;
        position: relative;
        padding: 0 20px 20px 20px;
        margin-bottom: 30px;
        user-select: none;

        @media(max-width: 600px){
            max-width: 90%;
        }

        a {
            color: var(--dark-green);
            text-decoration: none;
            font-size: .9rem;
            font-weight: bold;
        }

        h3 {
            padding-top: 40px;
        }

        p {
            font-size: .8rem;
            margin: 10px 0;
        }

        .icon-box {
            padding: 15px;
            background: var(--light-grey);
            display: inline-block;
            position: absolute;
            top: -25px;
            left: 20px;
            border-radius: 10px;

            .icon {
                width: 26px;
                color: white;   
            }
        }
    }
}

h3 {
    color: var(--green);
}

p {
    color: white;
    font-size: 1.4rem;
    margin: 10px 0 60px;
    font-weight: bold;
}
`

const Welcome = styled.div`
display: flex;
justify-content: space-between;
margin-top: 50px;

@media(max-width: 850px){
    margin-bottom: 20px;
}

@media(max-width: 720px){
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 40px;
}

.welcome-ani {
    position: relative;
    width: 500px;
    bottom: 10px;
    left: 30px;

    @media(max-width: 720px){
        display: none;
    }
}

.welcome-txt {
    width: 60%;
    color: white;

    @media(max-width: 720px){
        width: 100%;
    }

    h3 {
        font-size: 2.4rem;
    }

    p {
        font-size: .8rem;
        margin: 20px 0 3vw 0;
    }

    .welcome-btns {
        display: flex;

        @media(max-width: 720px){
            justify-content: center;
            margin-top: 40px;
        }

        a {
            margin-right: 20px;
            text-decoration: none;
            color: white;
        }

        .welcome-btn {
            border: 1px solid white;
            border-radius: 10px;
            padding: 10px 25px;
            font-size: .9rem;
            cursor: pointer;
            transition: .3s ease-out;
            min-width: 50px;

            :nth-child(1){
                :hover {
                    background: var(--light-grey);
                }
            }

            :nth-child(2){
                background: var(--green);
                border: 1px solid transparent;

                :hover {
                    background: #268c6180;
                }
            }
        }
    }
}
`

const Navigation = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px 0;

.nav-left {
    display: flex;
    align-items: center;

    h3 {
        margin-right: 20%;
        color: white;
        user-select: none;
    }

    .navigation-desktop {

        display: block;
        
        @media(max-width: 690px){
            display: none;
        }

        a {
            color: white;
            margin-right: 20px;
            text-decoration: none;
            font-size: .8rem;
            transition: .3s ease-out;

            :nth-last-child(1){
                margin-right: 0;
            }

            :hover {
                opacity: .7;
            }
        }
    }
}

.nav-right {

    @media(max-width: 900px){
        display: none;
    }

a {
    text-decoration: none;
}

.log-sgn-btn {
    color: white;
    font-size: .9rem;
    border: 1px solid white;
    border-radius: 10px;    
    padding: 10px 15px; 
    cursor: pointer;
    transition: .3s ease-out;

    :hover {
        background: var(--green);
    }
}
}
`

const AppPreview = styled.div`
background: url('/images/background.jpg');
width: 90%;
height: 40vw;
max-height: 600px;
margin: 0 auto;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

@media(max-width: 990px){
width: 100%;        
}
`

const Wrapper = styled.div`
max-width: 1440px;
margin: 0 auto;
padding: 0 5%;
overflow: hidden;

.gradient {
    max-width: 1920px;
    width: 100%;
    height: 600px;
    position: absolute;
    top: -110px;
    z-index: -1;
    object-fit: cover;
    left: 50%;
    transform: translateX(-50%);
    background: url('./images/gradient.svg');
    background-position: center;
    background-size: cover;
}

.preview {
    position: relative;

    img {
        width: 85%;
        height: 40vw;
        max-height: 600px;
        position: absolute;
        top: 30px;
        border-radius: 10px;
        left: 50%;
        transform: translateX(-50%);

        @media(max-width: 990px){
        width: 95%;        
        }
    }
}
`

export default Landing