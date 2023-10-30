import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import MainLayout from './layouts/main/MainLayout'
import GuestLayout from './layouts/GuestLayout'
import SignUp from './routes/auth/signup/SignUp'
import SignIn from './routes/auth/signin/SignIn'
import NotFound from './components/NotFound'
import Home from './routes/home/Home'
import Statistics from './routes/statistics/Statistics'
import { getToken } from './utils/auth'
import './App.sass'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-toastify/dist/ReactToastify.css'

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
            <Route path="/statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ErrorBoundary>
  )
}

export default App
