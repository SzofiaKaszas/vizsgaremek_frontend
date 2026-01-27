import { Outlet } from 'react-router'
import { NavBar } from './pages/Nav'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'

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