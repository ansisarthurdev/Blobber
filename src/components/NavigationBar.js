import React, { useState, useRef } from 'react'
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

//firebase
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectUserData, updateUser, setUserData } from '../app/appSlice'
import { auth, db, storage } from '../app/firebase'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadString } from '@firebase/storage'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavigationBar = () => {

  const [settings, openSettings] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userData = useSelector(selectUserData);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userName, setUsername] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();


  const logOut = () => {
    auth.signOut();
    navigate('/');
  }

  const chooseImage = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const profileUpdate = async () => {
    if(userName){
      updateProfile(auth.currentUser, {
        displayName: userName, 
      })

      let updatedUser = {...user, displayName: userName};
      dispatch(updateUser(updatedUser));

      let updatedUserData = {...userData, userDisplayName: userName};
      dispatch(setUserData(updatedUserData));

      const docRef = doc(db, 'users', user?.uid);

      await updateDoc(docRef, {
        userDisplayName: userName
      });

      toast('✅ Username updated!', {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        autoClose: 2000
      });

      setSelectedOption(null);
    }

    //update user redux

    if(selectedFile !== null){
      const docRef = doc(db, 'users', user?.uid);
      const notify = toast.loading("Uploading user profile image...", {theme: 'dark'});
      const imageRef = ref(storage, `users/${user?.uid}/profileImage`);

      await uploadString(imageRef, selectedFile, 'data_url').then(async snapshot => {
        const downloadURL = await getDownloadURL(imageRef);
        
        await updateDoc(docRef, {
          userImage: downloadURL
        });

        updateProfile(auth.currentUser, {
          photoURL: downloadURL, 
        })

        let updatedUser = {...user, photoURL: downloadURL};
        dispatch(updateUser(updatedUser));
  
        let updatedUserData = {...userData, userImage: downloadURL};
        dispatch(setUserData(updatedUserData));

        toast.update(notify, { render: "User image updated!", type: "success", isLoading: false, theme: 'dark', autoClose: 3000 });
      }).catch(error => console.log(error))
      
      setSelectedFile(null);
      openSettings(false);
      setSelectedOption(null);
    }
  }

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
            <img alt='' src={user?.photoURL}/>
          </UserAvatar>

          {settings && 
          <>
          <BackgroundFader />
          <ModalSettings>
            <h3>Settings</h3>
            <div style={{display: 'flex', padding: 20}}>
            <div className='bar' onClick={logOut}><LogOut className='icon' />Logout</div>
            <div className='bar' style={{background: selectedOption === 'edit-profile' && 'var(--light-grey)'}}  onClick={() => setSelectedOption('edit-profile')}><Profile className='icon' />Edit Profile</div>
            </div>
            
            {selectedOption === 'edit-profile' && <>
              <div className='edit-profile-options'>
                <img src={selectedFile ? selectedFile : user?.photoURL} alt='' onClick={() => filePickerRef.current.click()}/>
                <input type='file' ref={filePickerRef} onChange={chooseImage} hidden />
                <p>Click on your user image, if you want to update it!</p>

                <div className='input-container'>
                  <input type='text' placeholder={user?.displayName} value={userName} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className='creation-button' onClick={() => profileUpdate()}>Save</div>
              </div>
            </>}

            <CloseOutline className='icon-close' onClick={() => openSettings(false)}/>
          </ModalSettings>
          </>
          }
          
        </div>
      </div>

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
padding: 20px;

.edit-profile-options {

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid transparent;
    transition: .3s ease-out;
    cursor: pointer;

    :hover {
      transform: scale(1.2);
      border-color: var(--green);
    }
  }

  p {
    margin: 20px;
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
}

.creation-button {
    margin-top: 10px;
    font-size: .8rem;
    cursor: pointer;
    transition: .3s ease-out;
    padding: 10px;
    user-select: none;

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
  object-fit: cover;
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