import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

//icons
import { CloseSquareOutline } from '@styled-icons/evaicons-outline/CloseSquareOutline'
import { TextDescription } from '@styled-icons/fluentui-system-regular/TextDescription'
import { Users } from '@styled-icons/heroicons-solid/Users'
import { CameraVideo } from '@styled-icons/bootstrap/CameraVideo'
import { Chat } from '@styled-icons/bootstrap/Chat'
import { FileMedia } from '@styled-icons/octicons/FileMedia'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

//redux - firebase
import { useDispatch, useSelector } from 'react-redux'
import { openChatInfo, selectChatInfo, selectedChat, selectUserData, setSelectedChat } from '../app/appSlice'
import { collection, doc, updateDoc, query, where, onSnapshot, getDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
import { db, storage } from '../app/firebase'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatInfo = () => {

  const dispatch = useDispatch();
  const chatInfoContainerState = useSelector(selectChatInfo);
  const chat = useSelector(selectedChat);
  const userData = useSelector(selectUserData);

  const [description, setDescription] = useState('');
  const [descriptionModal, openDescriptionModal] = useState(false);

  const [members, setMembers] = useState([]);

  const [inviteUserModal, openInviteUserModal] = useState(false);

  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [media, setMedia] = useState([]);

  const chooseImage = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const updateGroup = async () => {
      const docRef = doc(db, 'groupChats', chat?.uid);

      await updateDoc(docRef, {
        description: description
      });

      toast('✅ Description updated', {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        autoClose: 2000
      });

      if(selectedFile !== null){
        const notify = toast.loading("Uploading group image...", {theme: 'dark'});
        const imageRef = ref(storage, `groupChats/${chat?.uid}/groupChatImage`);
  
        await uploadString(imageRef, selectedFile, 'data_url').then(async snapshot => {
          const downloadURL = await getDownloadURL(imageRef);
          
          await updateDoc(docRef, {
            groupImage: downloadURL
          });

          let chatUpdated = {...chat, groupImage: downloadURL};
          dispatch(setSelectedChat(chatUpdated))

          toast.update(notify, { render: "Group image updated!", type: "success", isLoading: false, theme: 'dark', autoClose: 3000 });
        }).catch(error => console.log(error))
        
        setSelectedFile(null);
        openDescriptionModal(false);
      }
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

  const getMedia = async () => {
    setMedia([]);
    if(chat?.type === 'group'){
      onSnapshot(query(collection(db, 'groupChats', chat?.uid, 'messages'), where("messageType", "==", "image")), (snapshot) => {
        setMedia(snapshot.docs)
      });
    }

    if(chat?.type === 'private'){
      onSnapshot(query(collection(db, 'privateChats', chat?.uid, 'messages'), where("messageType", "==", "image")), (snapshot) => {
        setMedia(snapshot.docs)
      });
    }
  }

  useEffect(() => {
    //set description. we are doing this way, because on chat creation description is not set.
    if(chat?.description){
      setDescription(chat?.description);
    }

    getMedia();

    chat?.type === 'group' && getMembers();
    //eslint-disable-next-line
  }, [chat])

  return (
    <Wrapper style={{width: chatInfoContainerState ? '20%' : 0, display: chatInfoContainerState ? 'block' : 'none'}}>
        <ChatInformation>
          <h3>{chat?.type === 'group' ? chat?.name : 'Chat'}</h3>
          <CloseSquareOutline onClick={() => dispatch(openChatInfo(false))} className='icon' />
        </ChatInformation>

        {chat?.type === 'group' && <>
        <Category><p><TextDescription className='icon' />DESCRIPTION</p></Category>
        <p className='description'>{description ? description : 'No description available.'}</p>
        </>}
        
        {chat?.admins === userData?.uid && <div className='button' onClick={() => openDescriptionModal(true)}>Edit Group</div>}

        {chat?.type==='group' && <><Category><p><Users className='icon' /> Members ({chat?.participants?.length})</p> <div className='more-btn'>Show All</div></Category>

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
        </>}

        <Category><p><FileMedia className='icon' /> Media ({media?.length})</p> <div className='more-btn'>Show All</div></Category>

        <MediaList>
          {media?.length > 6  && <p className='images-left'>6+</p>}
          {media?.map(image => (
            <img key={image?.data().uid} src={image?.data().messageImage} alt='' />
          ))}
        </MediaList>


        {/* Modals */}
        {descriptionModal &&
          <>
          <BackgroundFader />
          <ModalDescription>
            <h3>Edit group</h3>

            <div className='modal-content'>
              {chat?.type === 'group' && <img src={selectedFile ? selectedFile : chat?.groupImage} alt='' onClick={() => filePickerRef.current.click()} />}
              <input type='file' ref={filePickerRef} onChange={chooseImage} hidden />

              <p>Click on group image, if you want to update it.</p>
              <div className='input-container'>
                <input type='text' placeholder={description ? description : `${chat?.name} description`} value={description} onChange={e => setDescription(e.target.value)} />
              </div>
                <div className='creation-button' onClick={() => updateGroup()}>Save</div>
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

          <ToastContainer
          position="bottom-center"
          hideProgressBar={false}
          newestOnTop={false}
          autoClose={3000}
          closeToast
          draggable
          />
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
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 50%;  
  transform: translateX(-50%);
  transition: .3s ease-out;
  cursor: pointer;
  border: 3px solid transparent;

  :hover {
    transform: translateX(-50%) scale(1.2);
    border: 3px solid var(--green);
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
    object-fit: cover;
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

.more-btn {
  color: var(--dark-green);
  font-size: .6rem;
  transition: .3s ease-out;
  cursor: pointer;

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
min-width: 250px;

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