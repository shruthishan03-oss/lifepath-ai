import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const steps = [
  { id: 1, shortLabel: 'Profile' },
  { id: 2, shortLabel: 'Analysis' },
  { id: 3, shortLabel: 'Paths' },
  { id: 4, shortLabel: 'Insights' },
  { id: 5, shortLabel: 'Timeline' },
]

export default function StepIndicator({ currentStep = 1 }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 sm:gap-4">
        {steps.map((step, idx) => {
          const isActive = step.id === currentStep
          const isComplete = step.id < currentStep
          return (
            <div key={step.id} className="flex flex-shrink-0 items-center gap-2 sm:gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition sm:h-11 sm:w-11 ${
                isActive
                  ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                  : isComplete
                    ? 'border-cyan-400/40 bg-cyan-400/5 text-cyan-300'
                    : 'border-white/10 bg-white/5 text-slate-400'
              }`}>
                {isComplete ? <CheckCircle2 className="h-5 w-5" /> : step.id}
              </motion.div>
              <p className={`whitespace-nowrap text-xs font-medium transition sm:text-sm ${
                isActive ? 'text-brand-primary' : isComplete ? 'text-cyan-300' : 'text-slate-400'
              }`}>
                {step.shortLabel}
              </p>
              {idx < steps.length - 1 && (
                <div className={`h-0.5 w-8 transition sm:w-12 ${
                  step.id < currentStep ? 'bg-cyan-400/30' : 'bg-white/10'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
