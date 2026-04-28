'use client'

import * as React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '../Card'
import { useTheme } from 'next-themes'
import { MOCK_ADMISSION_TRENDS } from '@medicare-pro/utils'

export function AdmissionChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Card padding="md" className="h-[320px] animate-pulse"><div className="h-full w-full" /></Card>
  }

  const isDark = theme === 'dark'
  const gridColor  = isDark ? '#1e293b' : '#f1f5f9'
  const tickColor  = isDark ? '#475569' : '#94a3b8'
  const tipBorder  = isDark ? '#334155' : '#e2e8f0'
  const tipBg      = isDark ? '#0f172a' : '#ffffff'
  const tipText    = isDark ? '#94a3b8' : '#64748b'

  return (
    <Card padding="md">
      <CardHeader>
        <CardTitle>Admissions vs. Discharges</CardTitle>
        <span className="text-xs text-slate-400 dark:text-slate-500">Last 7 months</span>
      </CardHeader>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={MOCK_ADMISSION_TRENDS} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={isDark ? 0.25 : 0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="disGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={isDark ? 0.25 : 0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px', border: `1px solid ${tipBorder}`,
              fontSize: '12px', backgroundColor: tipBg, color: tipText,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / .15)',
            }}
          />
          <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '12px', color: tickColor }} />
          <Area type="monotone" dataKey="admissions" stroke="#3b82f6" strokeWidth={2} fill="url(#admGrad)" dot={false} name="Admissions" />
          <Area type="monotone" dataKey="discharges" stroke="#22c55e" strokeWidth={2} fill="url(#disGrad)" dot={false} name="Discharges" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
