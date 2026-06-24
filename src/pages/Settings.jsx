import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, Settings2 } from 'lucide-react'
import OnboardingGate from '../components/OnboardingGate'
import { useResults } from '../context/ResultsContext'

const themes = [
  { label: 'Indigo Bloom', value: 'indigo' },
  { label: 'Twilight Gradient', value: 'purple' },
  { label: 'Cyan Horizon', value: 'cyan' },
]

export default function Settings({ profile }) {
  const [theme, setTheme] = useState('indigo')
  const { results } = useResults()

  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Settings</p>
            <h1 className="mt-3 text-4xl font-bold text-white">Manage preferences</h1>
            <p className="mt-2 text-slate-400">Customize appearance and review your saved setup.</p>
          </div>
          <div className="inline-flex flex-shrink-0 items-center gap-2 rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Settings2 className="h-4 w-4 text-cyan-300" /> Preferences
          </div>
        </div>
      </motion.div>

      <OnboardingGate profile={profile} title="Complete onboarding first" message="Finish setup to manage settings.">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Appearance</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {themes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTheme(item.value)}
                  className={`rounded-[28px] border p-6 text-left transition ${
                    theme === item.value ? 'border-brand-primary/50 bg-white/10 text-white' : 'border-white/10 bg-slate-950/80 text-slate-300'
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-4 text-lg font-semibold">{item.value}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Saved pathways</p>
              {results ? (
                <div className="mt-4 space-y-3">
                  {results.pathways.map((pathway) => (
                    <p key={pathway.title} className="rounded-2xl bg-white/5 p-3 text-sm text-slate-300">{pathway.title} - {pathway.match}%</p>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400">Run analysis to save generated pathways here.</p>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
            <div className="flex items-center gap-4">
              <div className="rounded-3xl bg-brand-primary/10 p-3 text-brand-primary">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Profile summary</p>
                <p className="mt-2 text-lg font-semibold text-white">Your onboarding details</p>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Category</p>
                <p className="mt-3 text-lg text-white">{profile.category || '-'}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Goal</p>
                <p className="mt-3 text-lg text-white">{profile.goal || '-'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </OnboardingGate>
    </div>
  )
}
