/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router'
import { NavBar } from './pages/Nav'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import './App.css'
import ScrollToTop from './pages/ScrollToTop'

function App() {
  //loading in the context so it will trigger logging in as the previous user
  const context = useContext(AuthContext)
  //TODO: context menu for right clicking (on users, and a few things)
  return (
    <div>
      <ScrollToTop />
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App