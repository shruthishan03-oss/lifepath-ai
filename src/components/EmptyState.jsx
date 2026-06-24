import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'No data yet', message, actionLabel, actionTo, icon: Icon = Inbox }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-dashed border-white/10 bg-slate-950/50 p-8 text-center"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
        <Icon className="h-6 w-6 text-slate-400" />
      </div>
      {title && <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">{title}</p>}
      {message && <p className={`text-lg text-slate-300 ${title ? 'mt-3' : 'mt-4'}`}>{message}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-5 inline-flex rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/90"
        >
          {actionLabel}
        </Link>
      )}
    </motion.div>
  )
}
