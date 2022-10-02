import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import Lottie from "lottie-react";
import chat from "../animation/chat.json";

//icons
import { ChatDots } from '@styled-icons/bootstrap/ChatDots'
import { Document } from '@styled-icons/fluentui-system-filled/Document'
import { Cloud } from '@styled-icons/bootstrap/Cloud'

const Landing = () => {
    
    return(
        <Wrapper>
            <img src='images/gradient.svg' alt='' style={{width: '1920px', height: '600px', position: 'absolute', top: -110, left: 0, zIndex: -1, objectFit: 'cover', left: '50%', transform: 'translateX(-50%)'}} />
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
                    <div className='log-sgn-btn'>Login / Signup</div>
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

            <AppPreview />

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
            
        </Wrapper>
    )
}

const Motivation = styled.div`
margin: 60px 0 0 0;
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

const AppPreview = styled.div`
background: url('/images/background.jpg');
width: 90%;
height: 500px;
margin: 0 auto;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`


const Welcome = styled.div`
display: flex;
justify-content: space-between;
margin-top: 50px;

.welcome-ani {
    position: relative;
    width: 500px;
    bottom: 10px;
    left: 30px;
}

.welcome-txt {
    width: 60%;
    color: white;

    h3 {
        font-size: 2.4rem;
    }

    p {
        font-size: .8rem;
        margin: 20px 0 3vw 0;
    }

    .welcome-btns {
        display: flex;

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

const Wrapper = styled.div`
max-width: 1440px;
margin: 0 auto;
padding: 0 5%;
`

export default Landing