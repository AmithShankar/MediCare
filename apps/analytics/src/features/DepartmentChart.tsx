'use client'

import * as React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '@medicare-pro/ui'
import { useTheme } from 'next-themes'
import { MOCK_DEPARTMENT_LOAD } from '@medicare-pro/utils'

export function DepartmentChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Card padding="md" className="h-[320px] animate-pulse"><div className="h-full w-full" /></Card>
  }

  const isDark = theme === 'dark'
  const gridColor = isDark ? '#1e293b' : '#f1f5f9'
  const xTickColor = isDark ? '#475569' : '#94a3b8'
  const yTickColor = isDark ? '#64748b' : '#64748b'
  const tipBorder  = isDark ? '#334155' : '#e2e8f0'
  const tipBg      = isDark ? '#0f172a' : '#ffffff'
  const tipText    = isDark ? '#94a3b8' : '#64748b'

  const data = MOCK_DEPARTMENT_LOAD.map((d) => ({
    ...d,
    occupancy: Math.round((d.patients / d.capacity) * 100),
  }))

  return (
    <Card padding="md">
      <CardHeader>
        <CardTitle>Department Occupancy</CardTitle>
        <span className="text-xs text-slate-400 dark:text-slate-500">% capacity used</span>
      </CardHeader>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: xTickColor }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <YAxis dataKey="department" type="category" tick={{ fontSize: 10, fill: yTickColor }} axisLine={false} tickLine={false} width={100} />
          <Tooltip
            formatter={(v: number) => [`${v}%`, 'Occupancy']}
            contentStyle={{
              borderRadius: '8px', border: `1px solid ${tipBorder}`,
              fontSize: '12px', backgroundColor: tipBg, color: tipText,
            }}
          />
          <Bar dataKey="occupancy" radius={[0, 4, 4, 0]} maxBarSize={16}>
            {data.map((entry) => (
              <Cell
                key={entry.department}
                fill={entry.occupancy >= 90 ? '#ef4444' : entry.occupancy >= 75 ? '#f59e0b' : '#3b82f6'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
