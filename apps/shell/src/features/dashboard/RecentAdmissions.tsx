'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { StatusBadge, Avatar } from '@medicare-pro/ui'
import { usePatientStore } from '@medicare-pro/store'
import { formatRelativeDate } from '@medicare-pro/utils'

export function RecentAdmissions() {
  const recent = usePatientStore((s) =>
    [...s.patients]
      .sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime())
      .slice(0, 6)
  )

  return (
    <div className="premium-card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-display font-bold text-foreground tracking-tight">Recent Admissions</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{recent.length} latest records</p>
        </div>
        <Link
          href="/patients"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ── Mobile: stacked card list (hidden on md+) ─────────────── */}
      <div className="md:hidden flex-1 divide-y divide-border/60">
        {recent.map((p) => (
          <Link
            key={p.id}
            href={`/patients/${p.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-primary/[0.04] transition-colors group"
          >
            <Avatar name={p.fullName} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {p.fullName}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {p.department} · {formatRelativeDate(p.admissionDate)}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={p.status} size="sm" />
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Desktop: full table (hidden below md) ─────────────────── */}
      <div className="hidden md:block overflow-x-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 dark:bg-muted/20">
              <th className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-5 py-2.5">Patient</th>
              <th className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5">Department</th>
              <th className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5">Admitted</th>
              <th className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 pr-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((p, i) => (
              <tr
                key={p.id}
                className={`group border-t border-border/60 hover:bg-primary/[0.03] dark:hover:bg-primary/[0.06] transition-colors ${
                  i % 2 !== 0 ? 'bg-muted/20 dark:bg-muted/10' : ''
                }`}
              >
                <td className="px-5 py-3">
                  <Link href={`/patients/${p.id}`} className="flex items-center gap-3">
                    <Avatar name={p.fullName} size="sm" />
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-[13px] truncate group-hover:text-primary transition-colors">
                        {p.fullName}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">{p.mrn}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-[12px] text-muted-foreground whitespace-nowrap">{p.department}</td>
                <td className="px-4 py-3 text-[12px] text-muted-foreground whitespace-nowrap">{formatRelativeDate(p.admissionDate)}</td>
                <td className="px-4 py-3 pr-5">
                  <StatusBadge status={p.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
