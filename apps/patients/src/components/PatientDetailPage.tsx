'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { PatientDetailPanel } from '@/features/PatientDetailPanel'
import { Skeleton, SkeletonText, SkeletonAvatar } from '@medicare-pro/ui'
import { ErrorBoundary } from '@medicare-pro/ui'
import { usePatientById } from '@medicare-pro/hooks'
import { useUIStore } from '@medicare-pro/store'

function PatientDetailSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-4 w-28 rounded" />
      <div className="rounded-xl border border-border bg-white dark:bg-slate-900 p-6">
        <div className="flex items-center gap-5">
          <SkeletonAvatar size="lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48 rounded" />
            <SkeletonText className="w-64" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-xl border border-border bg-white dark:bg-slate-900 p-5 space-y-4">
          <Skeleton className="h-4 w-28 rounded" />
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-white dark:bg-slate-900 p-5 space-y-3">
          <Skeleton className="h-4 w-24 rounded" />
          {Array.from({ length: 3 }).map((_, i) => <SkeletonText key={i} className="w-full" />)}
        </div>
      </div>
    </div>
  )
}

interface PatientDetailPageProps {
  patientId: string
}

export function PatientDetailPage({ patientId }: PatientDetailPageProps) {
  const { patient, isLoading } = usePatientById(patientId)
  const setHeader = useUIStore((s) => s.setHeader)

  useEffect(() => {
    if (patient) {
      setHeader(patient.fullName, patient.mrn)
    } else {
      setHeader('Patient Details', 'Record lookup')
    }
  }, [patient, setHeader])

  return (
    <div className="p-4 lg:p-6 animate-page-enter">
      <ErrorBoundary>
        {isLoading ? (
          <PatientDetailSkeleton />
        ) : patient ? (
          <PatientDetailPanel patient={patient} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-warning-50 dark:bg-warning-500/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning-500" />
            </div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">Patient not found</p>
            <Link href="/patients" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
              Return to patients list
            </Link>
          </div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default PatientDetailPage
