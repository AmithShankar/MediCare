'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useUIStore } from '@medicare-pro/store'

const AdmissionChart  = dynamic(() => import('./AdmissionChart').then(m => m.AdmissionChart),  { ssr: false })
const DepartmentChart = dynamic(() => import('./DepartmentChart').then(m => m.DepartmentChart), { ssr: false })
const StatusPieChart  = dynamic(() => import('./StatusPieChart').then(m => m.StatusPieChart),   { ssr: false })
const VitalsChart     = dynamic(() => import('./VitalsChart').then(m => m.VitalsChart),         { ssr: false })

export function AnalyticsPage() {
  const setHeader = useUIStore((s) => s.setHeader)
  useEffect(() => {
    setHeader('Analytics', 'Hospital performance metrics and trends')
  }, [setHeader])

  return (
    <div className="p-4 lg:p-6 space-y-5 animate-page-enter">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <AdmissionChart /><StatusPieChart />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <DepartmentChart /><VitalsChart />
      </div>
    </div>
  )
}
