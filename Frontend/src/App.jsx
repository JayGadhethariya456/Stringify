import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnBoardingPage from './pages/OnBoardingPage.jsx'
import { Toaster } from 'react-hot-toast'

import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import HomePage from './pages/HomePage.jsx'


const App = () => {

  const { theme } = useThemeStore()
  const { isLoading, authUser } = useAuthUser()

  if (isLoading) return <PageLoader />

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded;

  return (
    <div className='h-screen ' data-theme={theme}>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={
          isOnboarded ? "/" : "/onboarding"} />
        }
        />
        <Route
          path='/login'
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={
            isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationsPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )}
        />
          <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route path='/onboarding' element={isAuthenticated ? <OnBoardingPage /> : <Navigate to={"/login"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App