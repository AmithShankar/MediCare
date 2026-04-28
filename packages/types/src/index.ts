import type { ReactNode, ElementType } from 'react'

// Patient
export type PatientStatus = 'stable' | 'critical' | 'recovering' | 'discharged'
export type PatientGender = 'male' | 'female' | 'other'
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface VitalSigns {
  heartRate: number
  bloodPressure: string
  temperature: number
  oxygenSaturation: number
  respiratoryRate: number
}

export interface Patient {
  id: string
  mrn: string
  firstName: string
  lastName: string
  fullName: string
  age: number
  gender: PatientGender
  bloodGroup: BloodGroup
  status: PatientStatus
  department: string
  ward: string
  bedNumber: string
  admissionDate: string
  dischargeDate?: string
  diagnosis: string
  treatingPhysician: string
  phoneNumber: string
  email: string
  address: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  vitals: VitalSigns
  medications: string[]
  allergies: string[]
  insuranceProvider: string
  insuranceId: string
  avatarUrl?: string
  notes?: string
}

export interface FilterState {
  search: string
  status: PatientStatus | 'all'
  department: string | 'all'
  gender: PatientGender | 'all'
}

export type VitalStatus = 'normal' | 'warning' | 'critical'

// Auth
export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

// Dashboard
export interface DashboardStats {
  totalPatients: number
  criticalAlerts: number
  admissionsToday: number
  dischargesThisWeek: number
  averageOccupancy: number
  pendingLabResults: number
}

// Analytics
export interface AdmissionTrend {
  month: string
  admissions: number
  discharges: number
}

export interface DepartmentLoad {
  department: string
  patients: number
  capacity: number
}

export interface StatusDistribution {
  status: PatientStatus
  count: number
}

export interface WeeklyVitalsAvg {
  day: string
  heartRate: number
  bloodPressure: number
}

// Notifications
export type NotifType = 'critical' | 'admission' | 'lab' | 'appointment' | 'discharge' | 'success'

export interface NotifItem {
  id: string
  type: NotifType
  title: string
  body: string
  timestamp: Date
  read: boolean
  patientId?: string
}

export interface DemoNotif {
  id: string
  type: NotifType
  title: string
  message: string
  time: string
  read: boolean
}

// UI
export type ViewMode = 'grid' | 'list'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
}

export interface SelectOption {
  value: string
  label: string
}

export type SettingsSection = 'profile' | 'notifications' | 'security' | 'preferences'

export interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: ElementType
  title?: string
  subtitle?: string
}

export interface PatientDetailPanelProps {
  patient: Patient
}

export interface PatientTableProps {
  patients: Patient[]
}

export interface PatientCardProps {
  patient: Patient
}

export interface PatientFiltersProps {
  onFilterChange?: (filters: FilterState) => void
}

export interface BaseProps {
  className?: string
  children?: ReactNode
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  asChild?: boolean
  className?: string
  onClick?: (e: any) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
}

export interface InputProps {
  id?: string
  label?: string
  error?: string
  hint?: string
  leftElement?: ReactNode
  rightElement?: ReactNode
  className?: string
  value?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  placeholder?: string
  type?: string
  name?: string
  disabled?: boolean
  required?: boolean
  autoComplete?: string
}

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps {
  src?: string | null
  name: string
  size?: AvatarSize
  className?: string
}

export type BadgeVariant = 'default' | 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'slate'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export interface StatusBadgeProps {
  status: PatientStatus
  showDot?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  triggerClassName?: string
}

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ElementType
  iconColor: string
  iconBg: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  suffix?: string
  index?: number
}

export interface ThemeToggleProps {
  className?: string
  variant?: 'icon' | 'pill'
}

export interface HeaderProps {
  title: string
  subtitle?: string
}
