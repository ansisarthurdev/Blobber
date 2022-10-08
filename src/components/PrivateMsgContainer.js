import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import moment from 'moment'
import { selectUser } from '../app/appSlice'
import { useSelector } from 'react-redux'

//firebase
import { doc, getDoc } from "firebase/firestore";
import db from '../app/appSlice'

const PrivateMsgContainer = ({ data }) => {

    const user = useSelector(selectUser);
    const [filteredData, setFilteredData] = useState([]);

    //get the opposite user in private chat
    const filterData = () => {
        data.forEach(single => {
            const participant = single.data().participants.filter(participant => participant !== user?.uid);
            console.log(participant)
            const docRef = doc(db, "users", participant);
            const docSnap = getDoc(docRef);
        })
    }

    useEffect(() => {
        if(data){
            filterData();
        }

        //eslint-disable-next-line
    }, [data])

  return (
    <Wrapper className='messages-container'>
        {data?.map(group => (
        <Message key={group?.data().uid}>
        <div className='left'>
            <img src={group?.data().groupImage} alt=''/>
        </div>
        
        <div className='right'>
            <div className='msg-top'>
            <h3 className='msg-user'>{group?.data().name}</h3>
            {group?.data().timestamp && <p className='msg-time'>{moment(new Date(group?.data().timestamp?.toMillis())).format("h:mm a")}</p>}
            </div>
            <div className='msg-bottom'>
            {group?.data().lastMessage ? <p className='msg-preview'>{group?.data().lastMessage}</p> : <p className='msg-preview'>Empty conversation</p>}
            </div>
        </div>
        </Message> 
        ))
        }      
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Message = styled.div`
display: flex;
cursor: pointer;
padding: 10px 16px 5px;

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

export default PrivateMsgContainer