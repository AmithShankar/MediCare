'use client'

import Link from 'next/link'
import { AlertCircle, ArrowRight, ChevronRight } from 'lucide-react'
import { StatusBadge, Avatar } from '@medicare-pro/ui'
import { usePatientStore } from '@medicare-pro/store'
import { useEffect, useRef } from 'react'
import { useNotifications } from '@medicare-pro/hooks'

export function CriticalAlerts() {
  const { notifyCriticalAlert } = useNotifications()
  const notifiedRef = useRef<Set<string>>(new Set())

  const critical = usePatientStore((s) =>
    s.patients.filter((p) => p.status === 'critical').slice(0, 5)
  )

  useEffect(() => {
    critical.forEach(p => {
      if (!notifiedRef.current.has(p.id)) {
        notifyCriticalAlert(p.fullName, `Critical Alert: ${p.vitals.heartRate} BPM / ${p.vitals.oxygenSaturation}% SpO2`)
        notifiedRef.current.add(p.id)
      }
    })
  }, [critical, notifyCriticalAlert])

  return (
    <div className="premium-card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-danger-500/10 dark:bg-danger-500/15 shrink-0">
            <AlertCircle className="h-4 w-4 text-danger-600 dark:text-danger-400" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-foreground tracking-tight">Critical Alerts</h3>
            <p className="text-[11px] text-danger-600 dark:text-danger-400 font-semibold mt-0.5">
              {critical.length} patient{critical.length !== 1 ? 's' : ''} need attention
            </p>
          </div>
        </div>
        <Link
          href="/patients?status=critical"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 ml-2"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Alert list */}
      <div className="flex-1 p-2.5 sm:p-3 space-y-1">
        {critical.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
              <AlertCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-sm font-semibold text-foreground">All clear</p>
            <p className="text-xs text-muted-foreground mt-0.5">No critical patients</p>
          </div>
        ) : (
          critical.map((p) => (
            <Link
              key={p.id}
              href={`/patients/${p.id}`}
              className="flex items-center gap-2.5 sm:gap-3 rounded-lg p-2 sm:p-2.5 border border-transparent hover:border-danger-500/20 hover:bg-danger-500/[0.04] dark:hover:bg-danger-500/[0.07] transition-all group"
            >
              {/* Red accent bar */}
              <div className="w-0.5 h-8 rounded-full bg-danger-500/60 shrink-0" />
              <Avatar name={p.fullName} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-foreground truncate group-hover:text-danger-600 dark:group-hover:text-danger-400 transition-colors">
                  {p.fullName}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {p.department} · {p.bedNumber}
                </p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <StatusBadge status={p.status} showDot={false} size="sm" />
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-danger-400 transition-colors" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
