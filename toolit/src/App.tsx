import { useEffect, useRef, useState } from 'react'
import './App.css'
import Login from '../src/pages/Login/login'
import HomeScreen from './pages/Home/HomeScreen'
import EmpathyMap from './pages/Empathy/EmpathyMap'
import * as microsoftTeams from '@microsoft/teams-js'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { inTeams } from './utils/inTeams'
import ScenarioMap from './pages/Scenario/ScenarioMap'
function App() {
  const startedInitializingRef = useRef(false)
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    if (startedInitializingRef.current) return
    startedInitializingRef.current = true
    const initialize = async () => {
      try {
        await microsoftTeams.app.initialize()
        microsoftTeams.app.notifyAppLoaded()
        microsoftTeams.app.notifySuccess()
        setInitialized(true)
      } catch (error) {
        console.error(error)
      }
    }
    if (inTeams()) {
      initialize()
    }
  })
  const appReady = (inTeams() && initialized) || !inTeams()
  return appReady ? (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/homeScreen" element={<HomeScreen />} />
          <Route path="/empathymap" element={<EmpathyMap />} />
          <Route path="/scenariomap" element={<ScenarioMap />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  ) : null
}

export default App
