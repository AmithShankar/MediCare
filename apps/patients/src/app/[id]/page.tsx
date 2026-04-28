'use client'

import { useParams } from 'next/navigation'
import { PatientDetailPanel } from '../../features/PatientDetailPanel'
import { usePatients } from '@medicare-pro/hooks'
import { PageSpinner, Card } from '@medicare-pro/ui'
import { ArrowLeft, Stethoscope } from 'lucide-react'
import Link from 'next/link'

export default function PatientDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const { patients, isLoading } = usePatients()
  const patient = patients.find((p) => p.id === id)

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <PageSpinner />
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patients
        </Link>
        <Card padding="lg" className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
            <Stethoscope className="h-8 w-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Patient Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
            The patient record with ID <span className="font-mono text-primary">{id}</span> could not be located in our database.
          </p>
        </Card>
      </div>
    )
  }

  return <PatientDetailPanel patient={patient} />
}
