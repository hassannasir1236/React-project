import { useState } from 'react'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import UsercontextProvider from './context/UsercontextProvider'
function App() {
  return (
    <>
      <UsercontextProvider>
        <Login />
        <Profile />
      </UsercontextProvider>
    </>
  )
}

export default App
