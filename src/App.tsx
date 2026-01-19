import { Outlet } from 'react-router'
import { NavBar } from './pages/Nav'

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App