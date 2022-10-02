import React from 'react'
import styled from 'styled-components'

//icons
import { NewMessage } from '@styled-icons/entypo/NewMessage'
import { Search } from '@styled-icons/boxicons-regular/Search'
import { Chat } from '@styled-icons/bootstrap/Chat'

const MessageList = () => {
return (
    <Wrapper>
      <MessageTop>
        <div className='top'>
          <h2 style={{userSelect: 'none'}}>Messages</h2>
          <NewMessage className='icon' />
        </div>

        <div className='bottom'>
          <Search className='icon' />
          <input type='text' placeholder='Search...' />
        </div>
      </MessageTop>

      <MessageBottom>
        <p style={{userSelect: 'none'}}><Chat className='icon'/> ALL MESSAGES</p>

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
    </Wrapper>
  )
}

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
  object-fit: contain;
}
`

const Messages = styled.div`
height: 70%;
position: absolute;

.messages-container {
overflow-y: scroll;
height: 100%;
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
`

export default MessageList