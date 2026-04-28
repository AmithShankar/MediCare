'use client'

import { Search, LayoutGrid, List, X } from 'lucide-react'
import { Select } from '../Select'
import { cn } from '@medicare-pro/utils'
import { useUIStore } from '@medicare-pro/store'
import { usePatients } from '@medicare-pro/hooks'
import type { SelectOption, PatientStatus, PatientGender } from '@medicare-pro/types'

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'all',        label: 'All status' },
  { value: 'stable',     label: 'Stable' },
  { value: 'critical',   label: 'Critical' },
  { value: 'recovering', label: 'Recovering' },
  { value: 'discharged', label: 'Discharged' },
]

const GENDER_OPTIONS: SelectOption[] = [
  { value: 'all',    label: 'All genders' },
  { value: 'male',   label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other',  label: 'Other' },
]

export function PatientFilters() {
  const viewMode = useUIStore((s) => s.viewMode)
  const setViewMode = useUIStore((s) => s.setViewMode)
  const { filters, setFilters, resetFilters, departments, patients, allPatients } = usePatients()

  const hasActive = filters.search || filters.status !== 'all' || filters.department !== 'all' || filters.gender !== 'all'

  const deptOptions: SelectOption[] = [
    { value: 'all', label: 'All departments' },
    ...departments.map((d: string) => ({ value: d, label: d })),
  ]

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search name, MRN, diagnosis or physician..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className={cn(
              'w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition-shadow',
              'border-border',
              'bg-white dark:bg-slate-900',
              'text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
            )}
          />
        </div>

        <div className="flex items-center rounded-lg border border-border bg-card p-1 gap-0.5 shrink-0 self-start">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
              viewMode === 'grid'
                ? 'bg-brand-600 text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
              viewMode === 'list'
                ? 'bg-brand-600 text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            )}
          >
            <List className="h-3.5 w-3.5" />
            List
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.status}
          onValueChange={(v) => setFilters({ status: v as PatientStatus | 'all' })}
          options={STATUS_OPTIONS}
          placeholder="All status"
        />
        <Select
          value={filters.department}
          onValueChange={(v) => setFilters({ department: v })}
          options={deptOptions}
          placeholder="All departments"
        />
        <Select
          value={filters.gender}
          onValueChange={(v) => setFilters({ gender: v as PatientGender | 'all' })}
          options={GENDER_OPTIONS}
          placeholder="All genders"
        />

        {hasActive && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}

        <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">
          {patients.length} of {allPatients.length} patients
        </span>
      </div>
    </div>
  )
}
