'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useUIStore } from '@medicare-pro/store'

const AdmissionChart = dynamic(() => import('@/features/AdmissionChart').then(mod => mod.AdmissionChart), { ssr: false })
const DepartmentChart = dynamic(() => import('@/features/DepartmentChart').then(mod => mod.DepartmentChart), { ssr: false })
const StatusPieChart = dynamic(() => import('@/features/StatusPieChart').then(mod => mod.StatusPieChart), { ssr: false })
const VitalsChart = dynamic(() => import('@/features/VitalsChart').then(mod => mod.VitalsChart), { ssr: false })

export function AnalyticsPage() {
  const setHeader = useUIStore((s) => s.setHeader)

  useEffect(() => {
    setHeader('Analytics', 'Hospital performance metrics and trends')
  }, [setHeader])

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto min-h-full animate-page-enter">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <AdmissionChart />
        <StatusPieChart />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <DepartmentChart />
        <VitalsChart />
      </div>
    </div>
  )
}

export default AnalyticsPage
