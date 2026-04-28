'use client'

import Link from 'next/link'
import { AlertCircle, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, StatusBadge, Avatar } from '@medicare-pro/ui'
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
    <Card padding="md" className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-danger-50 dark:bg-danger-500/10">
            <AlertCircle className="h-3.5 w-3.5 text-danger-600 dark:text-danger-400" />
          </div>
          <CardTitle>Critical Alerts</CardTitle>
        </div>
        <Link
          href="/patients?status=critical"
          className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
        >
          View all
        </Link>
      </CardHeader>

      {critical.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">No critical patients</p>
        </div>
      ) : (
        <ul className="space-y-1">
          {critical.map((p) => (
            <li key={p.id}>
              <Link
                href={`/patients/${p.id}`}
                className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
              >
                <Avatar name={p.fullName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {p.fullName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {p.department} · {p.bedNumber}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={p.status} showDot={false} size="sm" />
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover:text-brand-400 transition-colors" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
