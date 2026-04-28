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

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 animate-page-enter">
      {/* Test button — right-aligned on all screens */}
      <div className="flex justify-end">
        <button
          onClick={() => notifyCriticalAlert('Sarah Mitchell', 'SpO2 levels dropped below 90%')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all border border-primary/20"
        >
          <BellRing className="h-3 w-3" />
          <span className="hidden xs:inline">Test Vital Notification</span>
          <span className="xs:hidden">Test Alert</span>
        </button>
      </div>

      {/* Stats */}
      <DashboardStatsGrid />

      {/* Bottom section: stacks on mobile/tablet, side-by-side on xl */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-5">
        <div className="xl:col-span-3 min-h-0">
          <RecentAdmissions />
        </div>
        <div className="xl:col-span-2 min-h-0">
          <CriticalAlerts />
        </div>
      </div>
    </div>
  )
}
