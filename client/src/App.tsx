import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import './styles/App.sass'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  const accessToken = getToken()

  return (
    <ErrorBoundary fallback={<div style={{ margin: 20, textAlign: 'center' }}>Something went wrong</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessToken ? <MainLayout /> : <GuestLayout />} />
          <Route element={<GuestLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
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
