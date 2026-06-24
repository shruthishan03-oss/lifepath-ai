import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Cpu, Sparkles, Zap } from 'lucide-react'

import StepIndicator from '../components/StepIndicator'
import EmptyState from '../components/EmptyState'
import OnboardingGate from '../components/OnboardingGate'
import { isOnboardingComplete } from '../data/userState'
import { generateResults } from '../lib/generateResults'
import { useResults } from '../context/ResultsContext'

const systemSteps = [
  { icon: Activity, text: 'Reading onboarding inputs...', color: 'text-cyan-400' },
  { icon: Cpu, text: 'Matching goals to pathway rules...', color: 'text-indigo-400' },
  { icon: Zap, text: 'Generating personalized insights...', color: 'text-violet-400' },
  { icon: Sparkles, text: 'Finalizing results...', color: 'text-brand-secondary' },
]

export default function AIAnalysis({ profile }) {
  const [progress, setProgress] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [statusText, setStatusText] = useState(systemSteps[0].text)
  const { results, setResults, clearResults } = useResults()
  const onboarded = isOnboardingComplete(profile)

  useEffect(() => {
    if (!hasStarted || progress >= 100) return
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.floor(Math.random() * 10) + 10, 100))
    }, 600)
    return () => clearInterval(interval)
  }, [hasStarted, progress])

  useEffect(() => {
    if (!hasStarted) return
    const idx = Math.min(Math.floor(progress / 25), systemSteps.length - 1)
    setStatusIndex(idx)
    setStatusText(systemSteps[idx].text)

    if (progress >= 100 && !results) {
      setResults(generateResults(profile))
      setStatusText('Analysis complete')
    }
  }, [progress, hasStarted, profile, results, setResults])

  const profileInputs = [
    { label: 'Category', value: profile.category },
    { label: 'Current situation', value: profile.currentSituation },
    { label: 'Goal', value: profile.goal },
  ]

  return (
    <div className="space-y-10">
      <StepIndicator currentStep={2} />

      <OnboardingGate profile={profile} title="Complete onboarding first" message="Finish setup before running AI analysis.">
        <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">AI analysis engine</p>
            <h1 className="mt-3 text-4xl font-bold text-white">Run your first analysis</h1>
            <p className="mt-3 text-slate-300">Generate personalized pathways from your onboarding inputs.</p>

            {!hasStarted && !results ? (
              <div className="mt-10">
                <EmptyState message="No analysis has run yet." />
                <button
                  onClick={() => {
                    clearResults()
                    setHasStarted(true)
                    setProgress(0)
                  }}
                  className="mt-4 rounded-3xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white"
                >
                  Start analysis
                </button>
              </div>
            ) : (
              <div className="mt-10 space-y-6">
                {!results && (
                  <div className="rounded-[24px] bg-slate-950/75 p-6">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Current status</p>
                        <p className="mt-2 text-white">{statusText}</p>
                      </div>
                      <div className={`inline-flex items-center gap-2 ${systemSteps[statusIndex].color}`}>
                        <Cpu className="h-4 w-4" />
                        Rules engine
                      </div>
                    </div>
                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-300 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">Progress: {progress}%</p>
                  </div>
                )}

                {results && (
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Readiness score</p>
                      <p className="mt-2 text-4xl font-bold text-white">{results.readinessScore}%</p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4">
                      <h3 className="font-semibold text-white">Pathways</h3>
                      {results.pathways.map((pathway) => (
                        <p key={pathway.title} className="text-slate-300">
                          {pathway.title} - {pathway.match}%
                        </p>
                      ))}
                    </div>

                    <div className="rounded-xl bg-white/5 p-4">
                      <h3 className="font-semibold text-white">Recommended skills</h3>
                      <p className="text-slate-300">{results.recommendedSkills.join(', ')}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        clearResults()
                        setHasStarted(true)
                        setProgress(0)
                      }}
                      className="rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-300"
                    >
                      Re-run analysis
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Profile inputs</p>
              <div className="mt-3 space-y-2">
                {profileInputs.map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/5 p-3">
                    <p className="text-sm text-slate-300">{item.label}</p>
                    <p className="text-sm text-slate-200">{item.value || '-'}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">AI recommendations</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Pathway engine</h2>
            {results ? (
              <div className="mt-6 space-y-4">
                {results.pathways.map((pathway) => (
                  <div key={pathway.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-white">{pathway.title}</h3>
                      <span className="rounded-full bg-brand-primary/20 px-3 py-1 text-sm text-cyan-200">{pathway.match}%</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{pathway.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="Ready when you are" message="Start the analysis to turn your onboarding answers into pathway matches." />
            )}
          </motion.div>
        </div>
      </OnboardingGate>

      {!onboarded && (
        <p className="text-center text-sm text-slate-500">
          <Link to="/onboarding" className="text-brand-primary hover:underline">Complete onboarding</Link> to unlock analysis.
        </p>
      )}
    </div>
  )
}
