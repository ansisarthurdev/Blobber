import React from 'react'

//components
import ChatApp from './pages/ChatApp'

//redux
import { Provider } from 'react-redux'
import { store } from './app/store'

const App = () => {
  return (
    <Provider store={store}>
      <ChatApp />
    </Provider>
  )
}

export default App