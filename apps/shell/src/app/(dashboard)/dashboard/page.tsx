import type { Metadata } from 'next'
import { DashboardClient } from '@/app/(dashboard)/dashboard/DashboardClient'

export const metadata: Metadata = { 
  title: 'Dashboard',
  description: 'Hospital operational overview and patient status monitoring.'
}

export default function DashboardPage() {
  return <DashboardClient />
}
