import { NavLink } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Logo from './Logo'

const links = [
  { label: 'Onboarding', path: '/onboarding' },
  { label: 'Profile', path: '/profile' },
  { label: 'AI Analysis', path: '/analysis' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Pathways', path: '/timeline' },
  { label: 'Insights', path: '/insights' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Settings', path: '/settings' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/onboarding" className="flex items-center gap-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-2 shadow-soft">
            <Logo />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">LifePath AI</p>
            <p className="font-semibold text-slate-100">Prototype</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 xl:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm transition ${
                  isActive ? 'bg-brand-primary text-white shadow-glow' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300">
          <Compass className="h-5 w-5" />
        </div>
      </div>
    </header>
  )
}
