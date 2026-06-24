import { CloudUpload, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import EmptyState from '../components/EmptyState'
import OnboardingGate from '../components/OnboardingGate'
import { useResults } from '../context/ResultsContext'

export default function AcademicPortfolio({ profile }) {
  const { results } = useResults()

  return (
    <div className="space-y-10">
      <OnboardingGate profile={profile} title="Complete onboarding first" message="Finish setup to view portfolio recommendations.">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Portfolio</p>
              <h1 className="mt-3 text-4xl font-bold text-white">Build proof for your path</h1>
              <p className="mt-2 text-slate-400">Use generated recommendations to create judging-ready projects.</p>
            </div>
            <div className="inline-flex flex-shrink-0 items-center gap-2 rounded-3xl bg-brand-secondary/10 px-4 py-2 text-sm text-brand-secondary">
              <CloudUpload className="h-4 w-4" /> Project center
            </div>
          </div>
        </motion.div>

        {!results ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <EmptyState icon={FileText} title="No portfolio recommendations yet" message="Run analysis to generate portfolio ideas for your goal." actionLabel="Run AI analysis" actionTo="/analysis" />
          </motion.div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              {results.portfolio.map((project) => (
                <motion.div key={project.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Recommended project</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{project.title}</h2>
                  <p className="mt-3 text-sm text-slate-300">{project.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Portfolio strategy</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                  <p className="font-semibold text-white">Primary path</p>
                  <p className="mt-2 text-sm text-slate-300">{results.pathways[0]?.title}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                  <p className="font-semibold text-white">Skills to show</p>
                  <p className="mt-2 text-sm text-slate-300">{results.recommendedSkills.slice(0, 4).join(', ')}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </OnboardingGate>
    </div>
  )
}
