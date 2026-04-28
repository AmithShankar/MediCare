import type { Metadata } from 'next'
import { SettingsClient } from '@/features/settings/SettingsClient'

export const metadata: Metadata = { 
  title: 'Settings',
  description: 'Manage clinical profile and security preferences.'
}

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8">
      <SettingsClient />
    </div>
  )
}
