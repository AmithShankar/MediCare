'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Bell, AlertCircle, UserPlus, TestTube2, CalendarDays,
  UserCheck, X, CheckCheck, ChevronRight,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@medicare-pro/utils'
import { useNotificationStore } from '@medicare-pro/store'
import type { NotifItem, NotifType } from '@medicare-pro/types'

const TYPE_CONFIG: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  critical:    { icon: AlertCircle,   color: 'text-danger-600 dark:text-danger-400',   bg: 'bg-danger-50 dark:bg-danger-500/10' },
  admission:   { icon: UserPlus,      color: 'text-brand-600 dark:text-brand-400',     bg: 'bg-brand-50 dark:bg-brand-500/10' },
  lab:         { icon: TestTube2,     color: 'text-violet-600 dark:text-violet-400',   bg: 'bg-violet-50 dark:bg-violet-500/10' },
  appointment: { icon: CalendarDays,  color: 'text-amber-600 dark:text-amber-400',     bg: 'bg-amber-50 dark:bg-amber-500/10' },
  discharge:   { icon: UserCheck,     color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10' },
  success:     { icon: UserCheck,     color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10' },
}

function NotifRow({ item }: { item: NotifItem }) {
  const markRead = useNotificationStore((s) => s.markRead)
  const { icon: Icon, color, bg } = TYPE_CONFIG[item.type]

  return (
    <button
      onClick={() => markRead(item.id)}
      className={cn(
        'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors duration-100',
        item.read
          ? 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
          : 'bg-brand-50/40 dark:bg-brand-500/5 hover:bg-brand-50 dark:hover:bg-brand-500/10'
      )}
    >
      <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', bg)}>
        <Icon className={cn('h-4 w-4', color)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            'text-sm leading-snug',
            item.read
              ? 'font-normal text-slate-700 dark:text-slate-300'
              : 'font-semibold text-slate-900 dark:text-slate-100'
          )}>
            {item.title}
          </p>
          {!item.read && <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.body}</p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
        </p>
      </div>
    </button>
  )
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const { items, unreadCount, markAllRead } = useNotificationStore()

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open])

  return (
    <div ref={panelRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
        className={cn(
          'relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-100',
          'text-slate-500 dark:text-slate-400',
          'hover:bg-slate-100 dark:hover:bg-slate-800',
          'hover:text-slate-900 dark:hover:text-slate-100',
          open && 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
        )}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[9px] font-bold text-white leading-none">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className={cn(
          'absolute right-0 top-[calc(100%+8px)] z-[150]',
          'w-[380px] rounded-2xl border overflow-hidden',
          'border-border',
          'bg-white dark:bg-slate-900',
          'shadow-xl dark:shadow-slate-950/60',
          'notif-panel'
        )}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1.5 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <CheckCheck className="h-3 w-3" />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 mb-3">
                  <Bell className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">All caught up</p>
                <p className="text-xs text-slate-400 mt-1">No new notifications</p>
              </div>
            ) : (
              items.map((item) => <NotifRow key={item.id} item={item} />)
            )}
          </div>

          <div className="border-t border-border px-4 py-2.5">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              View all notifications
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
