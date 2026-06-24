import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-2 shadow-soft">
            <Logo />
          </div>
          <div>
            <p className="font-semibold text-slate-100">LifePath AI</p>
            <p className="text-sm text-slate-500">Pre-launch user testing prototype</p>
          </div>
        </div>
        <p className="text-sm text-slate-500">User testing prototype. © 2026 LifePath AI.</p>
      </div>
    </footer>
  )
}
