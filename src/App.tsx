/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router'
import { NavBar } from './pages/Nav'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import './App.css'
import { UserContext } from './context/userContext'

function App() {
  const context = useContext(AuthContext)

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App