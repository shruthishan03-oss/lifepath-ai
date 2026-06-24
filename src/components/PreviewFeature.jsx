import { motion } from 'framer-motion'
import { useResults } from '../context/ResultsContext'

export default function PreviewFeature({ className = '' }) {
  const { results } = useResults()

  if (results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl border border-white/10 bg-slate-950/70 p-5 ${className}`}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Generated results</p>
        <p className="mt-3 text-lg font-semibold text-white">{results.pathways[0]?.title}</p>
        <p className="mt-1 text-sm text-slate-300">{results.readinessScore}% readiness</p>
      </motion.div>
    )
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl border border-dashed border-white/10 bg-slate-950/50 px-4 py-6 text-center text-sm text-slate-400 ${className}`}
    >
      Run analysis to generate personalized recommendations.
    </motion.p>
  )
}
