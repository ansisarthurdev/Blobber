import React, { useEffect } from 'react'

//pages
import ChatApp from './pages/ChatApp'
import Landing from './pages/Landing'

//router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//firebase
import { onAuthStateChanged } from "firebase/auth"
import { auth } from './app/firebase'
import { updateUser } from './app/appSlice'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch();

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(updateUser(user))
      } else {
        dispatch(updateUser(null))
      }
    });
  }

  useEffect(() => {
    checkUser();
    //eslint-disable-next-line
  }, [])

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App