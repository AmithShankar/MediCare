'use client'

import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@medicare-pro/utils'
import { useUIStore } from '@medicare-pro/store'
import type { ToastMessage } from '@medicare-pro/types'

const CONFIG: Record<ToastMessage['type'], { icon: React.ReactNode; bar: string; bg: string }> = {
  success: {
    icon: <CheckCircle2 className="h-4 w-4 text-success-600 dark:text-success-400" />,
    bar: 'bg-success-500',
    bg: 'bg-white dark:bg-slate-900 border-border',
  },
  error: {
    icon: <AlertCircle className="h-4 w-4 text-danger-600 dark:text-danger-400" />,
    bar: 'bg-danger-500',
    bg: 'bg-white dark:bg-slate-900 border-border',
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4 text-warning-600 dark:text-warning-500" />,
    bar: 'bg-warning-500',
    bg: 'bg-white dark:bg-slate-900 border-border',
  },
  info: {
    icon: <Info className="h-4 w-4 text-brand-600 dark:text-brand-400" />,
    bar: 'bg-brand-500',
    bg: 'bg-white dark:bg-slate-900 border-border',
  },
}

function ToastItem({ toast }: { toast: ToastMessage }) {
  const removeToast = useUIStore((s) => s.removeToast)
  const c = CONFIG[toast.type]

  return (
    <div className={cn(
      'relative flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg overflow-hidden',
      'animate-page-enter',
      c.bg
    )}>
      <div className={cn('absolute left-0 top-0 bottom-0 w-1 rounded-l-xl', c.bar)} />
      <div className="pl-1 mt-0.5 shrink-0">{c.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{toast.title}</p>
        {toast.message && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{toast.message}</p>}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts)
  if (!toasts.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 w-[340px] pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} />
        </div>
      ))}
    </div>
  )
}
