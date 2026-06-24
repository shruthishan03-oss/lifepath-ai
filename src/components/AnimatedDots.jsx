export default function AnimatedDots({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-hidden>
      <span className="dot-pulse inline-block h-2 w-2 rounded-full bg-white/80" />
      <span className="dot-pulse delay-75 inline-block h-2 w-2 rounded-full bg-white/60" />
      <span className="dot-pulse delay-150 inline-block h-2 w-2 rounded-full bg-white/40" />
    </span>
  )
}
