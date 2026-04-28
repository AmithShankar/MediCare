'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@medicare-pro/utils'

import { ThemeToggleProps } from '@medicare-pro/types'

export function ThemeToggle({ className, variant = 'icon' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-8 w-8" />

  const isDark = theme === 'dark'
  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  if (variant === 'pill') {
    return (
      <button
        onClick={toggle}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all',
          'border-border bg-card text-foreground hover:bg-accent',
          className
        )}
      >
        {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-xl border border-transparent transition-all',
        'hover:bg-accent hover:border-border text-muted-foreground hover:text-foreground',
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
