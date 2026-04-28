'use client'

import * as React from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '../Card'
import { useTheme } from 'next-themes'
import { MOCK_STATUS_DISTRIBUTION, STATUS_LABELS, cn } from '@medicare-pro/utils'

const PIE_COLORS: Record<string, string> = {
  stable:     '#22c55e',
  recovering: '#f59e0b',
  critical:   '#ef4444',
  discharged: '#94a3b8',
}

export function StatusPieChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Card padding="md" className="h-[280px] animate-pulse"><div className="h-full w-full" /></Card>
  }

  const isDark = theme === 'dark'
  const tipBorder = isDark ? '#334155' : '#e2e8f0'
  const tipBg     = isDark ? '#0f172a' : '#ffffff'
  const tipText   = isDark ? '#94a3b8' : '#64748b'

  const data = MOCK_STATUS_DISTRIBUTION.map((d) => ({
    name:  STATUS_LABELS[d.status],
    value: d.count,
    color: PIE_COLORS[d.status],
  }))

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <Card padding="md">
      <CardHeader>
        <CardTitle>Patient Status Distribution</CardTitle>
        <span className="text-xs text-slate-400 dark:text-slate-500">{total} total</span>
      </CardHeader>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="60%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number, name: string) => [v, name]}
              contentStyle={{
                borderRadius: '8px', border: `1px solid ${tipBorder}`,
                fontSize: '12px', backgroundColor: tipBg, color: tipText,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-3">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-slate-600 dark:text-slate-400">{d.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{d.value}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">({Math.round((d.value / total) * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
