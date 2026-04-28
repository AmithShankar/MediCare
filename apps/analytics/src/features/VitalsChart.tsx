'use client'

import * as React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '@medicare-pro/ui'
import { useTheme } from 'next-themes'
import { MOCK_WEEKLY_VITALS } from '@medicare-pro/utils'

export function VitalsChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Card padding="md" className="h-[300px] animate-pulse"><div className="h-full w-full" /></Card>
  }

  const isDark = theme === 'dark'
  const gridColor = isDark ? '#1e293b' : '#f1f5f9'
  const tickColor = isDark ? '#475569' : '#94a3b8'
  const tipBorder = isDark ? '#334155' : '#e2e8f0'
  const tipBg     = isDark ? '#0f172a' : '#ffffff'
  const tipText   = isDark ? '#94a3b8' : '#64748b'

  return (
    <Card padding="md">
      <CardHeader>
        <CardTitle>Weekly Avg. Vitals Trend</CardTitle>
        <span className="text-xs text-slate-400 dark:text-slate-500">Ward average</span>
      </CardHeader>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={MOCK_WEEKLY_VITALS} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px', border: `1px solid ${tipBorder}`,
              fontSize: '12px', backgroundColor: tipBg, color: tipText,
            }}
          />
          <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px', color: tickColor }} />
          <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} dot={false} name="Heart Rate (bpm)" />
          <Line type="monotone" dataKey="bloodPressure" stroke="#3b82f6" strokeWidth={2} dot={false} name="Diastolic BP (mmHg)" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
