import { motion } from 'framer-motion'
import StepIndicator from '../components/StepIndicator'
import EmptyState from '../components/EmptyState'
import OnboardingGate from '../components/OnboardingGate'
import { useResults } from '../context/ResultsContext'

export default function Insights({ profile }) {
  const { results } = useResults()

  return (
    <div className="space-y-10">
      <StepIndicator currentStep={4} />
      <OnboardingGate profile={profile} title="Complete onboarding first" message="Finish setup to unlock insights.">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Deep insights</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Insights</h1>
          <p className="mt-2 text-slate-400">Strengths, growth opportunities, and skill guidance from your generated results.</p>
        </motion.div>

        {!results ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <EmptyState title="No insights yet" message="Run analysis to generate personalized strengths and recommendations." actionLabel="Run AI analysis" actionTo="/analysis" />
          </motion.div>
        ) : (
          <>
            <div className="grid gap-6 xl:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Strengths</p>
                <div className="mt-6 space-y-3">
                  {results.strengths.map((item) => (
                    <p key={item} className="rounded-2xl bg-white/5 p-4 text-slate-300">{item}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Growth opportunities</p>
                <div className="mt-6 space-y-3">
                  {results.growthOpportunities.map((item) => (
                    <p key={item} className="rounded-2xl bg-white/5 p-4 text-slate-300">{item}</p>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Recommended skills</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {results.recommendedSkills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-cyan-200">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Career fit observations</p>
                <div className="mt-6 space-y-3">
                  {results.careerFitObservations.map((item) => (
                    <p key={item} className="rounded-2xl bg-white/5 p-4 text-slate-300">{item}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </OnboardingGate>
    </div>
  )
}
