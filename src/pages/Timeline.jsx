import { motion } from 'framer-motion'
import { Clock3 } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import EmptyState from '../components/EmptyState'
import OnboardingGate from '../components/OnboardingGate'
import { useResults } from '../context/ResultsContext'

export default function Timeline({ profile }) {
  const { results } = useResults()

  return (
    <div className="space-y-10">
      <StepIndicator currentStep={5} />
      <OnboardingGate profile={profile} title="Complete onboarding first" message="Finish setup to view your pathways.">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Pathways</p>
              <h1 className="mt-3 text-4xl font-bold text-white">Your ranked pathways</h1>
              <p className="mt-2 text-slate-400">Explore the best matches generated from your onboarding profile.</p>
            </div>
            <div className="inline-flex flex-shrink-0 items-center gap-2 rounded-3xl bg-brand-primary/10 px-4 py-2 text-sm text-brand-primary">
              <Clock3 className="h-4 w-4" /> Pathway map
            </div>
          </div>
        </motion.div>

        {!results ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <EmptyState title="No pathway rankings yet" message="Run analysis to generate pathway matches and explanations." actionLabel="Run AI analysis" actionTo="/analysis" />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <div className="space-y-5">
              {results.pathways.map((pathway, index) => (
                <div key={pathway.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Rank {index + 1}</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">{pathway.title}</h2>
                    </div>
                    <div className="rounded-full bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                      {pathway.match}% Match
                    </div>
                  </div>
                  <p className="mt-4 text-slate-300">{pathway.explanation}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </OnboardingGate>
    </div>
  )
}
