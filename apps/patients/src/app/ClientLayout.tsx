'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@medicare-pro/store'
import { usePatients, useAuthInit, useServiceWorker } from '@medicare-pro/hooks'
import { PageSpinner, DashboardLayout } from '@medicare-pro/ui'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isInitialized } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isInitialized && !user) {
      window.location.href = '/login'
    }
  }, [user, isInitialized, router, mounted])

  if (!mounted || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <PageSpinner />
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}

function PatientDataLoader() {
  usePatients()
  return null
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useAuthInit()
  useServiceWorker()
  
  return (
    <AuthGuard>
      <PatientDataLoader />
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  )
}
