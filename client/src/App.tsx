import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import MainLayout from './layouts/MainLayout'
import GuestLayout from './layouts/GuestLayout'
import SignUp from './routes/auth/SignUp'
import SignIn from './routes/auth/SignIn'
import NotFound from './components/NotFound'
import Home from './routes/home/Home'
import { getToken } from './utils/auth'
import './App.css'

const App: React.FC = () => {
  const accessToken = getToken()

  return (
    <ErrorBoundary fallback={<div style={{ margin: 20, textAlign: 'center' }}>Something went wrong</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessToken ? <MainLayout /> : <Navigate replace to="/signin" />} />
          <Route element={<GuestLayout />}>
            <Route path="signin" element={accessToken ? <Navigate replace to="/" /> : <SignIn />} />
            <Route path="signup" element={accessToken ? <Navigate replace to="/" /> : <SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
