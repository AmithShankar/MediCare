'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BarChart3, Bell, Settings, LogOut,
  Heart, X, Stethoscope,
} from 'lucide-react'
import { cn } from '@medicare-pro/utils'
import { Avatar } from '../Avatar'
import { useAuth } from '@medicare-pro/hooks'
import { useUIStore, useNotificationStore, usePatientStore } from '@medicare-pro/store'

const NAV = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/analytics',  label: 'Analytics',  icon: BarChart3 },
    ],
  },
  {
    label: 'Patient Care',
    items: [
      { href: '/patients', label: 'Patients', icon: Stethoscope },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/notifications', label: 'Notifications', icon: Bell },
      { href: '/settings',     label: 'Settings',      icon: Settings },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const unreadCount = useNotificationStore((s) => s.unreadCount)
  const patientCount = usePatientStore((s) => s.patients.length)

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-[60] flex w-[260px] flex-col shrink-0',
        'bg-slate-950/80 dark:bg-[#05070a]/90 backdrop-blur-3xl border-r border-border/20',
        'transition-all duration-300 ease-in-out shadow-2xl shadow-black/40',
        'lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-6 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Heart className="h-5 w-5 text-white fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-none">MediCare Pro</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">Intelligence</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-8 py-2">
          {NAV.map((section) => (
            <div key={section.label} className="space-y-1">
              <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-500">
                {section.label}
              </p>
              <ul className="space-y-1">
                {section.items.map(({ href, label, icon: Icon }) => {
                  const badge =
                    href === '/notifications' && unreadCount > 0
                      ? unreadCount
                      : href === '/patients' && patientCount > 0
                      ? patientCount
                      : null

                  const isActive = href === '/dashboard'
                    ? (pathname === '/dashboard' || pathname === '/')
                    : (pathname === href || pathname.startsWith(`${href}/`))

                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'group flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-200',
                          isActive
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className={cn('h-4.5 w-4.5 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary')} />
                          {label}
                        </span>
                        {badge !== null && (
                          <span className={cn(
                            'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black',
                            isActive
                              ? 'bg-white/20 text-white'
                              : href === '/notifications'
                              ? 'bg-danger-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          )}>
                            {badge > 99 ? '99+' : badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="px-6 py-6 space-y-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border/30 to-transparent" />
          
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3 border border-white/5">
            <Avatar name={user?.displayName ?? user?.email ?? 'User'} src={user?.photoURL} size="sm" className="ring-2 ring-primary/10" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.displayName ?? 'Healthcare User'}
              </p>
              <p className="text-[10px] font-medium text-slate-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-danger-500/10 hover:text-danger-500 transition-all shrink-0"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <a
              href="https://amithshankar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] font-black text-slate-500 hover:text-primary transition-colors tracking-[0.3em] uppercase"
            >
              amithshankar.in
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
