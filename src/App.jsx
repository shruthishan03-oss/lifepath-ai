import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Onboarding from './pages/Onboarding'
import AIAnalysis from './pages/AIAnalysis'
import Dashboard from './pages/Dashboard'
import Timeline from './pages/Timeline'
import Insights from './pages/Insights'
import AcademicPortfolio from './pages/AcademicPortfolio'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import { createEmptyProfile } from './data/userState'
import { ResultsProvider } from './context/ResultsContext'

function RouteAnimator({ children }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function AppRoutes({ profile, setProfile, completeOnboarding }) {
  return (
    <RouteAnimator>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route
          path="/onboarding"
          element={<Onboarding profile={profile} setProfile={setProfile} completeOnboarding={completeOnboarding} />}
        />
        <Route path="/analysis" element={<AIAnalysis profile={profile} />} />
        <Route path="/dashboard" element={<Dashboard profile={profile} />} />
        <Route path="/portfolio" element={<AcademicPortfolio profile={profile} />} />
        <Route path="/profile" element={<Profile profile={profile} setProfile={setProfile} />} />
        <Route path="/timeline" element={<Timeline profile={profile} />} />
        <Route path="/insights" element={<Insights profile={profile} />} />
        <Route path="/settings" element={<Settings profile={profile} setProfile={setProfile} />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    </RouteAnimator>
  )
}

export default function App() {
  const [profile, setProfile] = useState(createEmptyProfile)

  const completeOnboarding = (updates) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
      onboardingComplete: true,
    }))
  }

  return (
    <ResultsProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.24),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.12),_transparent_24%)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle,_rgba(124,58,237,0.18),_transparent_35%)] blur-3xl" />
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
              <AppRoutes profile={profile} setProfile={setProfile} completeOnboarding={completeOnboarding} />
            </main>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ResultsProvider>
  )
}
