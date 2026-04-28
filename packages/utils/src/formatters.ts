import { format, parseISO, formatDistanceToNow } from 'date-fns'
import type { PatientStatus } from '@medicare-pro/types'

export function formatDate(iso: string, pattern = 'MMM d, yyyy') {
  return format(parseISO(iso), pattern)
}

export function formatRelativeDate(iso: string) {
  return formatDistanceToNow(parseISO(iso), { addSuffix: true })
}

export function formatAge(age: number) {
  return `${age} yrs`
}

export const STATUS_LABELS: Record<PatientStatus, string> = {
  stable: 'Stable',
  critical: 'Critical',
  recovering: 'Recovering',
  discharged: 'Discharged',
}

export const STATUS_COLORS: Record<PatientStatus, string> = {
  stable: 'bg-success-50 text-success-600 ring-success-500/20',
  critical: 'bg-danger-50 text-danger-600 ring-danger-500/20',
  recovering: 'bg-warning-50 text-warning-600 ring-warning-500/20',
  discharged: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

export const STATUS_DOT: Record<PatientStatus, string> = {
  stable: 'bg-success-500',
  critical: 'bg-danger-500',
  recovering: 'bg-warning-500',
  discharged: 'bg-slate-400',
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function formatVitalStatus(heartRate: number): 'normal' | 'warning' | 'critical' {
  if (heartRate >= 60 && heartRate <= 100) return 'normal'
  if (heartRate >= 50 && heartRate <= 110) return 'warning'
  return 'critical'
}
