import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Dumbbell, GraduationCap, Heart, Wallet } from 'lucide-react'
import { ONBOARDING_CATEGORIES } from '../data/userState'

const steps = [
  { title: 'Choose a focus area', description: 'Pick the category that best matches what you want to work on.' },
  { title: 'Describe where you are now', description: 'Share your current situation so recommendations can start from reality.' },
  { title: 'Define your goal', description: 'Tell us what success looks like for you.' },
]

const categoryIcons = {
  Career: Briefcase,
  Education: GraduationCap,
  Fitness: Dumbbell,
  Finance: Wallet,
  'Personal Growth': Heart,
}

export default function Onboarding({ profile, completeOnboarding }) {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState({
    category: profile.category || '',
    currentSituation: profile.currentSituation || '',
    goal: profile.goal || '',
  })

  const progress = useMemo(() => ((activeStep + 1) / steps.length) * 100, [activeStep])
  const currentStep = steps[activeStep]

  const canContinue = () => {
    if (activeStep === 0) return Boolean(form.category)
    if (activeStep === 1) return form.currentSituation.trim().length > 0
    if (activeStep === 2) return form.goal.trim().length > 0
    return false
  }

  const handleNext = () => {
    if (!canContinue()) return
    if (activeStep < steps.length - 1) {
      setActiveStep((step) => step + 1)
      return
    }
    completeOnboarding(form)
    navigate('/dashboard')
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-10 xl:grid-cols-[0.8fr_1.2fr]">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Getting started</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Welcome to LifePath AI</h1>
          <p className="mt-3 text-slate-300">Set up your focus area, current situation, and first goal to begin your journey.</p>

          <div className="mt-10 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`rounded-3xl border p-5 ${index === activeStep ? 'border-brand-primary/40 bg-white/5' : 'border-white/5 bg-slate-950/80'}`}
              >
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Step {index + 1}</p>
                <p className="mt-2 font-semibold text-white">{step.title}</p>
                <p className="mt-1 text-sm text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Step {activeStep + 1} of {steps.length}</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{currentStep.title}</h2>
          <p className="mt-2 text-sm text-slate-400">{currentStep.description}</p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-10 space-y-6">
            {activeStep === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {ONBOARDING_CATEGORIES.map((category) => {
                  const Icon = categoryIcons[category]
                  const selected = form.category === category
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, category }))}
                      className={`rounded-3xl border p-5 text-left transition ${
                        selected ? 'border-brand-primary/50 bg-brand-primary/10 text-white' : 'border-white/10 bg-slate-950/80 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-white/5 p-2">
                          <Icon className="h-5 w-5 text-brand-primary" />
                        </div>
                        <span className="font-semibold">{category}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {activeStep === 1 && (
              <label className="grid gap-2 text-sm text-slate-300">
                Current situation
                <textarea
                  value={form.currentSituation}
                  onChange={(e) => setForm((prev) => ({ ...prev, currentSituation: e.target.value }))}
                  className="input-style min-h-[160px] resize-y"
                  placeholder="Describe where you are today..."
                />
              </label>
            )}

            {activeStep === 2 && (
              <label className="grid gap-2 text-sm text-slate-300">
                Your goal
                <textarea
                  value={form.goal}
                  onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))}
                  className="input-style min-h-[160px] resize-y"
                  placeholder="What do you want to achieve?"
                />
              </label>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">Run analysis after onboarding to generate your personalized path.</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
                disabled={activeStep === 0}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-300 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue()}
                className="inline-flex items-center gap-2 rounded-3xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {activeStep === steps.length - 1 ? 'Go to dashboard' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
