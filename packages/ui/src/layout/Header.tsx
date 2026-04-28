'use client'

import { Menu, Search, Command } from 'lucide-react'
import { useUIStore } from '@medicare-pro/store'
import { NotificationBell } from '../NotificationPanel'
import { ThemeToggle } from '../ThemeToggle'
import { Avatar } from '../Avatar'
import { useAuth } from '@medicare-pro/hooks'

export function Header({ title, subtitle }: { title: string, subtitle?: string }) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 lg:gap-4 border-b border-border/20 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 px-3 lg:px-8">
      <button
        onClick={toggleSidebar}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-all lg:hidden border border-border/30"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 min-w-0 flex flex-col justify-center px-1">
        <h1 className="text-sm lg:text-base font-bold text-foreground tracking-tight leading-tight uppercase tracking-[0.1em] truncate">{title}</h1>
        {subtitle && (
          <p className="hidden lg:block text-[10px] text-muted-foreground truncate font-semibold mt-0.5 max-w-[400px] uppercase tracking-wider opacity-60">
            {subtitle}
          </p>
        )}
      </div>

      <div className="hidden md:flex items-center gap-3 mr-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground/60 group-focus-within:text-primary transition-colors">
            <Search className="h-3.5 w-3.5" />
          </div>
          <input 
            type="text" 
            placeholder="Search records..." 
            className="h-9 w-64 rounded-xl border border-border bg-accent/30 pl-9 pr-12 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary transition-all"
          />
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
             <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
               <Command className="h-2.5 w-2.5" /> K
             </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-l border-border pl-4">
        <NotificationBell />
        <ThemeToggle />
        <div className="ml-2 pl-2 border-l border-border">
          <Avatar 
            name={user?.displayName ?? user?.email ?? 'U'} 
            src={user?.photoURL} 
            size="sm" 
            className="ring-2 ring-primary/5 hover:ring-primary/20 transition-all cursor-pointer"
          />
        </div>
      </div>
    </header>
  )
}
