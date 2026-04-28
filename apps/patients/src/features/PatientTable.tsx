'use client'

import Link from 'next/link'
import { ChevronRight, Stethoscope } from 'lucide-react'
import { StatusBadge, Avatar } from '@medicare-pro/ui'
import { formatDate, formatAge, cn } from '@medicare-pro/utils'
import { Patient, PatientTableProps } from '@medicare-pro/types'

const TH = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <th className={cn(
    'text-left text-[11px] font-semibold uppercase tracking-wide',
    'text-slate-500 dark:text-slate-500 px-4 py-3',
    className
  )}>
    {children}
  </th>
)

export function PatientTable({ patients }: PatientTableProps) {
  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 mb-3">
          <Stethoscope className="h-6 w-6 text-slate-400" />
        </div>
        <p className="font-medium text-slate-900 dark:text-slate-100">No patients found</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Adjust your filters to see results</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <TH className="pl-5">Patient</TH>
            <TH>MRN</TH>
            <TH>Age</TH>
            <TH>Department</TH>
            <TH>Bed</TH>
            <TH>HR</TH>
            <TH>SpO₂</TH>
            <TH>Status</TH>
            <TH className="pr-5">Admitted</TH>
            <TH />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {patients.map((p) => {
            const lowSpo2 = p.vitals.oxygenSaturation < 92
            const highHR  = p.vitals.heartRate > 100 || p.vitals.heartRate < 55
            return (
              <tr key={p.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 pl-5">
                  <Link href={`/${p.id}`} className="flex items-center gap-3">
                    <Avatar name={p.fullName} size="sm" />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {p.fullName}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{p.diagnosis}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{p.mrn}</span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap capitalize">
                  {formatAge(p.age)} · {p.gender}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">{p.department}</td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{p.bedNumber}</td>
                <td className="px-4 py-3">
                  <span className={cn('text-xs font-semibold', highHR ? 'text-danger-600 dark:text-danger-400' : 'text-slate-800 dark:text-slate-200')}>
                    {p.vitals.heartRate}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-0.5">bpm</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('text-xs font-semibold', lowSpo2 ? 'text-danger-600 dark:text-danger-400' : 'text-slate-800 dark:text-slate-200')}>
                    {p.vitals.oxygenSaturation}%
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={p.status} size="sm" /></td>
                <td className="px-4 py-3 pr-5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {formatDate(p.admissionDate)}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/${p.id}`}>
                    <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 transition-colors" />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
