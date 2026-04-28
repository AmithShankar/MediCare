'use client'

import {
  Users, AlertTriangle, UserPlus, UserCheck, Activity, FlaskConical,
} from 'lucide-react'
import { StatCard } from './StatCard'
import { MOCK_DASHBOARD_STATS } from '@medicare-pro/utils'

export function DashboardStatsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      <StatCard
        index={0}
        title="Total Patients"
        value={MOCK_DASHBOARD_STATS.totalPatients}
        icon={Users}
        iconColor="text-primary"
        iconBg="bg-primary/10"
        trend="up"
        trendValue="4.5%"
      />
      <StatCard
        index={1}
        title="Critical Alerts"
        value={MOCK_DASHBOARD_STATS.criticalAlerts}
        icon={AlertTriangle}
        iconColor="text-destructive"
        iconBg="bg-destructive/10"
        subtitle="Requires attention"
      />
      <StatCard
        index={2}
        title="Admissions Today"
        value={MOCK_DASHBOARD_STATS.admissionsToday}
        icon={UserPlus}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-500/10"
        trend="up"
        trendValue="2 vs yesterday"
      />
      <StatCard
        index={3}
        title="Discharges (Week)"
        value={MOCK_DASHBOARD_STATS.dischargesThisWeek}
        icon={UserCheck}
        iconColor="text-violet-600"
        iconBg="bg-violet-500/10"
      />
      <StatCard
        index={4}
        title="Bed Occupancy"
        value={MOCK_DASHBOARD_STATS.averageOccupancy}
        suffix="%"
        icon={Activity}
        iconColor="text-amber-600"
        iconBg="bg-amber-500/10"
        trend="up"
        trendValue="3% vs last week"
      />
      <StatCard
        index={5}
        title="Pending Labs"
        value={MOCK_DASHBOARD_STATS.pendingLabResults}
        icon={FlaskConical}
        iconColor="text-rose-600"
        iconBg="bg-rose-500/10"
        subtitle="Results due today"
      />
    </div>
  )
}
