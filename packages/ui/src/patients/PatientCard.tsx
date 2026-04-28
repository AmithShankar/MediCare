'use client'

import Link from 'next/link'
import { Heart, Activity, Wind } from 'lucide-react'
import { StatusBadge } from '../Badge'
import { Avatar } from '../Avatar'
import { formatAge, formatDate, cn } from '@medicare-pro/utils'
import { PatientCardProps } from '@medicare-pro/types'

export function PatientCard({ patient: p }: PatientCardProps) {
  const isLowSpo2 = p.vitals.oxygenSaturation < 92
  const isHighHR = p.vitals.heartRate > 100 || p.vitals.heartRate < 55

  return (
    <Link href={`/patients/${p.id}`} className="block group h-full">
      <div className={cn(
        'relative rounded-2xl border bg-white dark:bg-slate-900 p-5 h-full',
        'border-border/40',
        'transition-all duration-300',
        'hover:border-primary/40 hover:shadow-xl dark:hover:shadow-slate-950/80',
        'group-hover:-translate-y-1',
        p.status === 'critical' && 'border-danger-500/20 shadow-lg shadow-danger-500/5'
      )}>
        <div className="absolute top-4 right-4">
          <StatusBadge status={p.status} size="sm" />
        </div>

        <div className="flex items-start gap-4 mb-6">
          <Avatar name={p.fullName} size="lg" className="ring-4 ring-slate-100 dark:ring-slate-800/50" />
          <div className="flex-1 min-w-0 pr-12">
            <p className="font-bold text-slate-900 dark:text-slate-100 text-lg tracking-tight truncate group-hover:text-primary transition-colors">
              {p.fullName}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">{p.mrn}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
          {[
            ['Age / Gender', `${formatAge(p.age)} · ${p.gender}`],
            ['Blood Group',  p.bloodGroup],
            ['Department',   p.department],
            ['Bed',          p.bedNumber],
          ].map(([label, val]) => (
            <div key={label} className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">{label}</p>
              <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300 capitalize truncate leading-none">{val}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 p-4 border border-border/20">
          <VitalPill icon={Heart} value={`${p.vitals.heartRate}`} unit="bpm" warn={isHighHR} />
          <div className="h-4 w-px bg-border/40" />
          <VitalPill icon={Activity} value={p.vitals.bloodPressure} unit="mmHg" />
          <div className="h-4 w-px bg-border/40" />
          <VitalPill icon={Wind} value={`${p.vitals.oxygenSaturation}`} unit="%" warn={isLowSpo2} />
        </div>

        <div className="mt-5 pt-5 border-t border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">{p.treatingPhysician}</p>
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0 ml-2">{formatDate(p.admissionDate, 'MMM d')}</p>
        </div>
      </div>
    </Link>
  )
}

function VitalPill({ icon: Icon, value, unit, warn }: { icon: typeof Heart; value: string; unit: string; warn?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 flex-1 justify-center">
      <Icon className={cn('h-3.5 w-3.5', warn ? 'text-danger-500 animate-pulse' : 'text-slate-400 dark:text-slate-500')} />
      <div className="flex flex-col -space-y-1">
        <span className={cn('text-[13px] font-black leading-tight', warn ? 'text-danger-600 dark:text-danger-400' : 'text-slate-900 dark:text-slate-100')}>
          {value}
        </span>
        <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{unit}</span>
      </div>
    </div>
  )
}
