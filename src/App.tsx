/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router'
import { NavBar } from './pages/Nav'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import './App.css'
import { UserContext } from './context/userContext'

function App() {
  const context = useContext(AuthContext)
  //TODO: context menu for right clicking (on users, and a few things)
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App