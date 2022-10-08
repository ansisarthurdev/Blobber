import React, { useState, useEffect} from 'react'
import styled from 'styled-components'

import { useParams, useNavigate, Link } from 'react-router-dom'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../app/firebase'

//components
import Loader from '../components/Loader'

//redux
import { useSelector } from 'react-redux'
import { selectUser } from '../app/appSlice'

const Invite = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const [inviteInfo, setInviteInfo] = useState([]);
    const [userInGroup, setUserInGroup] = useState('');

    const getInviteInfo = async () => {
        const docRef = doc(db, 'groupChats', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setInviteInfo(docSnap.data());
        } else {
            navigate('/');
        }
    }

    //check if user is in the group already
    const checkUserData = () => {
      let participants = inviteInfo?.participants;
      const isUserInGroup = participants.includes(user?.uid);
      setUserInGroup(isUserInGroup);
    }

    //join the group
    const joinGroup = async () => {
      //add user id in the group doc
      //add group id in the user doc

      const groupRef = doc(db, 'groupChats', id);
      await updateDoc(groupRef, {
        participants: arrayUnion(user?.uid)
      });

      const userRef = doc(db, 'users', user?.uid);
      await updateDoc(userRef, {
        groupChats: arrayUnion(id)
      })

      navigate('/app');
    }
    
    useEffect(() => {
        getInviteInfo();
        //eslint-disable-next-line
    }, [id])

    useEffect(() => {
      if(inviteInfo?.length !== 0 && user !== null){
        //if the user has logged in the app already, check if user is on the group already
        checkUserData();
      }

      //eslint-disable-next-line
    }, [inviteInfo])

  return (
      <div className='invite'>
      {inviteInfo.length === 0 ? <Loader /> : <>
        <Wrapper>
        <h3>You've been invited to join {inviteInfo?.name} group!</h3>
        <img src={inviteInfo?.groupImage} alt='' />
        <div className='modal-content'>
            <p className='description' style={{userSelect: 'none'}}>{inviteInfo?.description ? inviteInfo?.description : 'No description available.'}</p>
            <p className='members'>{inviteInfo?.participants?.length} Members</p>
            {user === null ? <Link to='/'><div className='button'>You need to sign in first!</div></Link> : userInGroup ? <Link to='/app'><div className='button'>You are already in the group. Hop in!</div></Link> : <div className='button' onClick={() => joinGroup()}>Join</div>}
        </div>
      </Wrapper>
      </>}
      </div>
  )
}

const Wrapper = styled.div`
position: absolute;
color: white;
background: #268c61a1;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 100;
width: 80%;
max-width: 500px;
text-align: center;
padding: 20px;

a {
  text-decoration: none;
  color: white;
}

p {
  font-size: .8rem;
}

.members {
  opacity: .7;
}

img {
    width: 52px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    top: -30px;
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
  margin-top: 20px;
}

.button  {
margin-top: 10px;
font-size: .8rem;
cursor: pointer;
transition: .3s ease-out;
padding: 10px;

:hover {
    background: var(--light-grey);
}
}
`

export default Invite