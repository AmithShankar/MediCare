'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardLayout } from '@medicare-pro/ui'
import { useAuthStore } from '@medicare-pro/store'
import { usePatients } from '@medicare-pro/hooks'
import { PageSpinner } from '@medicare-pro/ui'

function PatientDataLoader() {
  usePatients()
  return null
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isInitialized } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isInitialized && !user) {
      window.location.href = '/auth/login'
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

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <AuthGuard>
        <PatientDataLoader />
        <DashboardLayout>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </DashboardLayout>
      </AuthGuard>
    </>
  )
}
