import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Login } from './pages/Login.tsx';
import { Main } from './pages/Main.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {index: true, Component: Main},
      {path: '/login', Component: Login},
      {path: '/register', Component: Login},
      {path: '/main', Component: Main},
      {path: '/roomatefind', Component: Login},
      {path: '/houselistingfind', Component: Login},
      {path: '/houselisting', Component: Login},
      {path: '/addhouselisting', Component: Login},
      {path: '/profile', Component: Login},
      {path: '/changeprofile', Component: Login},
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
