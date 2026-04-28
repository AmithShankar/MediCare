'use client'

import { useEffect } from 'react'
import { DashboardStatsGrid } from '@/features/dashboard/DashboardStatsGrid'
import { CriticalAlerts } from '@/features/dashboard/CriticalAlerts'
import { RecentAdmissions } from '@/features/dashboard/RecentAdmissions'
import { useUIStore } from '@medicare-pro/store'
import { useNotifications } from '@medicare-pro/hooks'
import { BellRing } from 'lucide-react'

export function DashboardClient() {
  const setHeader = useUIStore((s) => s.setHeader)
  const { requestPermission, notifyCriticalAlert } = useNotifications()

  useEffect(() => {
    setHeader('Dashboard', 'Overview of hospital operations')
    requestPermission()
  }, [setHeader, requestPermission])

  const triggerTestAlert = () => {
    notifyCriticalAlert('Sarah Mitchell', 'SpO2 levels dropped below 90%')
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-page-enter">
      <div className="flex items-center justify-between">
        <div />
        <button 
          onClick={triggerTestAlert}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm border border-primary/20"
        >
          <BellRing className="h-3 w-3" />
          Test Vital Notification
        </button>
      </div>

      <DashboardStatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="xl:col-span-3">
          <RecentAdmissions />
        </div>
        <div className="xl:col-span-2">
          <CriticalAlerts />
        </div>
      </div>
    </div>
  )
}
