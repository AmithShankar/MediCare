'use client'

import { memo, useEffect } from 'react'
import { PatientFilters } from './PatientFilters'
import { PatientCard } from './PatientCard'
import { PatientTable } from './PatientTable'
import { SkeletonCard, SkeletonPatientRow } from '../Skeleton'
import { ErrorBoundary } from '../ErrorBoundary'
import { usePatients } from '@medicare-pro/hooks'
import { useUIStore } from '@medicare-pro/store'

const PatientGridView = memo(function PatientGridView() {
  const { patients, isLoading } = usePatients()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  )
})

const PatientListView = memo(function PatientListView() {
  const { patients, isLoading } = usePatients()

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonPatientRow key={i} />)}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <PatientTable patients={patients} />
    </div>
  )
})

export function PatientsClient() {
  const viewMode = useUIStore((s) => s.viewMode)
  const setHeader = useUIStore((s) => s.setHeader)

  useEffect(() => {
    setHeader('Patients', 'Manage and monitor patient records')
  }, [setHeader])

  return (
    <ErrorBoundary>
      <PatientFilters />
      {viewMode === 'grid' ? <PatientGridView /> : <PatientListView />}
    </ErrorBoundary>
  )
}
