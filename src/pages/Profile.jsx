import { useState } from 'react'
import { motion } from 'framer-motion'
import StepIndicator from '../components/StepIndicator'
import OnboardingGate from '../components/OnboardingGate'
import { createEmptyProfile } from '../data/userState'

export default function Profile({ profile, setProfile }) {
  const [form, setForm] = useState(profile || createEmptyProfile())
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
  const save = () => setProfile && setProfile({ ...form, onboardingComplete: true })

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={1} />
      <OnboardingGate profile={profile} title="Complete onboarding first" message="Finish setup before editing your profile.">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Profile</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Your setup details</h1>
          <p className="mt-2 text-slate-400">Update the information you entered during onboarding.</p>
          <div className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-300">
              Focus category
              <input className="input-style" value={form.category} onChange={(e) => update('category', e.target.value)} />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Current situation
              <textarea className="input-style min-h-[120px] resize-y" value={form.currentSituation} onChange={(e) => update('currentSituation', e.target.value)} />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Goal
              <textarea className="input-style min-h-[120px] resize-y" value={form.goal} onChange={(e) => update('goal', e.target.value)} />
            </label>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setForm(createEmptyProfile())} className="rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-300">Clear</button>
            <button type="button" onClick={save} className="rounded-3xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white">Save profile</button>
          </div>
        </motion.div>
      </OnboardingGate>
    </div>
  )
}
