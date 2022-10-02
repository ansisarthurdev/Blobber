import React from 'react'

//pages
import ChatApp from './pages/ChatApp'
import Landing from './pages/Landing'

//redux
import { Provider } from 'react-redux'
import { store } from './app/store'

//router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App