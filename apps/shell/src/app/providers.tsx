'use client'

import { useEffect } from 'react'
import { useAuthInit, useServiceWorker, useNotifications } from '@medicare-pro/hooks'
import { usePatientStore } from '@medicare-pro/store'
import { ThemeProvider } from '@/components/ThemeProvider'

const SESSION_KEY = 'critical-alert-fired'

function CriticalAlertMonitor() {
  const { notifyCriticalAlert } = useNotifications()
  const patients = usePatientStore((s) => s.patients)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    if (patients.length === 0) return
    if (!('Notification' in window) || Notification.permission !== 'granted') return

    const critical = patients.filter((p) => p.status === 'critical')
    if (critical.length > 0) {
      sessionStorage.setItem(SESSION_KEY, '1')
      notifyCriticalAlert(
        critical[0].fullName,
        `${critical.length} critical patient${critical.length > 1 ? 's' : ''} require immediate attention`
      )
    }
  }, [patients, notifyCriticalAlert])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  useAuthInit()
  useServiceWorker()
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <CriticalAlertMonitor />
      {children}
    </ThemeProvider>
  )
}
