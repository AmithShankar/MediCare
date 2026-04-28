'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, StatusBadge, Avatar } from '@medicare-pro/ui'
import { usePatientStore } from '@medicare-pro/store'
import { formatRelativeDate } from '@medicare-pro/utils'

export function RecentAdmissions() {
  const recent = usePatientStore((s) =>
    [...s.patients]
      .sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime())
      .slice(0, 6)
  )

  return (
    <Card padding="none" className="h-full">
      <div className="px-5 pt-5 pb-3">
        <CardHeader className="mb-0">
          <CardTitle>Recent Admissions</CardTitle>
          <Link href="/patients" className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
            View all
          </Link>
        </CardHeader>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-border bg-muted/50">
              <th className="text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Patient</th>
              <th className="text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-4 py-3">Department</th>
              <th className="text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-4 py-3">Admitted</th>
              <th className="text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-4 py-3 pr-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recent.map((p) => (
              <tr key={p.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-5 py-3">
                  <Link href={`/patients/${p.id}`} className="flex items-center gap-3">
                    <Avatar name={p.fullName} size="sm" />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {p.fullName}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{p.mrn}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">{p.department}</td>
                <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatRelativeDate(p.admissionDate)}</td>
                <td className="px-4 py-3 pr-5"><StatusBadge status={p.status} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
