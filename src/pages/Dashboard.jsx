import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import EmptyState from '../components/EmptyState'
import OnboardingGate from '../components/OnboardingGate'
import { isOnboardingComplete } from '../data/userState'
import { useResults } from '../context/ResultsContext'

export default function Dashboard({ profile }) {
  const onboarded = isOnboardingComplete(profile)
  const { results } = useResults()

  return (
    <div className="space-y-10">
      <StepIndicator currentStep={3} />
      <OnboardingGate profile={profile} title="Complete onboarding first" message="Finish the setup flow to access your dashboard.">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Your focus</p>
          <h1 className="mt-3 text-3xl font-bold text-white">{profile.category}</h1>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current situation</p>
              <p className="mt-3 text-slate-200">{profile.currentSituation}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Goal</p>
              <p className="mt-3 text-slate-200">{profile.goal}</p>
            </div>
          </div>
        </motion.div>

        {!results ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <EmptyState icon={Target} title="No analysis yet" message="Run analysis to populate your dashboard with personalized pathways." actionLabel="Run AI analysis" actionTo="/analysis" />
          </motion.div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Readiness</p>
                <p className="mt-4 text-5xl font-bold text-white">{results.readinessScore}%</p>
                <p className="mt-3 text-slate-300">{results.insights[0]}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Top pathway matches</p>
                <div className="mt-6 space-y-4">
                  {results.pathways.slice(0, 3).map((pathway) => (
                    <div key={pathway.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-white">{pathway.title}</p>
                        <p className="text-sm text-cyan-300">{pathway.match}% Match</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">{pathway.explanation}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Key insight</p>
                <p className="mt-4 text-lg text-slate-200">{results.insights[1]}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Recommended next actions</p>
                <div className="mt-5 space-y-3">
                  {results.nextActions.map((action) => (
                    <p key={action} className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">{action}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-3">
          <Link to="/profile" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:text-white">Edit profile</Link>
          <Link to="/insights" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:text-white">View insights</Link>
        </div>
      </OnboardingGate>

      {!onboarded && (
        <p className="text-center text-sm text-slate-500">
          New here? <Link to="/onboarding" className="text-brand-primary hover:underline">Start onboarding</Link>
        </p>
      )}
    </div>
  )
}
