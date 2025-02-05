import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { AudioProvider } from './context/AudioProvider.jsx'
import { SettingsProvider } from './context/SettingsProvider.jsx'
import { LoginProvider } from "./context/LoginProvider.jsx";
import { ToastProvider } from "./context/ToastProvider";
import './main.css'

import HomePage from './pages/home/HomePage.jsx'
import QuizPage from './pages/quiz/QuizPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <SettingsProvider>
          <LoginProvider>
              <Router>
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/quiz" element={<QuizPage />} />
                  </Routes>
              </Router>
          </LoginProvider>
      </SettingsProvider>
    </ToastProvider>
  </StrictMode>,
)