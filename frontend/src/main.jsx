import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { SettingsProvider } from './context/SettingsProvider.jsx'
import { LoginProvider } from "./context/LoginProvider.jsx";
import { ToastProvider } from "./context/ToastProvider";
import { ThemeProvider } from '@emotion/react';

import './main.css'

import HomePage from './pages/home/HomePage.jsx'
import LeaderboardPage from './pages/leaderboard/LeaderboardPage.jsx'
import HomeTheme from './themes/HomeTheme.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={HomeTheme()}>
      <ToastProvider>
        <SettingsProvider>
          <LoginProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
              </Routes>
            </Router>
          </LoginProvider>
        </SettingsProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)