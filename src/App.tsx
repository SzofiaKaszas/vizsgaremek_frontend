import { Outlet } from 'react-router'
import { NavBar } from './pages/Nav'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import './App.css'

function App() {
  const context = useContext(AuthContext)
  document.documentElement.setAttribute("data-theme", "sunset");


  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App