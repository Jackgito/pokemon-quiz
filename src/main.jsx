import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './main.css'

import HomePage from './pages/home/HomePage.jsx'
import QuizPage from './pages/quiz/QuizPage.jsx'
//A Material UI component to set a style baseline
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CssBaseline enableColorScheme={true}>
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/quiz" element={<QuizPage />} />
              </Routes>
          </Router>
      </CssBaseline>
  </StrictMode>,
)